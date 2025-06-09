import { Routes, Route, Router } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Login from '../forms/Login'
import Signup from '../forms/Signup'
import ViewProfile from '../pages/ViewProfile'
import EditProfile from '../pages/EditProfile'
import Feed from '../pages/Feed'
import Developers from '../pages/Developers'
import AdminDashBoard from '../pages/AdminDashBoard'
import { useSelector } from 'react-redux'
import NotFound from '../pages/NotFound'
import useIsAdmin from '../helpers/checkRole'
import EditPost from '../pages/EditPost'

const CustomRoutes = () => {
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const isAdmin = useIsAdmin();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {isLoggedIn && (
        <>
          <Route path="/user" element={<ViewProfile />} />
          <Route path="/user/update" element={<EditProfile />} />
          <Route path="/posts" element={<Feed />} />

          {!isAdmin &&
            <>
              <Route path="/developers" element={<Developers />} />
              <Route path="/edit/:postId" element={<EditPost />} />
            </>
          }

          <Route path="/admin/dashboard" element={<AdminDashBoard />} />
        </>
      )}
      <Route path="*" element={<NotFound />}></Route>


    </Routes>
  )
}

export default CustomRoutes