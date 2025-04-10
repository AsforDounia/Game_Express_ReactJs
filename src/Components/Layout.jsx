import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const roles = user?.roles?.map(role => role.name);
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!isAuthPage && (
        <header className="bg-blue-950 text-white">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-4xl font-bold text-amber-50">
              Game<span className="text-white">Express</span>
            </h1>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  {(roles?.includes('super_admin') || roles?.includes('product_manager')) && (
                    <Link to="/dashboard" className="hover:underline">
                      Dashboard
                    </Link>
                  )}
                  <button onClick={logout} className="hover:underline">
                    Logout
                  </button>
                </>
              ) : (
                <>
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

      <main className="container mx-auto px-4 mt-8">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
