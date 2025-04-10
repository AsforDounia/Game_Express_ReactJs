import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const { user } = useAuth();
  const roles = user?.roles?.map(role => role.name);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const isSuperAdmin = roles?.includes('super_admin');

  if (!isSuperAdmin) return null;

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/products', label: 'Products' },
    { to: '/categories', label: 'Categories' },
    { to: '/subcategories', label: 'Subcategories' },
    { to: '/users', label: 'Users' },
    { to: '/roles', label: 'Roles' },
    { to: '/permissions', label: 'Permissions' }, // Optional if you have a frontend route for updateRolePermitions
  ];

  return (
    <aside className={`bg-blue-950 text-white fixed top-15 w-64 min-h-full pl-12 p-4 z-40 ${!isOpen && 'hidden md:block'}`}>
      <nav className="flex flex-col space-y-4 py-8">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`hover:underline ${
              location.pathname.startsWith(link.to) ? 'font-semibold text-amber-400' : ''
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
