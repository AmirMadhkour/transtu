import React, { useState, useEffect } from 'react';
import '../index.css';
import {
  Heading,
  Text,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Button,
  Input,
  InputRightElement,
  InputLeftElement,
  IconButton,
  VStack,
  InputGroup
} from '@chakra-ui/react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa6";
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { MdEmail, MdPhone } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { addUsers, fetchUsers } from '../api/UserPageAPI';

const SignUpSection = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tel, setTel] = useState('');
  const [userData, setUserData] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const { handleSubmit } = useForm();

  const submitData = async () => {
    if (tel.length === 0 || username.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
      setError('Please fill in all fields.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else if (!validateEmail(email)) {
      setError('Email is invalid.');
    } else if (tel.length < 8) {
      setError('Phone number is incorrect.');
    } else {
      const updatedData = {
        login: username,
        mail: email,
        tel,
        fullName: username,
        password
      };

      try {
        await addUsers(updatedData);
        await fetchUsersData(); // Refetch user data
        setError('');
        navigate('/Login');
      } catch (error) {
        console.error("Error adding the user:", error);
      }
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const data = await fetchUsers();
      console.log('Fetched users data:', data);
      setUserData(data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  return (
    <VStack className="right-section" marginY="auto" bgColor="#E9D280">
      <Heading style={{ fontSize: '4em', padding: '20px' }}>Transtu</Heading>
      <Stack spacing={3}>
        <Text fontSize='2xl' position="relative" top="0px" fontWeight="bold">
          Welcome aboard Transtu, where every journey begins with convenience and reliability.
        </Text>
      </Stack>

      <form onSubmit={handleSubmit(submitData)}>
        <Box width="350px" margin="auto" marginTop="0px">
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
                  onChange={(e) => setUserName(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl mt={0}>
              <FormLabel>E-mail</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<MdEmail color="gray.300" />} />
                <Input
                  placeholder='Enter your E-mail'
                  focusBorderColor='blue.500'
                  color={'black'}
                  borderWidth={2}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl mt={0}>
              <FormLabel>Telephone</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<MdPhone color="gray.300" />} />
                <Input
                  placeholder='Enter your Phone Number'
                  focusBorderColor='blue.500'
                  color={'black'}
                  borderWidth={2}
                  onChange={(e) => setTel(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl mb={2} position="relative">
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaLock color="gray.300" />} />
                <Input
                  pr="4.5rem"
                  type={!showPassword ? 'password' : 'text'}
                  placeholder="Enter your Password"
                  width="100%"
                  focusBorderColor="blue.500"
                  color="black"
                  borderWidth={2}
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

            <FormControl mb={2} position="relative">
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaLock color="gray.300" />} />
                <Input
                  pr="4.5rem"
                  type={!showPassword ? 'password' : 'text'}
                  placeholder="Confirm your Password"
                  width="100%"
                  focusBorderColor="blue.500"
                  color="black"
                  borderWidth={2}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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

            <Button type='submit' marginTop="20px" colorScheme="blue" width="70%">
              Sign Up
            </Button>
            <Text color="red">{error}</Text>
            <Box marginTop="5px">
              <Link to="/">Already registered? Log in from here.</Link>
            </Box>
          </center>
        </Box>
      </form>
    </VStack>
  );
};

export default SignUpSection;
