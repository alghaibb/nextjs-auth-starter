import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;
