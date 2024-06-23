"use server";

import bcrypt from "bcrypt";
import { z } from "zod";
import { LoginFormSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/utils/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const login = async (data: z.infer<typeof LoginFormSchema>) => {
  try {
    // Validate data
    const validatedData = LoginFormSchema.parse(data);

    // Check if data is valid
    if (!validatedData) {
      return { error: "Incorrect email or password" };
    }

    // Destructure validated data
    const { email, password } = validatedData;

    // Find user by email
    const user = await getUserByEmail(email);

    // If user does not exist, return error
    if (!user || !user.email || !user.password) {
      return { error: "User does not exist" };
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If password does not match, return error
    if (!passwordMatch) {
      return { error: "Incorrect password" };
    }

    // This will sign in the user
    await signIn("credentials", {
      email: user.email,
      password: password,
    });

    // If all goes well, return success message
    return { success: "User logged in successfully" };

  } catch (error) {
    if (error instanceof AuthError) {

      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Please confirm your email address" };
      }
    }
    throw error;
  }

}; 