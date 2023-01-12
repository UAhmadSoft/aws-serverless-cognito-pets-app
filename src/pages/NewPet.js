import { useEffect } from 'react';
// material
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserForm from 'components/UserForm';
import { compose } from 'redux';
import { createPet } from 'store/slices/pets/extraReducers';

const NewPet = () => {
  // const { pets } = useSelector((st) => st.pets);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, resetForm) => {
    dispatch(createPet({ ...values })).then(({ err }) => {
      if (!err) navigate('/dashboard/pets');
    });
  };

  return (
    <Page title='New Pet'>
      <Container>
        <UserForm handleSubmit={handleSubmit} slug='Create' />
      </Container>
    </Page>
  );
};

export default NewPet;
