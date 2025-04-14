import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { token } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboardData = async () => {
      if (!token) return;

      try {
        const response = await api.get('v1/admin/dashboard');
        setDashboardData(response.data.data);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };


  return (
    <DashboardContext.Provider value={{ dashboardData , fetchDashboardData}}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
