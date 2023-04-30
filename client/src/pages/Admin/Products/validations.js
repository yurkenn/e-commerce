import * as Yup from 'yup';

export const newProductScheme = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  price: Yup.string().required('Price is required'),
  description: Yup.string().min(5).required('Description is required'),
});
