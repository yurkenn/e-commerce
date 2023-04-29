import React from 'react';
import { Box, Flex, Heading, FormControl, FormLabel, Input, Button, Alert } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { fetchLogin } from '../../../api';
import { useAuth } from '../../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { SigninValidation } from './validations';

const Signin = () => {
  const { login } = useAuth();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SigninValidation,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await fetchLogin({ email: values.email, password: values.password });
        login(loginResponse);
        history.push('/profile');
        console.log(loginResponse);
      } catch (error) {
        bag.setErrors({ general: error.response.data.message });
      }
    },
  });

  return (
    <div>
      <Flex align={'center'} justifyContent={'center'} width={'full'}>
        <Box pt={10}>
          <Box textAlign={'center'}>
            <Heading>Sign In</Heading>
          </Box>
          <Box my={5} textAlign={'left'}>
            {
              // Display error message
              formik.errors.general && <Alert status="error">{formik.errors.general}</Alert>
            }
            <form onSubmit={formik.handleSubmit}>
              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <Box color={'red.500'}>{formik.errors.email}</Box>
                ) : null}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <Box color={'red.500'}>{formik.errors.password}</Box>
                ) : null}
              </FormControl>

              <Button mt={4} width={'full'} type="submit">
                Signin
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
};

export default Signin;
