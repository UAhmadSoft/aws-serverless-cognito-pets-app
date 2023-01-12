import { useEffect, useState } from 'react';
// material
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from 'components/UserForm';
import { compose } from 'redux';
import { updatePet } from 'store/slices/pets/extraReducers';

const UpdatePet = () => {
  const { pets, loading } = useSelector((st) => st.pets);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const { id } = useParams();

  useEffect(() => {
    if (loading) return;

    // console.log('pets', pets);
    let tmp = pets && pets.find((el) => el._id === id);
    // console.log('tmp', tmp);
    setUser(tmp);
  }, [pets, loading]);

  const handleSubmit = async (values, resetForm) => {
    console.log('values1', values);
    dispatch(updatePet({ updatedUser: { ...values }, id })).then(({ err }) => {
      if (!err) navigate('/dashboard/pets');
    });
  };

  return (
    <Page title='Update Pet'>
      <Container>
        {!loading && user && (
          <UserForm
            user={user}
            update
            handleSubmit={handleSubmit}
            slug='Update'
          />
        )}
      </Container>
    </Page>
  );
};

export default UpdatePet;
