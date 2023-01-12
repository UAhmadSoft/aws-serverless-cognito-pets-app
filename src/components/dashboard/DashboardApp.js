// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from 'components/Page';
import AppCard from 'components/dashboard/AppCard';
import userIcon from '@iconify/icons-ant-design/user';
import publishedIcon from '@iconify/icons-ant-design/android-filled';
import { useDispatch, useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const dispatch = useDispatch();
  const { users } = useSelector((st) => st.users);
  // const { reviews } = useSelector((st) => st.reviews);

  return (
    <Page title='Dashboard'>
      <Container maxWidth='xl'>
        <Box sx={{ pb: 5 }}>
          <Typography variant='h4'>Hi, Welcome back</Typography>
          <Typography variant='h5'>
            This App is for the management of the documents and users.
          </Typography>
        </Box>
        <Grid
          container
          spacing={3}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <AppCard
              num={users?.length || 0}
              icon={userIcon}
              title='Users'
              color='info'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppCard
              num={0}
              icon={publishedIcon}
              title='Documents'
              color='warning'
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
