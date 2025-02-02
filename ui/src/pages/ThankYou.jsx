import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const ThankYou = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  async function getUser() {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/user", {
        withCredentials: true,
      });
      console.log("response.data : ", response.data);
      setUser(response?.data?.data);
    } catch (error) {
      console.log("error : ", error);
    }
  }

  useEffect(() => {
    getUser();
    setTimeout(() => {
      localStorage.removeItem("user");
      navigate("/");
    }, 5000);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          <span className="text-2xl font-extrabold text-gray-500">
            Thank You! {" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
              {user.name || "RAVI"}
            </span>
          </span>
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          We appreciate your effort. Your submission has been received.
        </p>
        <div className="bg-white p-6 mb-2 rounded-lg shadow-md text-left">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">User Details</h2>
          <p className="text-gray-700"><span className="font-medium">Name:</span> {user.name}</p>
          <p className="text-gray-700"><span className="font-medium">Email:</span> {user.email}</p>
          <p className="text-gray-700"><span className="font-medium">Date of Birth:</span> {user.dob}</p>
        </div>
        <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
          <Link to="/">Go to Home</Link>
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
