import React from 'react';
import { useBasket } from '../../context/BasketContext';
import {
  Alert,
  Box,
  Button,
  Image,
  Link,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormLabel,
  FormControl,
  Textarea,
} from '@chakra-ui/react';
import { postOrder } from '../../api';

const Basket = () => {
  const [address, setAddress] = React.useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);

  const { items, removeFromBasket, emptyBasket } = useBasket();

  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  const handleSubmitForm = async () => {
    const itemIds = items.map((item) => item._id);

    const input = {
      address,
      items: JSON.stringify(itemIds),
    };

    const response = await postOrder(input);
    console.log(response);
    emptyBasket();
    onClose();
  };

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

          <Button onClick={onOpen} mt={5} size="sm" colorScheme="green">
            Order
          </Button>
          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Order</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Textarea
                    ref={initialRef}
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button onClick={handleSubmitForm} colorScheme="blue" mr={3}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
};

export default Basket;
