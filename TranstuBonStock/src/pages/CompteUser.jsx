import React, { useContext, useEffect } from 'react';
import NavbarHome from '../share/NavbarHome';
import {
  Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, 
  FormControl, FormErrorMessage, FormHelperText, Input, 
  InputGroup, InputLeftElement, InputRightElement, IconButton, Button, 
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, 
  Spacer
} from '@chakra-ui/react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import CompteUserContext from '../context/CompteUserContext';


function CompteUser() {
  const style = {
    backgroundColor: '#E9D280',
    minHeight: '77vh',
    padding: '20px',
  };

  useEffect(()=>{
    getUser();
  },[]);

  const {
    input,
    password,
    confirmPassword,
    showPassword,
    handleInputChange,
    showConfirmPassword,
    handleTogglePassword,
    handleToggleConfirmPassword,
    isError,
    isConfirmPasswordError,
    setConfirmPassword,
    setPassword,
    isOpen,
    handleSaveChanges,
    getUser,
    set_UserName,
    tel,
    setTel,
    onClose,
    handleEdit,
    _username,
    newPassword,
    setNewPassword,
    email,
    setEmail,
  } = useContext(CompteUserContext);

  return (
    <>
      <NavbarHome />
      <div style={style}>
        <Card>
          <CardHeader>
            <Heading size='md'>Compte User</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>Username</Heading>
                <FormControl>
                  <Box as='div' borderRadius='md' bg='#0B7B16' color='white' px={4} h={8} display='flex' alignItems='center'>
                    {_username}
                  </Box>
                </FormControl>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>E-mail</Heading>
                <FormControl>
                  <Box as='div' borderRadius='md' bg='#0B7B16' color='white' px={4} h={8} display='flex' alignItems='center'>
                    {email}
                  </Box>
                </FormControl>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>Telephone</Heading>
                <FormControl>
                  <Box as='div' borderRadius='md' bg='#0B7B16' color='white' px={4} h={8} display='flex' alignItems='center'>
                    {tel}
                  </Box>
                </FormControl>
              </Box>
          
              
            </Stack>
          </CardBody>
          <Button bg="#3440C6" color="white" onClick={() => handleEdit({ fullName: _username, mail: email, password, tel })}>Edit</Button>
        </Card>
        
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <center>
                <label>UserName</label>
              </center>
              <Spacer />
              <Input
                type="text"
                onChange={e => set_UserName(e.target.value)}
                value={_username}
                borderColor="green"
              />
              <Spacer />
              <center>
                <label>Email</label>
              </center>
              <Spacer />
              <FormControl isInvalid={isError}>
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  borderColor="green"
                />
                {!isError ? (
                  <FormHelperText>
                    Enter the email you'd like to receive the newsletter on.
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>
              <Spacer />
              <center>
                <label>Telephone</label>
              </center>
              <Spacer />
              <Input
                type="text"
                onChange={e => setTel(e.target.value)}
                value={tel}
                borderColor="green"
              />
             
              <Spacer />
              <center>
                <label>Password</label>
              </center>
              <Spacer />
              <Input
                type="text"
                onChange={e => setPassword(e.target.value)}
                value={password}
                borderColor="green"
              />
              <Spacer />

              <center>
                <label>New Password</label>
              </center>
              <FormControl mb={2} position="relative">
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<FaLock color="gray.300" />} />
                  <Input
                    pr="4.5rem"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <IconButton
                      h="1.75rem"
                      size="sm"
                      onClick={handleTogglePassword}
                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Spacer />
              <center>
                <label>Confirm Password</label>
              </center>
              <Box>
                <FormControl mb={2} isInvalid={isConfirmPasswordError}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" children={<FaLock color="gray.300" />} />
                    <Input
                      pr="4.5rem"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <IconButton
                        h="1.75rem"
                        size="sm"
                        onClick={handleToggleConfirmPassword}
                        icon={showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                      />
                    </InputRightElement>
                  </InputGroup>
                  {isConfirmPasswordError && (
                    <FormErrorMessage>Passwords do not match.</FormErrorMessage>
                  )}
                </FormControl>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSaveChanges}>Save Changes</Button>
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}

export default CompteUser;