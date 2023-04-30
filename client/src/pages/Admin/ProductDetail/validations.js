import * as Yup from 'yup';

export const editScheme = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  price: Yup.number().required('Price is number only'),
  description: Yup.string().min(5).required('Description is required'),
});
