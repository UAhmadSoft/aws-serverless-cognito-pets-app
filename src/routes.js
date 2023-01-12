import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from 'components/Loading';
// import Logout from 'pages/Logout';
import { useDispatch, useSelector } from 'react-redux';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import User from 'pages/Users';
import UpdateUser from 'pages/UpdateUser';
import NewUser from 'pages/NewUser';
import DashboardLayout from 'components/dashboard';
import DashboardApp from 'components/dashboard/DashboardApp';
import { logout } from 'store/slices/auth';
import { getAllUsers } from 'store/slices/users/extraReducers';
import Backtests from 'pages/Backtests';
import { getAllBackTests } from 'store/slices/backtests/extraReducers';
import ConfirmMail from 'pages/ConfirmMail';

const Logout = () => {
  const dispatch = useDispatch();
  dispatch(logout());
  return <></>;
};

const Router = () => {
  const { authenticating, isLoggedIn, user } = useSelector((st) => st.auth);

  const { users, fetching } = useSelector((st) => st.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetching) dispatch(getAllUsers());
  }, [fetching, users]);

  useEffect(() => {
    dispatch(getAllBackTests());
  }, []);

  if (authenticating) return <Loader />;
  return (
    <>
      {isLoggedIn && user ? (
        <Routes>
          <Route path='/dashboard' element={<DashboardLayout />}>
            <Route path='app' element={<DashboardApp />} />
            <Route path='users' element={<User />} />
            <Route path='backtests' element={<Backtests />} />
            <Route path='users/new' element={<NewUser />} />
            <Route path='users/:id' element={<UpdateUser />} />
            <Route path='*' element={<Navigate to='/dashboard/app' />} />
          </Route>
          <Route path='/logout' element={<Logout />} />
          <Route path='*' element={<Navigate to='/dashboard/app' />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/confirm-mail' element={<ConfirmMail />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      )}
    </>
  );
};

export default Router;
