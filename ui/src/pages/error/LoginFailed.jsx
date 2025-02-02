import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function LoginFailed() {
  const navigate = useNavigate();

  useEffect(() => {
    if(!sessionStorage.getItem("loginError")) navigate("/signin");
    setTimeout(() => {
      sessionStorage.removeItem("loginError");
      navigate("/signin");
    }, 5000);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
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
            Login Failed
          </h2>
          <p className="mt-2 text-sm text-gray-600">
          Sorry, we can&apos;t log you in. Please try again.
          </p>
        </div>
        <div className="mt-8">
          <Link
            to="/signin"
            className="block w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition duration-300 text-center"
          >
            Return to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginFailed;
