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
  const { pets } = useSelector((st) => st.pets);
  // const { reviews } = useSelector((st) => st.reviews);

  return (
    <Page title='Dashboard'>
      <Container maxWidth='xl'>
        <Box sx={{ pb: 5 }}>
          <Typography variant='h4'>Hi, Welcome back</Typography>
          <Typography variant='h5'>
            This App is for the management of the documents and pets.
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
            <AppCard num={pets?.length || 0} title='Pets' color='info' />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
