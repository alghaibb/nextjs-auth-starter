"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { FaEyeSlash, FaEye } from "react-icons/fa";

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
import { LoginFormSchema } from "@/schemas/auth";
import { login } from "@/actions/auth/login";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const { handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await login(data);
      if (res && res.error) {
        setError(res.error);
      } else {
        router.push("/");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error logging in user:", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="md:w-[800px] md:px-0 md:py-0">
      <CardHeader className="space-y-4">
        <CardTitle className="md:text-4xl">Login</CardTitle>
        <CardDescription>Enter your details below to login</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <CustomMessage type="error" message={error} />}
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-2 top-3"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link href="/forgot-password">
                {" "}
                <Button variant="link" className="px-0">
                  Forgot password?
                </Button>
              </Link>
            </div>
            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? <LoadingSpinner /> : "Login"}
            </Button>
          </form>
        </Form>
        <p className="mt-4 text-sm ">
          Don&apos;t have an account?{" "}
          <Link href="/create-account">
            <Button variant="link" className="px-0">
              Sign Up
            </Button>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
