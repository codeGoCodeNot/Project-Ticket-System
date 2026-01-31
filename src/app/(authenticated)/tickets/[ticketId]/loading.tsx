import Spinner from "@/components/spinner";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Spinner />
    </div>
  );
};

export default loading;
