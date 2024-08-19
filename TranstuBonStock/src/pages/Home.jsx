import React from 'react';
import NavbarHome from '../share/NavbarHome';
import { Box, Image, Text, VStack, Heading, HStack, Stack } from '@chakra-ui/react';
import img from '../Images/newttranstu.jpg';
import bus from '../Images/Transtu-Bus.jpg';

function Home() {

  const style = {
    backgroundColor: '#E9D280',
    minHeight: '100vh',
    padding: '20px',
  };

  return (
    <>
      <NavbarHome />
      <Box style={style} p={8}>
        <HStack w="100%" justify="space-between" mb={8}>
          <Heading as="h1" size="xl">
            About Transtu
          </Heading>
        </HStack>
        <VStack spacing={8}>
          <Box w="100%" textAlign="left">
            <Text fontSize="lg" fontFamily="'Arial', sans-serif">
              Transtu (Société des Transports de Tunis) is a public transportation company that serves the Tunisian capital, Tunis. Established to facilitate the movement of people within the city and its suburbs, Transtu operates a variety of transportation services including buses, trams, and suburban trains. The company plays a crucial role in the daily commute of thousands of residents, contributing significantly to the urban mobility of the region.
            </Text>
          </Box>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={8}>
            <Box boxShadow="lg" borderRadius="md" overflow="hidden">
              <Image 
                src={img}
                alt="Transtu Bus"
                transition="transform 0.3s"
                _hover={{ transform: 'scale(1.05)' }}
              />
            </Box>
            <Box w="100%" textAlign="left">
              <Text fontSize="lg" fontFamily="'Arial', sans-serif">
                The tram network, which is one of the most significant aspects of Transtu's services, connects the central parts of Tunis with its outer districts. The buses operate on numerous routes, providing extensive coverage across the city. Transtu’s commitment to maintaining and improving its services has made it a reliable option for public transportation in Tunis.
              </Text>
            </Box>
          </Stack>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={8}>
            <Box w="100%" textAlign="left">
              <Text fontSize="lg" fontFamily="'Arial', sans-serif">
                Transtu continues to modernize its fleet and infrastructure, ensuring that the transportation services remain efficient and accessible to all residents. The company also emphasizes sustainability by integrating environmentally friendly practices into its operations.
              </Text>
            </Box>
            <Box boxShadow="lg" borderRadius="md" overflow="hidden">
              <Image 
                src={bus}
                alt="Transtu Tram"
                transition="transform 0.3s"
                _hover={{ transform: 'scale(1.05)' }}
              />
            </Box>
          </Stack>
        </VStack>
      </Box>
    </>
  );
}

export default Home;
