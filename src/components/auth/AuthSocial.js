// material
import { Stack, Button, Divider, Typography } from '@mui/material';
// component
import Iconify from 'components/Iconify';
import { Google } from '@mui/icons-material';
import { GoogleLogin } from 'react-google-login';
import { API_BASE_URL } from 'utils/axios';
import axios from 'axios';
import { toast } from 'react-toastify';
import { login } from 'store/slices/auth/extraReducers';
import { useDispatch } from 'react-redux';
import FacebookLogin from 'react-facebook-login';

// ----------------------------------------------------------------------

const handleCatch = (err) => {
  // console.log('**********');
  // console.log(`err`, err);
  let errMsg = 'Something Went Wrong';
  if (err.message) errMsg = err.message;
  toast.error(errMsg);
};

export default function AuthSocial() {
  const dispatch = useDispatch();

  const responseFacebook = (response) => {
    console.log(response);
  };

  const responseGoogle = async (response) => {
    console.log(response);

    if (response.error) return;

    const token = response.tokenObj.access_token;
    const { name, email, imageUrl } = response.profileObj;

    console.log(`email`, email);

    try {
      dispatch(
        login({
          // email: formik.values.email,
          // password: formik.values.password,
          name,
          email,
          socialType: 'google',
          photo: imageUrl,
        })
      );
    } catch (err) {
      handleCatch(err);
    }
  };

  console.log('Goole Client Id', process.env.REACT_APP_GOOGLE_CLIENTID);
  return (
    <>
      <Stack direction='row' spacing={2}>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          // cookiePolicy={'single_host_origin'}
          icon={false}
          render={(renderProps) => (
            <Button
              fullWidth
              size='large'
              color='inherit'
              variant='outlined'
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <Iconify
                icon='eva:google-fill'
                color='#5BE584'
                width={22}
                height={22}
              />
            </Button>
          )}
        />

        <Button
          fullWidth
          size='large'
          color='inherit'
          variant='outlined'
          sx={{ position: 'relative' }}
          // onClick={renderProps.onClick}
          startIcon={
            <Iconify
              icon='eva:facebook-fill'
              color='#1877F2'
              width={22}
              height={22}
            />
          }
        >
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_CLIENTID}
            autoLoad={false}
            fields='name,email,picture'
            callback={responseFacebook}
            cssClass='facebook-button'
            size='small'
            textButton=''
            icon={
              <Iconify
                icon='eva:facebook-fill'
                color='#1877F2'
                width={22}
                height={22}
              />
            }
          />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
