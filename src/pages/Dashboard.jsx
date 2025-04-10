import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  FiShoppingCart,
  FiUsers,
  FiBarChart2,
  FiActivity
} from 'react-icons/fi';
import { BiCategory } from "react-icons/bi";
import { MdOutlineCategory } from "react-icons/md";
import { useDashboard } from '../context/DashboardContext';


const Dashboard = () => {

  const { dashboardData } = useDashboard();
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
      value: dashboardData.total_products || 0,
    },
    {
      title: 'Total Users',
      icon: <FiUsers className="text-blue-500 text-xl" />,
      value: dashboardData.total_users || 0,
    },
    {
      title: 'Total Categories',
      icon: <BiCategory className="text-blue-500 text-xl" />,
      value: dashboardData.total_categories || 0,
    },
    {
      title: 'Total SubCategories',
      icon: <MdOutlineCategory className="text-blue-500 text-xl" />,
      value: dashboardData.total_subcategories || 0,
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

      {/* <div className="mt-10 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Product with low stock</h2>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.low_stock_products.map((product, idx) => (
              <tr key={idx}>
                <td>{product.name}</td>
                <td>{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div> */}

<div className="mt-10 bg-white shadow rounded-lg p-6">
  <h2 className="text-xl font-semibold mb-4">Products with Low Stock</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b">Product Name</th>
          <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b">Quantity</th>
        </tr>
      </thead>
      <tbody>
        {dashboardData.low_stock_products.map((product, idx) => (
          <tr
            key={idx}
            className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
          >
            <td className="px-4 py-2 border-b text-sm text-gray-700">{product.name}</td>
            <td className="px-4 py-2 border-b text-sm text-gray-700">{product.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
    {dashboardData.low_stock_products.length === 0 && (
      <p className="text-sm text-gray-500 mt-4">No low-stock products found.</p>
    )}
  </div>
</div>

    </div>
  );
};

export default Dashboard;
