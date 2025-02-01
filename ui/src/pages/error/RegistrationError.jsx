
import { Link } from 'react-router';

function RegistrationError() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-yellow-400"
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
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Registration Error
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sorry, there was an issue with your registration. Please try again later.
          </p>
        </div>
        <div className="mt-8">
          <Link
            to="/signup"
            className="block w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition duration-300 text-center"
          >
            Return to Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegistrationError;

