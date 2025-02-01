import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState();
  const [otpInitiated, setOtpInitiated] = useState(false);
  const [credentialFailure, setCredentialFailure] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // Call signin API here
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        {
          email,
          password,
        }
      );
  
      if (response.status === 200) {
        setOtpInitiated(true);
      } else {
        setCredentialFailure(true);
      }
    } catch (error) {
      console.log(error);
      setCredentialFailure(true);
    }
  };

  const handleOtpVerification = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/verify-auth-otp",
        {
          email,
          otp,
        },
        {
          withCredentials: true,
        }
      );
  
      if (response.status === 200) {
        console.log("Redirect To thank you page");
      } else {
        console.log("Redirect to login fail page");
      }
    } catch (error) {
      console.log(error);
      console.log("Redirect to login fail page");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                disabled={otpInitiated}
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                disabled={otpInitiated}
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          {otpInitiated && (
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="otp"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Enter OTP
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="number"
                  name="otp"
                  id="otp"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          )}

          {credentialFailure && (
            <div className="text-center text-red-500">
              Invalid Credentials! Please use correct credentials...
            </div>
          )}

          <div>
            {!otpInitiated && (
              <button
                onClick={handleSubmit}
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
              >
                Sign in
              </button>
            )}
          </div>
          <div>
            {otpInitiated && (
              <button
                onClick={handleOtpVerification}
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
              >
                Verify OTP
              </button>
            )}
          </div>
          <div className="text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
