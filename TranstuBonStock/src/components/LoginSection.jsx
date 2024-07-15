import  { useState } from 'react';
import { Input, InputGroup, InputLeftElement, VStack } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { Text, Stack } from '@chakra-ui/react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Box, FormControl, FormLabel, Button, InputRightElement, IconButton } from '@chakra-ui/react';
//import { fetchUsers } from '../api/userapi';
import { useQuery } from '@tanstack/react-query';
import { useNavigate , Link } from 'react-router-dom';
const LoginSection = () => {
//const { data } = useQuery({ queryKey: "user", queryFn: fetchUsers });
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [wrongAccount , setWrongAccount] = useState('') ; 
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate() ; 

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!username.trim()) {
      errors.username = 'Username is required';
      isValid = false;
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
       setErrors({}) ; 
     const account = data.find((c) => c.username===username && c.password === password) ; 
     if (account) {
      setErrors({}) ; 
      setWrongAccount('') ;
      console.log("yes you have account") ; 
       navigate('/') ;
     } else {
      console.log("no account")
       setWrongAccount("wrong account") ; 
     }
        
    }
  };

  return (
    <VStack className="right-section" marginY="auto" bgColor="#E9D280">
      <Heading style={{ fontSize: '4em', padding: '20px' }}>Transtu</Heading>
      <Stack spacing={3}>
        <Text fontSize="3xl" position="relative" top="0px" fontWeight="bold">
          Welcome back! Please log in to access your account.
        </Text>
      </Stack>

      <form onSubmit={handleSubmit}>
        <Box width="350px" margin="auto" marginTop="60px">
          <center>
            <FormControl mb={2}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaUser color="gray.300" />} />
                <Input
                  pr="4.5rem"
                  type="text"
                  id="username"
                  placeholder="Enter your Username"
                  width="100%"
                  focusBorderColor="blue.500"
                  color="black"
                  borderWidth={2}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            {errors.username && <Box color="red.500" mt={2} fontSize="small">{errors.username}</Box>} 

            <FormControl mb={2} position="relative">
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaLock color="gray.300" />} />
                <Input
                  pr="4.5rem"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your Password"
                  width="100%"
                  focusBorderColor="blue.500"
                  color="black"
                  borderWidth={2}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement position="absolute" right="0" top="50%" transform="translateY(-50%)">
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    onClick={handleTogglePassword}
                    icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {errors.password && <Box color="red.500" mt={2} fontSize="small">{errors.password}</Box>}

            <Button type="submit" marginTop="20px" colorScheme="blue" width="70%">
              Log In
            </Button>
             <Box color="red.500" mt={2} fontSize="small"> {wrongAccount} </Box>
             <Box marginTop="5px">
              <Link to="/SignUp">Register Now.</Link>
            </Box>
          </center>

        </Box>
      </form>
    </VStack>
  );
};

export default LoginSection;
