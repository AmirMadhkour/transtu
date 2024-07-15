import React from 'react';
import NavbarHome from '../context/NavbarHome';
import Footer from  "../context/Footer"

function Home() {

    
  const style = {
    backgroundColor: '#E9D280',
    minHeight: '100vh', // Ensure the background color covers the full viewport height
   
  };

  return (
    <>
    <div style={style}>
    <NavbarHome />
        <main>
          {/*@Todo-contnue*/}
        </main>

    <Footer/>

    </div>

    </>
  );
}

export default Home;
