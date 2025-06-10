import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { createAccount } from "../redux/Slices/AuthSlice";


const Signup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()


  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
    // role: ""
  });

  function handleUserInput(e) {
    const { name, value } = e.target
    setSignupData({
      ...signupData,
      [name]: value
    })
  }



  async function createNewAccount(event) {
    event.preventDefault();
    if (!signupData.email || !signupData.password || !signupData.fullName) {
      toast.error("Please fill all the details")
    }
    // checking name field length
    if (signupData.fullName.length < 5) {
      toast.error("Name should be atleast of 5 characters")
      return;
    }



    const formData = new FormData();

    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    // formData.append("role", signupData.role);

    // dispatch create account action
    const response = await dispatch(createAccount(formData))
    console.log(response);

    if (response?.payload?.success)
      navigate("/signin");

    setSignupData({
      fullName: "",
      email: "",
      password: "",
      // role: ""
    });

    console.log(signupData.role);
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border dark:border-gray-700 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Create an Account
        </h1>
        <form noValidate onSubmit={createNewAccount} className="space-y-5" action="#">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter Your Name"
              onChange={handleUserInput}
              value={signupData.fullName}
              required
              className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleUserInput}
              value={signupData.email}
              required
              className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              onChange={handleUserInput}
              value={signupData.password}
              required
              className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
          {/* <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-white mt-4">
              Select Role
            </label>
            <select
              name="role"
              id="role"
              onChange={handleUserInput}
              value={signupData.role}
              required
              className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div> */}

          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              required
              className="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-500 dark:text-gray-300">
              I accept the{' '}
              <a href="/terms" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                Terms and Conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Account
          </button>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/signin" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
