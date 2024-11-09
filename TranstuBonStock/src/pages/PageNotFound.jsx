import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function PageNotFound() {

  const style = {
    backgroundColor: '#E9D280',
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    backgroundImage: 'url("/TranstuBonStock/src/Images/newttranstu.jpg")', // Add your image path here
    backgroundSize: 'cover', // Ensures the image covers the entire background
    backgroundPosition: 'center', // Centers the background image
    backgroundRepeat: 'no-repeat',
  };

  return (
    <Box style={style}>
      <Heading as="h1" size="2xl" mb={4}>
        404
      </Heading>
      <Text fontSize="xl" mb={6}>
        Oops! The page you're looking for doesn't exist.
      </Text>
      <Link to="/Login">
        <Button colorScheme="blue">Go Back to Login Page</Button>
      </Link>
    </Box>
  );
}

export default PageNotFound;
