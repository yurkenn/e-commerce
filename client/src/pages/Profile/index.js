import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Box, Flex, Text } from '@chakra-ui/react';

const Profile = () => {
  const { user } = useAuth();
  return (
    <Box>
      <Text fontSize={25}>Profile</Text>
      <Flex>
        <Text>{user.email}</Text>
      </Flex>
    </Box>
  );
};

export default Profile;
