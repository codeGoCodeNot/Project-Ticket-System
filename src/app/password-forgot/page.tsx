import CardCompact from "@/components/card-compact";
import PasswordForgotForm from "@/features/password/components/password-forgot-form";

const PasswordForgotPage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <CardCompact
        title="Forgot Password"
        desc="Reset your password"
        classname="w-full max-w-[420px] animate-fade-from-top"
        content={<PasswordForgotForm />}
      />
    </div>
  );
};

export default PasswordForgotPage;
