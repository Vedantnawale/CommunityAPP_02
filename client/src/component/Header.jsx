import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/Slices/AuthSlice';
import useIsAdmin from '../helpers/checkRole';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state?.auth?.data);

  const userProfile = `http://localhost:4500/uploads/${user.avatar}`;

  const handleLogout = async (event) => {
    event.preventDefault();
    const res = await dispatch(logout());
    if (res?.payload?.success) navigate('/');
  };

  const isAdmin = useIsAdmin();

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center gap-2 text-2xl font-semibold">
        <span className="text-blue-600 text-3xl">&lt;/&gt;</span>Community<span className="text-blue-600">APP</span>
      </div>
      <nav className="flex gap-6 font-medium text-lg">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-bold' : 'text-gray-700'
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/posts"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-bold' : 'text-gray-700'
          }
        >
          {isAdmin ? 'Dashboard' : 'Feed'}
        </NavLink>
        {!isAdmin &&
          <NavLink
            to="/developers"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-bold' : 'text-gray-700'
            }
          >
            Developers
          </NavLink>
        }

      </nav>
      <div className="flex items-center gap-4">
        <button className="text-xl">🔔</button>
        <div className="relative inline-block text-left">
          <img
            className="w-8 h-8 rounded-full bg-gray-300"
            src={userProfile}
            alt="Profile"
            onClick={() => setIsOpen(!isOpen)}
          />

          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
              <ul className="py-1">
                <li>
                  <Link to="/user">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">
                      Profile
                    </button>
                  </Link>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
