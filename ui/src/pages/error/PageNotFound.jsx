
import { Link } from "react-router";

function PageNotFound() {
  return (
    <div className="flex flex-col min-h-screen justify-center bg-gradient-to-r from-indigo-200 to-purple-200">
      <div className="container mx-auto p-8">
        <div className="text-center">
          <svg
            className="mx-auto h-48 w-48 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-6xl font-extrabold text-gray-700">
            404 - Page Not Found
          </h1>
          <p className="mt-4 text-2xl text-gray-700">
            Sorry, the page you are looking for does not exist.
          </p>
        </div>
        <div className="mt-16 flex justify-center">
          <Link
            to="/"
            className="bg-gray-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-gray-500 transition duration-300 text-center"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;


