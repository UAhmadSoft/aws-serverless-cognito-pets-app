import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from 'components/Loading';
// import Logout from 'pages/Logout';
import { useDispatch, useSelector } from 'react-redux';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import Pets from 'pages/Pets';
import UpdateUser from 'pages/UpdatePet';
import NewUser from 'pages/NewPet';
import DashboardLayout from 'components/dashboard';
import DashboardApp from 'components/dashboard/DashboardApp';
import { logout } from 'store/slices/auth';
import { getAllPets } from 'store/slices/pets/extraReducers';
import ConfirmMail from 'pages/ConfirmMail';

const Logout = () => {
  const dispatch = useDispatch();
  dispatch(logout());
  return <></>;
};

const Router = () => {
  const { authenticating, isLoggedIn, user } = useSelector((st) => st.auth);

  const { pets, fetching } = useSelector((st) => st.pets);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetching) dispatch(getAllPets());
  }, [fetching, pets]);

  if (authenticating) return <Loader />;
  return (
    <>
      {isLoggedIn && user ? (
        <Routes>
          <Route path='/dashboard' element={<DashboardLayout />}>
            <Route path='app' element={<DashboardApp />} />
            <Route path='pets' element={<Pets />} />
            <Route path='pets/new' element={<NewUser />} />
            <Route path='pets/:id' element={<UpdateUser />} />
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
