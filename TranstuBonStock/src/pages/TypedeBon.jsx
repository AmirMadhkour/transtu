import React from 'react'
import Footer from  "../context/Footer"
import NavbartypeBon from '../context/NavbartypeBon';

function TypedeBon() {

    const style = {
        backgroundColor: '#E9D280',
        minHeight: '100vh', // Ensure the background color covers the full viewport height
       
      };
 
 
    return (
    
        <>
    <div style={style}>
    <NavbartypeBon />
        <main>
          {/*@Todo-contnue*/}
        </main>

    <Footer/>

    </div>

    </>
    
  )
}

export default TypedeBon