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
import { confirmMail } from 'store/slices/auth/extraReducers';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function ConfirmMail() {
  const dispatch = useDispatch();
  const { loading, userPool } = useSelector((st) => st.auth);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const SignupSchema = Yup.object().shape({
    username: Yup.string().required('UserName is Required'),
    code: Yup.string()
      .matches(/^\d{6}$/, 'Code should be 6 digits')
      .required('Code is required'),

    // code must be 6 digits
  });

  useEffect(() => {
    formik.setSubmitting(loading);
  }, [loading]);

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: SignupSchema,
    onSubmit: () => {
      // console.log(`'formik.va'`, formik.values);

      dispatch(
        confirmMail({
          code: formik.values.code,
          username: formik.values.username,
          userPool,
        })
      ).then(({ error }) => {
        if (!error) {
          formik.resetForm();
          navigate('/login');
        }
      });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label='Username'
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />
          <TextField
            fullWidth
            label='Code'
            {...getFieldProps('code')}
            error={Boolean(touched.code && errors.code)}
            helperText={touched.code && errors.code}
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
          Confirm Mail
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
