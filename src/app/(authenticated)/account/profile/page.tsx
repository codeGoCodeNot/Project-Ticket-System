import Heading from "@/components/heading";
import AccountTabs from "@/features/account/components/account-tabs";
import UpdateProfileForm from "@/features/account/components/update-profile-form";
import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";

const ProfilePage = async () => {
  const { user } = await getAuthOrRedirect();

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Profile"
        desc="All your profile information"
        tabs={<AccountTabs />}
      />

      <div className="w-full max-w-[420px] self-center">
        <UpdateProfileForm username={user.username} email={user.email} />
      </div>
    </div>
  );
};

export default ProfilePage;
