import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col justify-center items-center text-center min-h-[60vh] my-16">
        <h2 className="text-4xl font-bold mb-4">
          Welcome to Our E-Commerce Store Game Express
        </h2>
        <h3 className="text-2xl text-gray-700 mb-6">
          {isAuthenticated
            ? `Hello, ${user.name}!`
            : 'Please login or register to continue'}
        </h3>
        {!isAuthenticated && (
          <div className="mt-4 space-x-4">
            <Link
              to="/login"
              className="bg-blue-900 hover:bg-blue-950 text-white font-medium py-2 px-6 rounded"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="border border-blue-900 text-blue-900 hover:bg-blue-50 font-medium py-2 px-6 rounded"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
