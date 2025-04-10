import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="flex flex-col justify-center items-center text-center min-h-[60vh] my-16">
        <h1 className="text-4xl font-bold mb-4">403 - Unauthorized Access</h1>
        <h2 className="text-2xl text-gray-700 mb-6">
          You don't have permission to access this page
        </h2>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
