import * as Yup from 'yup';

export const SigninValidation = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});
