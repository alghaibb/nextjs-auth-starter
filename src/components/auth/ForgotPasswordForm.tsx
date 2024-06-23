"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import CustomMessage from "../ui/custom-messages";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ForgotPasswordFormSchema } from "@/schemas/auth";
import { forgotPassword } from "@/actions/auth/forgot-password";

const ForgotPasswordForm = () => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { handleSubmit } = form;

  const clearMessages = () => {
    setSuccess(null);
    setError(null);
  };

  const onSubmit = async (data: z.infer<typeof ForgotPasswordFormSchema>) => {
    setLoading(true);
    clearMessages();
    try {
      const res = await forgotPassword(data);
      if (res.error) {
        setError(res.error);
      } else if (res.success) {
        setSuccess(res.success);
        form.reset();
      }
    } catch (error) {
      console.error("Error creating account:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="md:w-[800px] md:px-0 md:py-0">
      <CardHeader className="space-y-4">
        <CardTitle className="md:text-4xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email and you will recieve an email with instructions on
          how to reset your password
        </CardDescription>
        {success && <CustomMessage type="success" message={success} />}
        {error && <CustomMessage type="error" message={error} />}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? <LoadingSpinner /> : "Forgot Password"}
            </Button>
          </form>
        </Form>
        <p className="mt-4 text-sm ">
          Remember your password?{" "}
          <Link href="/login">
            <Button variant="link" className="px-0">
              Return to Login
            </Button>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
