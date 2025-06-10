import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { getUserData, updateProfile } from '../redux/Slices/AuthSlice';
import toast from 'react-hot-toast';
import useIsAdmin from '../helpers/checkRole';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);
  const [selectedFile, setSelectedFile] = useState(null);

  const isAdmin = useIsAdmin();


  const [data, setData] = useState({
    fullName: '',
    bio: '',
    skills: '',
    socialLinks: {
      linkedin: '',
      github: ''
    },
    avatar: ''
  });

  useEffect(() => {
    if (userData) {
      setData({
        fullName: userData.fullName || '',
        bio: userData.bio || '',
        skills: Array.isArray(userData.skills) ? userData.skills.join(', ') : '',
        socialLinks: {
          linkedin: userData.socialLinks?.linkedin || '',
          github: userData.socialLinks?.github || ''
        },
        avatar: userData.avatar || ''
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'linkedin' || name === 'github') {
      setData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [name]: value
        }
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (data.bio.trim().length < 5) {
      toast.error('Bio must be at least 5 characters long.');
      return;
    }

    const formData = new FormData();
    formData.append('fullName', data.fullName);
    formData.append('bio', data.bio);
    formData.append('skills', JSON.stringify(data.skills.split(',').map(skill => skill.trim())));
    formData.append('linkedin', data.socialLinks.linkedin);
    formData.append('github', data.socialLinks.github);
    formData.append("avatar", selectedFile);



    await dispatch(updateProfile({
      userId: userData._id,
      formData: formData
    }));
    await dispatch(getUserData());
    navigate('/user');
  };

  return (
    <div className="max-w-xl mx-auto mt-6 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Profile</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          value={data.fullName}
          onChange={handleInputChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Bio</label>
              <textarea
                name="bio"
                id="bio"
                value={data.bio}
                onChange={handleInputChange}
                className="w-full mb-4 px-4 py-2 border rounded-lg"
                rows={3}
              />

        {
          !isAdmin &&
          (
            <>
              <label className="block mb-2 text-sm font-medium text-gray-700">Skills (comma-separated)</label>
              <input
                type="text"
                name="skills"
                id="skills"
                value={data.skills}
                onChange={handleInputChange}
                className="w-full mb-4 px-4 py-2 border rounded-lg"
              />

              <h3 className="text-lg font-semibold mt-4 mb-2">Social Links</h3>

              <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
              <input
                type="text"
                name="linkedin"
                id="linkedin"
                value={data.socialLinks.linkedin}
                onChange={handleInputChange}
                className="w-full mb-3 px-4 py-2 border rounded-lg"
              />

              <label className="block text-sm font-medium text-gray-700">GitHub</label>
              <input
                type="text"
                name="github"
                id="github"
                value={data.socialLinks.github}
                onChange={handleInputChange}
                className="w-full mb-3 px-4 py-2 border rounded-lg"
              />
            </>
          )
        }


        <button
          type="submit"
          className="w-full mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Save Profile
        </button>

        <Link to="/user">
          <p className="text-center text-blue-600 mt-3 hover:underline">
            Go back to profile
          </p>
        </Link>
      </form>
    </div>
  );
};

export default EditProfile;
