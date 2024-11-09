import '../index.css';
import { Image, Flex } from '@chakra-ui/react';
import  img from "../Images/Transtu-Bus.jpg"

const LeftSection = () => {
  
  return (
    <div className="left-section">
      <Flex alignItems="center" justifyContent="flex-start"
       height="87vh">
      <Image 
       src={img}
       alt="Prod'Active"  
       height="100%"
       width="200%"
        />
      </Flex>
    </div>
  );
};

export default LeftSection;
   
