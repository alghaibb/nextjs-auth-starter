"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { ForgotPasswordFormSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/utils/user";
import { generatePasswordResetToken } from "@/utils/token";
import { sendPasswordResetEmail } from "@/utils/send-emails";

export const forgotPassword = async (data: z.infer<typeof ForgotPasswordFormSchema>) => {
  try {
    // Validate the data
    const validatedData = ForgotPasswordFormSchema.parse(data);

    // Check if data is invalid
    if (!validatedData) {
      return { error: "Invalid input data" };
    }

    // Destructure the email from the data
    const { email } = validatedData;

    // Get the user by email
    const user = await getUserByEmail(email);

    // Check if user exists
    if (!user) {
      return { error: "User not found" };
    }

    // Invalidate all the existing password reset tokens
    await prisma.resetPasswordToken.deleteMany({
      where: { identifier: email },
    });

    // Generate a password reset token
    const resetToken = await generatePasswordResetToken(email);

    // Send the password reset email to the user
    await sendPasswordResetEmail(email, resetToken);


    return { success: "Password reset email sent" }
  } catch (error) {
    return { error: "Something went wrong, please try again" };
  }
};