import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  FiShoppingCart,
  FiUsers,
  FiBarChart2,
  FiActivity
} from 'react-icons/fi';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Products',
      icon: <FiShoppingCart className="text-blue-500 text-xl" />,
      value: 0,
    },
    {
      title: 'Total Users',
      icon: <FiUsers className="text-blue-500 text-xl" />,
      value: 0,
    },
    {
      title: 'Total Orders',
      icon: <FiBarChart2 className="text-blue-500 text-xl" />,
      value: 0,
    },
    {
      title: 'Revenue',
      icon: <FiActivity className="text-blue-500 text-xl" />,
      value: '$0',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 mt-10 mb-10">
      <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Welcome back, {user.name}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">{card.title}</span>
              {card.icon}
            </div>
            <h2 className="text-2xl font-bold">{card.value}</h2>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
        <p className="text-gray-500">No recent activity</p>
      </div>
    </div>
  );
};

export default Dashboard;
