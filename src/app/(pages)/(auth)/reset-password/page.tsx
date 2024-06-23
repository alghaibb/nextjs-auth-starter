import { Metadata } from "next";
import ResetPasswordPage from "./ResetPasswordPage";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default async function Page() {
  return <ResetPasswordPage />;
}
