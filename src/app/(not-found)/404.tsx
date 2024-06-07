// app/(not-found)/404.tsx
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-2 text-lg">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">
        <a className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Go Back Home
        </a>
      </Link>
    </div>
  );
};

export default Custom404;
