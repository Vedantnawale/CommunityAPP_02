import React from 'react';
import { useSelector } from 'react-redux';
import NotLogin from '../component/NotLogin';
import CreatePost from './CreatePost';
import Header from '../component/Header'
import Footer from '../component/Footer';
import useIsAdmin from '../helpers/checkRole';

import adminImage from '../assets/admin_home.png'
import MostLikedAndCommented from './MostLikedAndCommented';
import HomeLeft from '../component/HomeLeft';

const HomePage = () => {
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const isAdmin = useIsAdmin();

  return (
    <>
      {isLoggedIn ? (
        <div>
          <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            <Header />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
              {!isAdmin &&
                <CreatePost />
              }
              {isAdmin && (
                <div className="md:col-span-2 space-y-4">
                  <img
                    className="w-full h-96 rounded-lg shadow-md"
                    src={adminImage}
                    alt="Admin Panel"
                  />
                </div>
              )}


              <aside className="space-y-6">
                <div className="bg-white rounded-xl shadow p-4">
                  <h2 className="font-bold text-lg mb-2">📈 Trending Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Node.js', 'Python', 'JavaScript'].map(tag => (
                      <span key={tag} className="bg-gray-200 text-sm px-3 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow p-4">
                  <h2 className="font-bold text-lg mb-2">📊 Community Stats</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Developers</span><span className="font-bold">1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Posts Today</span><span className="font-bold">42</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Now</span><span className="font-bold">89</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
            {
              !isAdmin && <MostLikedAndCommented />
            }

          </div>
          <Footer />
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
          <Header />

          {/* Main content grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">

            {/* Left column */}
            <div className="md:col-span-2">
              <HomeLeft />
            </div>

            {/* Right sidebar */}
            <aside className="space-y-6">
              <div className="bg-white rounded-xl shadow p-4">
                <h2 className="font-bold text-lg mb-2">📈 Trending Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Node.js', 'Python', 'JavaScript'].map(tag => (
                    <span key={tag} className="bg-gray-200 text-sm px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow p-4">
                <h2 className="font-bold text-lg mb-2">📊 Community Stats</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Developers</span><span className="font-bold">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Posts Today</span><span className="font-bold">42</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Now</span><span className="font-bold">89</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Most liked section */}
          <MostLikedAndCommented />

          {/* Footer */}
          <Footer />
        </div>

      )}
    </>
  );
};

export default HomePage;
