import React from 'react';
import '../index.css';
import LoginSection from '../components/LoginSection';
import { Flex } from '@chakra-ui/react';
import LeftSection from '../components/LeftSection';

const Login = () => {
  const style = {
    backgroundColor: '#E9D280',
    minHeight: '100vh',
    padding: '20px',
  };
  return (
    
    <div style={style}>
        <Flex>
        <LeftSection />
        <LoginSection />
        </Flex>
      
    </div>
    
  );
};

export default Login;