import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Box,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from 'store/slices/auth/extraReducers';

// ----------------------------------------------------------------------

export default function SignupForm() {
  const dispatch = useDispatch();
  const { loading, userPool } = useSelector((st) => st.auth);

  const [showPassword, setShowPassword] = useState(false);
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
    name: Yup.string().required('Name is Required'),
    username: Yup.string().required('UserName is Required'),
    age: Yup.number().min(12).max(100).required('Age is Required'),
  });

  useEffect(() => {
    formik.setSubmitting(loading);
  }, [loading]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      username: '',
      age: '',
    },
    validationSchema: SignupSchema,
    onSubmit: () => {
      // console.log(`'formik.va'`, formik.values);

      dispatch(
        signUp({
          data: {
            email: formik.values.email,
            password: formik.values.password,
            name: formik.values.name,
            username: formik.values.username,
            age: formik.values.age,
          },
          userPool,
        })
      ).then(({ error }) => {
        if (!error) formik.resetForm();
      });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label='Full Name'
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            fullWidth
            autoComplete='username'
            label='Username'
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            fullWidth
            autoComplete='email'
            type='email'
            label='Email'
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete='age'
            type='number'
            label='Age'
            {...getFieldProps('age')}
            error={Boolean(touched.age && errors.age)}
            helperText={touched.age && errors.age}
          />

          <TextField
            fullWidth
            autoComplete='current-password'
            type={showPassword ? 'text' : 'password'}
            label='Password'
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={handleShowPassword} edge='end'>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Box my={2} />
        <LoadingButton
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          loading={isSubmitting}
        >
          Signup
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
