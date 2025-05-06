import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminPanel from '../components/AdminPanel';

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'admin') {
      navigate('/therapists');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-start py-12 bg-gradient-to-br from-[#DBEAFE] via-[#EDE9FE] to-[#F3E8FF]">
      

      
        <AdminPanel />
      
    </div>
  );
}

export default AdminDashboard;
