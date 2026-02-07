import CardCompact from "@/components/card-compact";
import VerifyEmailChangeForm from "@/features/account/components/verify-email-change-form";

const VerifyEmailPage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <CardCompact
        title="Verify New Email"
        desc="Enter the verification code sent to your new email address."
        classname="w-full max-w-[420px] animate-fade-from-top"
        content={<VerifyEmailChangeForm />}
      />
    </div>
  );
};

export default VerifyEmailPage;
