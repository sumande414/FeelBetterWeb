import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

function Signup() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/therapists');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-8">
      {/* Abstract Shapes */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#1E3A8A] opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-[#5B21B6] opacity-15 rounded-full blur-3xl"></div>
      <AuthForm isSignup={true} />
    </div>
  );
}

export default Signup;