import { Box, Image, Button } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment';
import { useBasket } from '../../context/BasketContext';

const Card = ({ item }) => {
  const { addToBasket, items } = useBasket();

  const findBasketItem = items.find((basket_item) => basket_item._id === item._id);

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
      <Link to={`/product/${item._id}`}>
        <Image
          className="image"
          src={item.photos[0]}
          alt="product"
          loading="lazy"
          resizable="yes"
        />
        <Box p="6">
          <Box d="plex" alignItems="baseline">
            {moment(item.createdAt).format('DD.MM.YYYY')}
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            {item.title}
          </Box>
          <Box>{item.price}</Box>
        </Box>
      </Link>
      <Button
        onClick={() => addToBasket(item, findBasketItem)}
        colorScheme={findBasketItem ? 'red' : 'green'}
      >
        {findBasketItem ? 'Remove from Basket' : 'Add to Basket'}
      </Button>
    </Box>
  );
};

export default Card;
