import { Box, Image, Button } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment';

const Card = ({ item }) => {
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
      <Button colorScheme="pink">Add To Basket</Button>
    </Box>
  );
};

export default Card;
