import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthRoute = () => {
  const { isAuthenticated, loading ,user } = useAuth();
  console.log("user",user);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-10 h-10 border-4 border-blue-950 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    const roles = user?.roles?.map((role) => role.name);
    const isSuperAdmin = roles?.includes("super_admin");
    const isProductManager = roles?.includes("product_manager");

    // If the user is authenticated and not a super admin or product manager, redirect to products page
    if (!isSuperAdmin && !isProductManager) {
      return <Navigate to="/products" replace />;
    }
    else{
      return <Navigate to="/dashboard" replace />;
    }
    // If the user is authenticated and is a super admin or product manager, render the outlet
    // return <Outlet />;
  }


  return <Outlet />;
};

export default AuthRoute;
