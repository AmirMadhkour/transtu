import React from 'react'
import LeftSection from '../components/LeftSection';
import SignUpSection from '../components/SignUpSection';
import { Flex } from '@chakra-ui/react';



function SignUP() {
  const style = {
    backgroundColor: '#E9D280',
    minHeight: '100vh',
    padding: '20px',
  };
  return (
    <div style={style}>
      <Flex>
        <LeftSection />
        <SignUpSection />
      </Flex>
    </div>
  )
}

export default SignUP