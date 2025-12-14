import Link from "next/link";

// This is a Home page
const HomePage = () => {
  return (
    <div>
      <h2 className="text-lg font-bold">Home Page</h2>
      <Link href="/tickets">Go to tickets</Link>
    </div>
  );
};

export default HomePage;
