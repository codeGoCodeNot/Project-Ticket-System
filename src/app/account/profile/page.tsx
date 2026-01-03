import Heading from "@/components/heading";
import AccountTabs from "@/features/account/components/account-tabs";

const ProfilePage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Profile"
        desc="All your profile information"
        tabs={<AccountTabs />}
      />

      <h1>Under Construction</h1>
    </div>
  );
};

export default ProfilePage;
