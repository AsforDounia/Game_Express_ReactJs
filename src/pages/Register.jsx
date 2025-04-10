import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { PiGameControllerFill } from "react-icons/pi";

import { Link } from 'react-router-dom';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Check if passwords match before proceeding
    if (userData.password !== userData.password_confirmation) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    const result = await register(userData);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8 font-sans">
      <div className="w-full max-w-4xl">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden flex">
          {/* Left Side - Image Section */}
          <div className="w-1/2 bg-blue-950 relative flex flex-col justify-center items-center p-8">
            <div className="text-center relative z-10">
              {/* You need to import PiGameControllerFill */}
              <PiGameControllerFill className="text-6xl text-amber-50 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-amber-50">
                Game<span className="text-white">Express</span>
              </h1>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="w-1/2 py-8 px-12">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-blue-950 mb-2">Inscription</h2>
              <p className="text-darkTeal">Créez votre compte GameExpress</p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Name Input */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-left text-blue-950 font-medium mb-2">
                  Nom complet
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    placeholder="Votre nom complet"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-left text-blue-950 font-medium mb-2">
                  Adresse Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-left text-blue-950 font-medium mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
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

              {/* Confirm Password Input */}
              <div className="mb-4">
                <label htmlFor="password_confirmation" className="block text-left text-blue-950 font-medium mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="password_confirmation"
                    name="password_confirmation"
                    value={userData.password_confirmation}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-darkTeal"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-950 transition-colors cursor-pointer"
              >
                S'inscrire
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-500">ou</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Footer */}
            <div className="text-center">
              <p>
                Vous avez déjà un compte ?{' '}
                <Link to="/login" className="text-blue-900 hover:underline">
                  Connectez-vous
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
