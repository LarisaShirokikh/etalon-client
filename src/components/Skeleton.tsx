const Skeleton = () => {
  return (
    <div className="mt-12 px-1 sm:px-5">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 group p-2 bg-white rounded-md"
          >
            <div className="relative w-full h-48 overflow-hidden rounded-md">
              <div className="w-full h-full bg-gray-100 animate-pulse" />
            </div>
            <div className="flex flex-col gap-2 flex-grow">
              <div className="w-full h-4 bg-gray-100 animate-pulse rounded-md" />
              <div className="w-full h-4 bg-gray-100 animate-pulse rounded-md" />
              <div className="w-1/2 h-12 bg-gray-100 animate-pulse rounded-2xl" />
            </div>
            <div className="text-sm text-gray-500 w-full h-16 bg-gray-100 animate-pulse rounded-md" />
            {/* <Button text="Вызвать замерщика" /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
