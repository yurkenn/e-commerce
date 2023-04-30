import React from 'react';
import { useBasket } from '../../context/BasketContext';
import { Alert, Box, Button, Image, Link, Text } from '@chakra-ui/react';

const Basket = () => {
  const { items, removeFromBasket } = useBasket();

  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  return (
    <Box p={5}>
      {items.length < 1 && <Alert status="warning">You don't have any items in your basket</Alert>}
      {items.length > 0 && (
        <>
          <ul style={{ listStyleType: 'decimal' }}>
            {items.map((item) => (
              <li key={item._id} style={{ marginBottom: 15 }}>
                <Link to={`/product/${item._id}`}>
                  <Text fontSize={20}>
                    {item.title} - {item.price} TL
                  </Text>
                  <Image
                    src={item.photos && item.photos[0]}
                    alt="product"
                    loading="lazy"
                    htmlWidth={200}
                  />
                </Link>
                <Button
                  onClick={() => removeFromBasket(item._id)}
                  mt="2"
                  size="sm"
                  colorScheme="red"
                >
                  Remove from basket
                </Button>
              </li>
            ))}
          </ul>
          <Box mt={5}>
            <Text fontSize={20}>Total: {total} TL</Text>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Basket;
