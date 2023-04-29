import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchProductDetail } from '../../api';
import { Box, Text, Button } from '@chakra-ui/react';
import moment from 'moment';
import ImageGalery from 'react-image-gallery';

const ProductDetail = () => {
  const { product_id } = useParams();
  const { data, isLoading, error } = useQuery(['product', product_id], () =>
    fetchProductDetail(product_id)
  );

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  console.log(data);

  const images = data.photos.map((url) => ({ original: url }));

  return (
    <Box>
      <Button colorScheme="pink">Add to Basket</Button>
      <Text fontSize="2xl">{data.title}</Text>
      <Text>{moment(data.createdAt).format('DD/MM/YYYY')}</Text>
      <Text>{data.description}</Text>
      <Text>{data.price}</Text>
      <ImageGalery items={images} />
    </Box>
  );
};

export default ProductDetail;
