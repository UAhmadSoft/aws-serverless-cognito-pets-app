import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
// layouts
// components
import Page from 'components/Page';
import { MHidden } from 'components/@material-extend';
import { LoginForm } from 'components/authentication/login';
import AuthSocial from 'components/auth/AuthSocial';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle title='Login'>
      <MHidden width='mdDown'>
        <SectionStyle>
          <Typography variant='h3' sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
        </SectionStyle>
      </MHidden>

      <Container maxWidth='sm'>
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant='h4' gutterBottom>
              Sign in
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Enter your details below.
            </Typography>
          </Stack>

          <LoginForm />

          <Typography variant='body2' align='center' sx={{ mt: 3 }}>
            Confirm your account ?{' '}
            <Link variant='subtitle2' component={RouterLink} to='/confirm-mail'>
              Confirm Email
            </Link>
          </Typography>
          <Typography variant='body2' align='center' sx={{ mt: 3 }}>
            Don’t have an account?&nbsp;
            <Link variant='subtitle2' component={RouterLink} to='/signup'>
              Get started
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
