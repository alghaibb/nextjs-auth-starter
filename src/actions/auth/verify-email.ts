"use server";

import prisma from "@/lib/prisma";
import { getUserByEmail } from "@/utils/user";
import { deleteVerificationToken, getVerificationTokenByEmail } from "@/utils/token";

export const VerifyEmailToken = async ({ email, OTP }: { email: string, OTP: string }) => {
  const existingVerificationToken = await getVerificationTokenByEmail(email, OTP);

  // If the verification token does not exist, return an error
  if (!existingVerificationToken) {
    return { error: "Invalid OTP or email", };
  }

  // If the verification token has expired, return an error
  if (existingVerificationToken.expires < new Date()) {
    return { error: "OTP has expired", };
  }

  // Get the user by email
  const user = await getUserByEmail(existingVerificationToken.identifier);

  // If the user does not exist, return an error
  if (!user) {
    return { error: "User not found", };
  }

  // Update user to set their email as verified and remove the verification token
  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
    },
  });

  // Delete verification token from database
  await deleteVerificationToken(existingVerificationToken.identifier, OTP);

  return { success: "Account successfuly verified", };
};