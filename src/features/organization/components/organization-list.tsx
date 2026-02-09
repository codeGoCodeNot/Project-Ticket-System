import getOrganizationsByUser from "../queries/get-organizations-by-user";

const OrganizationList = async () => {
  const organizations = await getOrganizationsByUser();

  return (
    <div>
      {organizations.map((organization) => (
        <div key={organization.id}>
          <div>Name: {organization.name}</div>
        </div>
      ))}
    </div>
  );
};

export default OrganizationList;
