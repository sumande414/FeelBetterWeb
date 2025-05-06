import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-transparent text-[#1E3A8A] p-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          FeelBetter
        </Link>
        <div className="space-x-4">
          {user && user.role !== 'admin' && (
            <Link to="/my-appointments" className="hover:text-[#5B21B6] hover:underline">
              My Appointments
            </Link>
          )}
          {user && user.role !== 'admin' && (
            <Link to="/therapists" className="hover:text-[#5B21B6] hover:underline">
              Book Therapist
            </Link>
          )}
          {user && user.role === 'admin' && (
            <Link to="/admin" className="hover:text-[#5B21B6] hover:underline">
              Admin Dashboard
            </Link>
          )}
          {!user ? (
            <>
              <Link to="/login" className="hover:text-[#5B21B6] hover:underline">
                Login
              </Link>
              <Link to="/signup" className="hover:text-[#5B21B6] hover:underline">
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-[#1E3A8A] to-[#5B21B6] text-white px-3 py-1 rounded-full hover:from-[#5B21B6] hover:to-[#1E3A8A] transition-all duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;