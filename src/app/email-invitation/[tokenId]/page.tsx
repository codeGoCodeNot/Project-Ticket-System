import CardCompact from "@/components/card-compact";
import EmailInvitationAcceptForm from "@/features/invitation/components/email-invitation-form";

type EmailInvitationProps = {
  params: {
    tokenId: string;
  };
};

const EmailInvitationPage = async ({ params }: EmailInvitationProps) => {
  const { tokenId } = await params;

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <CardCompact
        title="Verify Your Email"
        desc="Verify your email to access your account."
        classname="w-full max-w-[420px] animate-fade-from-top"
        content={<EmailInvitationAcceptForm tokenId={tokenId} />}
      />
    </div>
  );
};

export default EmailInvitationPage;
