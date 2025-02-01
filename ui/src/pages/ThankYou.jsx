
import { Link } from "react-router";

const ThankYou = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-lg text-gray-700 mb-8">
          We appreciate your effort. Your submission has been received.
        </p>
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          <Link to="/">Go to Home</Link>
        </button>
      </div>
    </div>
  );
};

export default ThankYou;

