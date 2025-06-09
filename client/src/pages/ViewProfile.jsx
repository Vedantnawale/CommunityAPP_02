import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../component/Header';

const ViewProfile = () => {
    const userData = useSelector((state) => state?.auth?.data);
    //console.log("User Data:", userData);

    const skills = (userData?.skills) || [];
    const bio = (userData?.bio) || 'No bio added yet.';
    const socialLinks = userData?.socialLinks || {};

    return (
        <>
        <Header />
        <div className="max-w-xl mx-auto mt-6 p-6 bg-gray-100 rounded-2xl shadow-md">
            <div className='flex justify-between items-center'>
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                    {userData?.fullName || 'Unnamed User'}
                </h2>
                <h4>
                    <span>Email : </span>
                    {userData?.email || 'Unnamed Email'}
                </h4>
            </div>


            <p className="text-gray-700 mb-3">{bio}</p>

            <div className="mb-3">
                <h4 className="font-semibold">Skills:</h4>
                {skills.length > 0 ? (
                    <ul className="list-disc pl-5 text-gray-800">
                        {skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No skills added yet.</p>
                )}
            </div>

            <div className="space-y-1 text-blue-600">
                {socialLinks.linkedin ? (
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                ) : null}
                <br />
                {socialLinks.github ? (
                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                ) : null}
                <br />

                {!socialLinks.linkedin && !socialLinks.github && !socialLinks.twitter ? (
                    <p className="text-gray-600">No social links added yet.</p>
                ) : null}
            </div>
            
            <Link to = "/user/update">
            <button
                // onClick={onEdit}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-yellow-600"
            >
                Edit Profile
            </button>
            </Link>
        </div>
        </>
    );
};

export default ViewProfile;
