import CardCompact from "@/components/card-compact";
import OrganizationCreateForm from "@/features/organization/components/organization-create-form";

const CreateOrganizationPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <CardCompact
        title="Create Organization"
        desc="Create a new organization for your team"
        classname="w-full max-w-[420px] self-center"
        content={<OrganizationCreateForm />}
      />
    </div>
  );
};

export default CreateOrganizationPage;
