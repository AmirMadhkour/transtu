import React from 'react'
import {Image} from "@chakra-ui/react";
import NavbarMT from '../context/NavabarMT';
import Footer from '../context/Footer';
import bus from '../Images/Transtu-Bus.jpg'
function BusPage() {



    const style = {
        backgroundColor: '#E9D280',
        minHeight: '100vh', // Ensure the background color covers the full viewport height
       
      };
    
  return (
    <>
    <NavbarMT/>
   
    <div style={style}>

        <Image
              src={bus}
              width="590px"
              height="490px"
              cursor="pointer"
            />
             <Image
              src={bus}
              width="590px"
              height="490px"
              cursor="pointer"
            />
        {/*@Todo */}
        
        </div>
    <Footer/>
        </>
  )
}

export default BusPage