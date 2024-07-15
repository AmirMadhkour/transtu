import React from 'react'
import LeftSection from '../components/LeftSection';
import SignUpSection from '../components/SignUpSection';
import { Flex } from '@chakra-ui/react';



function SignUP() {
  return (
    <div>
      <Flex>
        <LeftSection />
        <SignUpSection />
      </Flex>
    </div>
  )
}

export default SignUP