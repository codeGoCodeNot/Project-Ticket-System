import CardCompact from "@/components/card-compact";
import Heading from "@/components/heading";
import AccountTabs from "@/features/account/components/account-tabs";
import PasswordChangeForm from "@/features/password/components/password-change-form";

const PasswordPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Password"
        desc="Keep your account secure"
        tabs={<AccountTabs />}
      />

      <div className="flex-1 flex flex-col items-center">
        <CardCompact
          title="Change Password"
          desc="Enter your current password to change your password."
          classname="w-full max-w-[420px] animate-fade-from-top"
          content={<PasswordChangeForm />}
        />
      </div>
    </div>
  );
};

export default PasswordPage;
