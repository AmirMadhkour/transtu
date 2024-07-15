import React from 'react';
import '../index.css';
import LoginSection from '../components/LoginSection';
import { Flex } from '@chakra-ui/react';
import LeftSection from '../components/LeftSection';

const Login = () => {
  return (
    <div>
      <Flex>
        <LeftSection />
        <LoginSection />

      </Flex>
    </div>
  );
};

export default Login;