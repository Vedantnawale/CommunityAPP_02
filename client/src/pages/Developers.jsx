import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDevelopers } from '../redux/Slices/AuthSlice';
import Header from '../component/Header';

const Developers = () => {
  const dispatch = useDispatch();
  const developers = useSelector((state) => state.auth.usersData);
  const user = useSelector((state) => state?.auth?.data);

  const userId = user?._id;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');

  useEffect(() => {
    dispatch(getAllDevelopers());
  }, [dispatch]);

  const allSkills = [
    ...new Set((developers || []).flatMap((dev) => dev.skills || [])),
  ];

  const filteredDevelopers = (developers || []).filter((dev) => {
    const nameMatch = dev.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
    const skillMatch = selectedSkill ? (dev.skills || []).includes(selectedSkill) : true;
    return nameMatch && skillMatch && dev._id !== userId;
  });

  return (
    <>
      <Header />
      <div className="p-6 max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">Developers Directory</h1>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md w-full sm:w-1/2"
          />
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="px-4 py-2 border rounded-md w-full sm:w-1/3"
          >
            <option value="">Filter by Skill</option>
            {allSkills.map((skill, i) => (
              <option key={i} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        {/* Developer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDevelopers
          .filter((dev) => dev.role !== "Admin")
          .map((dev) => (
            <div key={dev._id} className="bg-white rounded-xl shadow-md p-4">
              <img
                src={
                  dev.avatar
                    ? `http://localhost:4500/uploads/${dev.avatar}`
                    : 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
                }
                alt={dev.fullName}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-center">{dev.fullName}</h2>
              <p className="text-center text-gray-600">{dev.role || 'Developer'}</p>
              <p className="text-center text-sm text-gray-500 mb-2">{dev.location || 'India'}</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {(dev.skills || []).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredDevelopers.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No developers found.</p>
        )}
      </div>
    </>
  );

};

export default Developers;
