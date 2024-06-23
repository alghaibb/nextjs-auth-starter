"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { getPasswordResetTokenByToken, deletePasswordResetToken } from "@/utils/token";

export const resetPassword = async (token: string, password: string) => {
  try {
    // Get the password reset token by token
    const resetPasswordToken = await getPasswordResetTokenByToken(token);

    // Check if token exists
    if (!resetPasswordToken) {
      return { error: "Invalid or expired token" };
    }

    // Check if token is expired
    if (new Date() > resetPasswordToken.expires) {
      return { error: "Token expired" };
    }

    // Get the user by the identifier (email)
    const user = await prisma.user.findUnique({
      where: { email: resetPasswordToken.identifier },
    });

    // Check if user exists
    if (!user) {
      return { error: "User not found" };
    }

    // Check if the new password is the same as the old password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      return { error: "New password cannot be the same as the old password" };
    }

    // Hash and salt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user password
    await prisma.user.update({
      where: { email: resetPasswordToken.identifier },
      data: {
        password: hashedPassword,
        updatedAt: new Date().toISOString(),
      },
    });

    // Delete the password reset token
    await deletePasswordResetToken(resetPasswordToken.identifier, token);

    return { success: "Password reset successfully" };
  } catch (error) {
    console.error("Error resetting password:", error);
    return { error: "Something went wrong, please try again" };
  }
};