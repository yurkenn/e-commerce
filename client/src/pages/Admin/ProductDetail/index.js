import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchProductDetail, updateProduct } from '../../../api';

import { FieldArray, Formik } from 'formik';
import { Box, Button, FormControl, FormLabel, Input, Text, Textarea } from '@chakra-ui/react';
import { editScheme } from './validations';
import { message } from 'antd';

const ProductDetail = () => {
  const { product_id } = useParams();

  const { data, isLoading, isError, error } = useQuery(['admin:product', product_id], () =>
    fetchProductDetail(product_id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  const handleSubmit = async (values , bag) => {
    console.log(values);
    message.loading({ content: 'Loading...', key: 'product-update' });
    try {
        await updateProduct(product_id, values);
        message.success({ content: 'Updated!', key: 'product-update', duration: 2 });
    } catch (error) {
        message.error({ content: 'Error!', key: 'product-update', duration: 2 });
    }
  };

  return (
    <div>
      <Text fontSize="2xl">Edit</Text>

      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          price: data.price,
          photos: data.photos,
        }}
        validationSchema={editScheme}
        onSubmit={handleSubmit}
      >
        {({ values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Box mt={2}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  placeholder="Title"
                  disabled={isSubmitting}
                />
                {touched.title && errors.title && <Text color="red">{errors.title}</Text>}
              </FormControl>
              <FormControl mt={2}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  type="text"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  placeholder="Description"
                  disabled={isSubmitting}
                  height={150}
                />
                {touched.description && errors.description && (
                  <Text color="red">{errors.description}</Text>
                )}
              </FormControl>
              <FormControl mt={2}>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  name="price"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  placeholder="Price"
                  disabled={isSubmitting}
                />
                {touched.price && errors.price && <Text color="red">{errors.price}</Text>}
              </FormControl>
              <FormControl mt={2}>
                <FormLabel>Photos</FormLabel>
                <FieldArray
                  name="photos"
                  render={(arrayHelpers) => (
                    <div>
                      {values.photos &&
                        values.photos.map((photo, index) => (
                          <div key={index}>
                            <Input
                              type="text"
                              name={`photos.${index}`}
                              value={photo}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={isSubmitting}
                              width="3xl"
                              mt={2}
                            />
                            <Button
                              colorScheme="red"
                              ml={3}
                              type="button"
                              disabled={isSubmitting}
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      <Button
                        colorScheme="green"
                        mt={2}
                        type="button"
                        onClick={() => arrayHelpers.push('')}
                        disabled={isSubmitting}
                      >
                        Add Photo
                      </Button>
                    </div>
                  )}
                />
              </FormControl>
              <Button mt={2} type="submit" disabled={isSubmitting}>
                Submit
              </Button>

              <Button mt={5} width={'full'} type="submit" isLoading={isSubmitting}>
                Update
              </Button>
            </form>
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default ProductDetail;
