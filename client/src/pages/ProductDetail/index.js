import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchProductDetail } from '../../api';
import { Box, Text, Button } from '@chakra-ui/react';
import moment from 'moment';
import ImageGalery from 'react-image-gallery';
import { useBasket } from '../../context/BasketContext';

const ProductDetail = () => {
  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();
  const { data, isLoading, error } = useQuery(['product', product_id], () =>
    fetchProductDetail(product_id)
  );

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  console.log(data);

  const findBasketItem = items.find((item) => item._id === product_id);

  const images = data.photos.map((url) => ({ original: url }));

  return (
    <Box>
      <Button
        onClick={() => addToBasket(data, findBasketItem)}
        colorScheme={findBasketItem ? 'green' : 'red'}
      >
        {findBasketItem ? 'Remove from Basket' : 'Add to Basket'}
      </Button>
      <Text fontSize="2xl">{data.title}</Text>
      <Text>{moment(data.createdAt).format('DD/MM/YYYY')}</Text>
      <Text>{data.description}</Text>
      <Text>{data.price}</Text>
      <ImageGalery items={images} />
    </Box>
  );
};

export default ProductDetail;
