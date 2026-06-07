import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center  p-4">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-white">
          Forgot Password
        </h1>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
