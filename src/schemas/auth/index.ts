import { z } from "zod";

export const CreateAccountFormSchema = z.object({
  name: z.string().min(3,
    { message: "Name must be at least 3 characters long" })
    .regex(/^[a-zA-Z]+ [a-zA-Z]+$/, { message: "Please enter a valid name" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Verify email form schema
export const VerifyEmailFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  OTP: z.string().regex(/^\d{6}$/, { message: "Token must be a 6-digit number" }),
});

// Login form schema
export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

// Forgot password form
export const ForgotPasswordFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
});

// Password reset form schema
export const PasswordResetFormSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});