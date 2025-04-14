import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './SideBar';

const Layout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const roles = user?.roles?.map(role => role.name);
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className='bg-gray-50'>
      {!isAuthPage && (
        <header className="bg-blue-950 text-white fixed top-0 left-0 w-full z-10 shadow-md h-16 flex flex-col justify-center px-2 z-40">
          <div className="container px-12 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">{roles == 'super_admin' ? "admin" : roles} Panel</div>
            {/* <h1 className="text-4xl font-bold text-amber-50">
              Game<span className="text-white">Express</span>
            </h1> */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  {/* {(roles?.includes('super_admin') || roles?.includes('product_manager')) && (
                    <Link to="/dashboard" className="hover:underline">
                      Dashboard
                    </Link>
                  )} */}
                  <Link to="/profile" className="hover:underline">
                    Profile
                  </Link>
                  <button onClick={logout} className="hover:underline">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/products" className="hover:underline">
                    Products
                  </Link>
                  <Link to="/login" className="hover:underline">
                    Login
                  </Link>
                  <Link to="/register" className="hover:underline">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>
      )}
    <div className="flex">
      {/* Sidebar will only be shown if the user is roles super_admin */}
      {isAuthenticated && roles?.includes('super_admin') && (
        <div className="hidden md:block w-64 bg-gray-200 min-h-screen">
          <Sidebar />
        </div>
      )}

      <main className="container mx-auto px-4 mt-8 relative top-16 w-3/4">
        <Outlet />
      </main>
      </div>
    </div>
  );
};

export default Layout;
