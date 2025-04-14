import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { PiGameControllerFill } from "react-icons/pi";
import { Link } from 'react-router-dom';
import api from '../api/axios';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login(credentials);

      const { data } = await api.get('/user');

      if (result.success) {
        // navigate('/');

      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="flex items-center justify-center px-4 py-8 font-sans">
      <div className="w-full max-w-4xl">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden flex">
          {/* Left Side - Image Section */}
          <div className="w-1/2 bg-blue-950 relative flex flex-col justify-center items-center p-8">
            <div className="text-center relative z-10">
              <PiGameControllerFill className="text-6xl text-amber-50 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-amber-50">
                Game<span className="text-white">Express</span>
              </h1>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="w-1/2 p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-blue-950 mb-2">Connexion</h2>
              <p className="text-darkTeal">Accédez à votre compte GameExpress</p>
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-left text-blue-950 font-medium mb-2">
                  Adresse Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="votre@email.com"
                    value={credentials.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                    required
                  />
                </div>
                
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-left text-blue-950 font-medium mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-darkTeal"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
    
              </div>

              {/* Remember and Forgot Password */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="mr-2 accent-blue-900 rounded-sm"
                  />
                  <label htmlFor="remember" className="text-sm">
                    Se souvenir de moi
                  </label>
                </div>
                <a href="/forgot-password" className="text-blue-900 hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-950 transition-colors cursor-pointer"
              >
                Se connecter
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-500">ou</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Footer */}
            <div className="text-center">
              <p>
                Vous n'avez pas de compte ? {' '}
                <Link to="/register" className="text-blue-900 hover:underline">
                  Inscrivez-vous
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
