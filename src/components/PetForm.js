import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
// material
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import * as yup from 'yup';
import logo from 'assets/download.png';
// components
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Add, CameraAlt } from '@mui/icons-material';
import { FormikTextField } from 'components/formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PREFIX = 'PetForm';
const classes = {
  root: `${PREFIX}-root`,
  Input: `${PREFIX}-Input`,
  CardContentBox: `${PREFIX}-CardContentBox`,
};

const StyledCard = styled(Card)({
  [`& .${classes.root}`]: {
    minWidth: 275,
    maxWidth: 800,
    margin: 'auto',
  },
  [`& .${classes.Input}`]: {
    marginBottom: '2rem',
  },
  [`& .${classes.CardContentBox}`]: {
    maxWidth: 400,
    textAlign: 'center',
    margin: 'auto',
  },
});

const validationSchema = yup.object({
  name: yup.string(`Enter Pet's name`).required('Name is required!'),
  age: yup.string(`Enter Pet's age`).required('Age is required!'),
  city: yup.string(`Enter Pet's city`).required('City is required!'),
});

const PetForm = ({ handleSubmit, slug, update, pet, fetching }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((st) => st.pets);
  const [photo, setPhoto] = useState('');

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      city: '',
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      formik.setSubmitting(true);
    },
  });

  useEffect(() => {
    if (!update || !pet) return;

    formik.setValues({
      name: pet.name,
      age: pet.age,
      city: pet.city,
    });
    setPhoto(pet.avatar);
  }, [pet, update]);
  const handlePhoto = async (e) => {
    formik.setFieldValue('avatar', e.target.files[0]);
    const convert64 = await base64(e.target.files[0]);
    setPhoto(convert64);
  };
  const handleForm = async () => {
    console.log('formik.values', formik.values);

    handleSubmit(
      {
        ...formik.values,
      }
      // formik.resetForm
    );
  };
  const base64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  useEffect(() => {
    console.log('formik.errors', formik.errors);
  }, [formik.errors]);

  useEffect(() => {
    formik.setSubmitting(loading);
  }, [loading]);

  const handleImageUpload = async (e, toggleFunc, cb) => {
    toggleFunc?.();
    const selectedFile = e.target.files[0];
    const fileType = ['image/'];
    try {
      console.log(`selectedFile.type`, selectedFile.type);
      if (selectedFile && selectedFile.type.includes(fileType)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async (e) => {
          //console.log(`result onLoadEnd`, e.target.result);
          const file = e.target.result;

          // TODO  Delete Image from cloudinary if it exists on this pet

          // // * 1 Upload Image on Cloudinary
          const formData = new FormData();
          formData.append('file', file);
          formData.append(
            'upload_preset',
            process.env.REACT_APP_CLOUDINARY_PRESET
          );

          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
          );
          const uploadedImage = {
            url: res.data.secure_url,
            asset_id: res.data.asset_id,
            public_id: res.data.public_id,
          };
          console.log(`res`, res);

          cb(uploadedImage);
          toggleFunc?.();
        };
      } else {
        toast.error('Only Image files are acceptable !');
      }
    } catch (err) {
      toast(
        err?.response?.data?.message || err.message || 'Something Went Wrong'
      );
      console.log(`err`, err);
    }
  };

  const handleRole = (e) => {
    formik.handleBlur(e);
    formik.setFieldValue(e.target.name, e.target.value);
  };

  if (update && (fetching || !pet)) return <div className='loader'></div>;
  return (
    <StyledCard className={classes.root}>
      <CardContent sx={{ py: 0 }}>
        <Box className={classes.CardContentBox}>
          <Typography
            variant='h4'
            textAlign='center'
            color='textprimary'
            gutterBottom
          >
            {slug} Pet
          </Typography>
          <FormikTextField
            formik={formik}
            name='name'
            label='Name'
            fullWidth
            className={classes.Input}
          />
          <FormikTextField
            formik={formik}
            name='age'
            label='Age'
            type='number'
            fullWidth
            className={classes.Input}
          />
          <FormikTextField
            formik={formik}
            name='city'
            label='City'
            fullWidth
            className={classes.Input}
          />
        </Box>
      </CardContent>
      <CardActions
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 30,
          paddingRight: 20,
        }}
      >
        <Button
          disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
          size='medium'
          variant='contained'
          onClick={handleForm}
          endIcon={<Add />}
        >
          {slug}
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default PetForm;
