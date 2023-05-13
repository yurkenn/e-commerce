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

  const findBasketItem = items.find((item) => item._id === product_id);

  const images = data.photos.map((url) => ({ original: url }));

  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={'10'}>
      <Box w={'30%'} mr={'10'}>
        <ImageGalery items={images} />
      </Box>
      <Box w={'40%'}>
        <Text fontSize={'2xl'} fontWeight={'bold'}>
          {data.title}
        </Text>
        <Text color={'grey'} fontWeight={'bold'}>
          {data.description}
        </Text>
        <Text fontSize={'xl'} fontWeight={'bold'}>
          {data.category}
        </Text>
        <Text fontSize={'sm'} fontWeight={'bold'}>
          {moment(data.createdAt).format('DD/MM/YYYY')}
        </Text>
        <Text color="green" mt={5} fontSize={'xl'} fontWeight={'bold'}>
          {data.price} TL
        </Text>
        <Button
          mt={'5'}
          onClick={() => addToBasket(data, findBasketItem)}
          colorScheme={findBasketItem ? 'green' : 'red'}
        >
          {findBasketItem ? 'Remove from Basket' : 'Add to Basket'}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetail;
