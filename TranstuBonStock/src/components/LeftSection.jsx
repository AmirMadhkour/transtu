import '../index.css';
import { Image, Flex } from '@chakra-ui/react';
import  img from "../Images/IMGBN64195transtu.jpg"

const LeftSection = () => {
  
  return (
    <div className="left-section">
      <Flex alignItems="center" justifyContent="flex-start"
       height="100vh">
      <Image 
       src={img}
       alt="Prod'Active" 
      w={5000} 
       height="100%"
        />
      </Flex>
    </div>
  );
};

export default LeftSection;
   
