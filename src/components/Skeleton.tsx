const Skeleton = () => {
  return (
    <div className="w-full rounded-md overflow-hidden bg-white flex flex-col justify-center items-center">
      <div className="relative h-48 w-48">
        <div className="w-full h-full bg-gray-100 animate-pulse rounded-md" />
      </div>
      <div className="p-4 w-full">
        <div className="w-full h-4 bg-gray-100 animate-pulse rounded-md mb-2" />
        <div className="w-3/4 h-4 bg-gray-100 animate-pulse rounded-md mb-4" />
        <div className="w-1/2 h-4 bg-gray-100 animate-pulse rounded-md" />
      </div>
    </div>
  );
};

export default Skeleton;
