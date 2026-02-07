import CardCompact from "@/components/card-compact";
import EmailVerificationForm from "@/features/auth/components/email-verification-form";

const EmailVerificationPage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <CardCompact
        title="Verify Your Email"
        desc="Verify your email to access your account."
        classname="w-full max-w-[420px] animate-fade-from-top"
        content={<EmailVerificationForm />}
      />
    </div>
  );
};

export default EmailVerificationPage;
