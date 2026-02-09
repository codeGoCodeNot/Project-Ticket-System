import CardCompact from "@/components/card-compact";
import OrganizationCreateForm from "@/features/organization/components/organization-create-form";

const OnBoardingPage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <CardCompact
        title="Create Organization"
        desc="Create your organization to get started with our services."
        classname="w-full max-w-[420px] animate-fade-from-top"
        content={<OrganizationCreateForm />}
      />
    </div>
  );
};

export default OnBoardingPage;
