import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from '../redux/Slices/AuthSlice';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email : "",
    password:""
  })

  function handleUserInput(e){
     const{name, value} = e.target
     setLoginData({
      ...loginData,
      [name]: value
     })
  }

  async function onLogin(event) {
    event.preventDefault();

    if(!loginData.email || !loginData.password){
      toast.error("Please fill all the details");
    }

    const response = await dispatch(signin(loginData));
    console.log(response);
    
    if(response?.payload?.success){
      navigate("/");
    }

    setLoginData({
      email:"",
      password:""
    })
  }


  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 dark:bg-gray-800 dark:border dark:border-gray-700">
        
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Sign in to your account
          </h1>
      
        <form noValidate onSubmit={onLogin} className="mt-6 space-y-6" action="post">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              required
              onChange={handleUserInput}
              value={loginData.email}
              className="block w-full px-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              onChange={handleUserInput}
              value={loginData.password}
              required
              className="block w-full px-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-gray-500 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <Link to = "/forgotpass"
              href="/#"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-sm font-medium text-white transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign in
          </button>

          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{' '}
            <Link to="/signup"
              href="/#"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
