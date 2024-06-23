"use server";

import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { CreateAccountFormSchema } from "@/schemas/auth/index";
import { generateVerificationCode } from "@/utils/token";
import { sendVerificationEmail } from "@/utils/send-emails";
import { getUserByEmail } from "@/utils/user";

export const createAccount = async (data: z.infer<typeof CreateAccountFormSchema>) => {
  try {
    // Validate data
    const validatedData = CreateAccountFormSchema.parse(data);

    // Check if data is valid
    if (!validatedData) {
      return { error: "Invalid input data" };
    }

    // Destructure validated data
    const { name, email, password, confirmPassword } = validatedData;

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return { error: "Passwords do not match" };
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);

    // If user exists, return error
    if (existingUser) {
      return { error: "User already exists" };
    }

    // Lowercase email
    const lowerCaseEmail = email.toLowerCase();

    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Hash password with salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email: lowerCaseEmail,
        password: hashedPassword,
        salt: salt,
      },
    });

    // Generate email verification token
    const verificationCode = await generateVerificationCode(lowerCaseEmail);

    // Send email verification
    await sendVerificationEmail(lowerCaseEmail, verificationCode);

    // If all goes well, return success message
    return { success: "Account successfuly created, check your email to verify your account" };

  } catch (error) {
    console.error("Error:", error);
    return { error: "An error occurred while creating your account" };
  }
};