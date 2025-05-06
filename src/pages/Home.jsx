import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Abstract Shapes */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#1E3A8A] opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-[#5B21B6] opacity-15 rounded-full blur-3xl"></div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-12">
        <h1 className="text-5xl font-bold text-[#1E3A8A] mb-4">
          Welcome to FeelBetter{user ? `, ${user.name}` : ''}!
        </h1>
        <p className="text-xl text-[#5B21B6] mb-8 max-w-2xl">
          Embark on your mental health journey with our expert therapists, offering personalized support to help you thrive.
        </p>
        <div className="flex justify-center space-x-4 mb-12">
          <Link
            to="/therapists"
            className="inline-block bg-gradient-to-r from-[#1E3A8A] to-[#5B21B6] text-white px-8 py-3 rounded-full font-semibold text-lg hover:from-[#5B21B6] hover:to-[#1E3A8A] transition-all duration-300 shadow-lg"
          >
            Find Therapists
          </Link>
          
        </div>

        {/* Therapy Benefits Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-[#1E3A8A] mb-6">
            Why Choose Therapy?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#BFDBFE] bg-opacity-50 rounded-lg">
              <h3 className="text-xl font-bold text-[#5B21B6] mb-2">Emotional Support</h3>
              <p className="text-[#1E3A8A]">
                Therapy provides a safe space to express your feelings and gain tools to manage stress and anxiety.
              </p>
            </div>
            <div className="p-6 bg-[#BFDBFE] bg-opacity-50 rounded-lg">
              <h3 className="text-xl font-bold text-[#5B21B6] mb-2">Personal Growth</h3>
              <p className="text-[#1E3A8A]">
                Discover your strengths and build resilience through guided self-reflection and goal-setting.
              </p>
            </div>
            <div className="p-6 bg-[#BFDBFE] bg-opacity-50 rounded-lg">
              <h3 className="text-xl font-bold text-[#5B21B6] mb-2">Improved Relationships</h3>
              <p className="text-[#1E3A8A]">
                Learn communication skills and strategies to strengthen connections with loved ones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;