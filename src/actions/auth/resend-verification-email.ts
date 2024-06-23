"use server";

import prisma from "@/lib/prisma";
import { sendVerificationEmail } from "@/utils/send-emails";
import { z } from "zod";

const ResendEmailSchema = z.object({
  email: z.string().email(),
});

export const resendVerificationEmail = async (data: { email: string }) => {
  const parsed = ResendEmailSchema.safeParse(data);

  // If data is invalid, return error
  if (!parsed.success) {
    return { error: "Invalid email address" };
  }

  const { email } = parsed.data;

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // If user not found, return error
  if (!user) {
    return { error: "User not found" };
  }

  // Check if user is already verified
  if (user.emailVerified) {
    return { message: "User is already verified" };
  }

  // Invalidate existing verification tokens when resending new one
  await prisma.verificationToken.deleteMany({
    where: { identifier: email },
  });

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: verificationCode,
      expires: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes from now
    },
  });

  await sendVerificationEmail(email, verificationCode);

  return { success: "A new OTP has been sent to your email address" };
};