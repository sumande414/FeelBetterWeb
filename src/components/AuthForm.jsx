import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

function AuthForm({ isSignup }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const response = isSignup
        ? await api.signup(formData)
        : await api.login(formData);
      if (response.token) {
        login(response.user, response.token);
        navigate(response.user.role === 'admin' ? '/admin' : '/therapists');
      } else {
        setMessage(response.message || 'Authentication failed');
      }
    } catch (error) {
      setMessage('Error during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-fit bg-[#BFDBFE] bg-opacity-60 shadow-lg rounded-2xl p-8 relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#BFDBFE] bg-opacity-60 z-10 rounded-2xl">
          <div className="w-12 h-12 border-4 border-[#5B21B6] border-t-transparent rounded-full animate-spin shadow-md"></div>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-6 text-[#1E3A8A] text-center">
        {isSignup ? 'Sign Up' : 'Login'}
      </h2>
      {message && (
        <div className="mb-4 p-2 rounded text-sm bg-red-100 text-red-700">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <div>
            <label className="block text-sm font-medium text-[#1E3A8A]">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-3 border border-[#5B21B6] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#5B21B6]"
              required
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-[#1E3A8A]">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-3 border border-[#5B21B6] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#5B21B6]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1E3A8A]">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full p-3 border border-[#5B21B6] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#5B21B6]"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-[#1E3A8A] to-[#5B21B6] text-white px-4 py-2 rounded-full font-semibold text-base hover:from-[#5B21B6] hover:to-[#1E3A8A] transition-all duration-300 shadow-lg ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
