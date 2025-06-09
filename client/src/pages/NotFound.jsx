import React from 'react'
import notfoundimg from '../assets/notfound.jpeg'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {

    const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#1A2238]">
        <div className=' w-1/2 flex flex-col justify-center items-center'>
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
            404
        </h1>
        <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">
            Page Not Found...
        </div>
        <button className="mt-5">
            <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus-outline-none focus:ring">
            <span onClick={() => navigate(-1)} className="relative block px-8 py-3 bg-[#1A2238] border border-current "> 
            Go Back
            </span>
            </a>
        </button>
        </div>
        <div className='w-1/3'>
            <img src={notfoundimg} alt="notfound" />
        </div>
    </div>
  )
}

export default NotFound

// navigate(-1) matlab ek step piche 
// bg[#1A2238] --> hex code mein number dene ke liye.