import React from 'react';

import { useQuery } from 'react-query';
import { fetchOrders } from '../../../api';

import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';

function Orders() {
  const { data, isLoading, isError, error } = useQuery('admin:orders', fetchOrders);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data);

  return (
    <div>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Orders</TableCaption>
          <Thead>
            <Tr>
              <Th>USER</Th>
              <Th>ADDRESS</Th>
              <Th isNumeric>ITEMS</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item._id}>
                <Td>{item.user.email}</Td>
                <Td>{item.adress}</Td>
                <Td isNumeric>{item.items.length}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Orders;
