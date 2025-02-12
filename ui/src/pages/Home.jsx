import { Link } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../data";

export default function Home() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("authenticated")
  );

  async function deleteUserAccount() {
    try {
      const response = await axios({
        url: `${BASE_URL}/api/v1/user`,
        method: "DELETE",
        withCredentials: true,
      });

      if (response.status === 200) {
        localStorage.removeItem("authenticated");
        setAccessToken(null);
      } else alert("Account Deletion Failed");
    } catch (error) {
      console.log("error : ", error);
      alert("Account Deletion Failed");
    }
  }

  async function logout() {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("authenticated");
        setAccessToken(null);
      } else alert("Logout Failed");
    } catch (error) {
      console.log("error : ", error);
      alert("Logout Failed");
    }
  }

  async function isAuthenticated() {
    const response = await axios.get(`${BASE_URL}/api/v1/auth/status`, {
      withCredentials: true,
    })

    if(response.status != 200) {
      localStorage.removeItem('authenticated');
    }
  }

  useEffect(() => {
    isAuthenticated();
  }, []);
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-200 to-purple-200">
      <div className="text-6xl font-bold text-gray-700">Welcome to NXTWAVE</div>
      <div className="text-3xl font-light text-gray-700 mt-4">
        Your Next Generation UpSkilling Platform
      </div>
      {!accessToken && (
        <div className="mt-8">
          <Link
            to="/signin"
            className="pt-2 pb-3 px-4 bg-gray-700 text-white rounded-lg shadow-lg"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="pt-2 pb-3 px-4 bg-gray-700 text-white rounded-lg shadow-lg ml-4"
          >
            Sign Up
          </Link>
        </div>
      )}
      {accessToken && (
        <div className="mt-8">
          <button
            onClick={deleteUserAccount}
            className="pt-2 pb-3 px-4 bg-red-600 hover:cursor-pointer text-white rounded-lg shadow-lg ml-4"
          >
            Delete Account
          </button>

          <button
            onClick={logout}
            className="pt-2 pb-3 px-4 bg-yellow-600 hover:cursor-pointer text-white rounded-lg shadow-lg ml-4"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
