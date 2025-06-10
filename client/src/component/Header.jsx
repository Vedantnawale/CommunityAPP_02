import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/Slices/AuthSlice';
import useIsAdmin from '../helpers/checkRole';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state?.auth?.data);
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const isAdmin = useIsAdmin();
  const userProfile = user ? `http://localhost:4500/uploads/${user.avatar}` : '';

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await dispatch(logout());
    if (res?.payload?.success) navigate('/');
  };

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-semibold">
          <span className="text-blue-600 text-3xl">&lt;/&gt;</span>
          Community<span className="text-blue-600">APP</span>
        </div>

        {/* Desktop Navigation */}
        {isLoggedIn && (
          <nav className="hidden md:flex gap-6 font-medium text-lg">
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

            {!isAdmin && (
              <NavLink
                to="/developers"
                className={({ isActive }) =>
                  isActive ? 'text-blue-600 font-bold' : 'text-gray-700'
                }
              >
                Developers
              </NavLink>
            )}
          </nav>
        )}

        {/* Mobile Menu Toggle */}
        {isLoggedIn && (
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
              ☰
            </button>
          </div>
        )}

        {/* Right Section: Avatar or Sign Up */}
        <div className="flex items-center gap-4 ml-4">
          {isLoggedIn ? (
            <>
              <button className="text-xl hidden sm:block">🔔</button>
              <div className="relative inline-block text-left">
                <img
                  className="w-8 h-8 rounded-full bg-gray-300 cursor-pointer"
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
            </>
          ) : (
            <Link to="/firstpage">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Make an Account
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && isLoggedIn && (
        <div className="md:hidden px-4 pb-4 space-y-2 font-medium text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'block text-blue-600 font-bold' : 'block text-gray-700'
            }
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              isActive ? 'block text-blue-600 font-bold' : 'block text-gray-700'
            }
            onClick={() => setMenuOpen(false)}
          >
            {isAdmin ? 'Dashboard' : 'Feed'}
          </NavLink>
          {!isAdmin && (
            <NavLink
              to="/developers"
              className={({ isActive }) =>
                isActive ? 'block text-blue-600 font-bold' : 'block text-gray-700'
              }
              onClick={() => setMenuOpen(false)}
            >
              Developers
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
