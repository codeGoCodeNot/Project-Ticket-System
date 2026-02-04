import CardCompact from "@/components/card-compact";
import PasswordResetForm from "@/features/password/components/password-reset-form";

type PasswordResetPageProps = {
  params: Promise<{ tokenId: string }>;
};

const PasswordResetPage = async ({ params }: PasswordResetPageProps) => {
  const { tokenId } = await params;

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <CardCompact
        title="New Password"
        desc="Enter your new password below."
        classname="w-full max-w-[420px] animate-fade-from-top"
        content={<PasswordResetForm tokenId={tokenId} />}
      />
    </div>
  );
};

export default PasswordResetPage;
