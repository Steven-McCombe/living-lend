import React, { useState } from 'react';
import {MDBBtn} from 'mdb-react-ui-kit';
import Cart from '../components/CartSide';

export default function Home() {

  return (
    <>
      <header 
        className='bg-image'
        style={{
          backgroundImage: "url('https://source.unsplash.com/WgkA3CSFrjc')",
          height: '100vh',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <div className='vh-100' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-0'>LIVING LEND</h1>
              <h5 className='mb-4'>RENT THE FURNITURE, LIVE YOUR DREAMS</h5>
              <MDBBtn className="align-items-center"
                color='light'
                tag="a"
                size="m"
                rel="nofollow"
                href='/products'
              >
                Get Started
              </MDBBtn>
            </div>
          </div>
        </div>
      </header>
      <div>
        <Cart />
      </div>
    </>
  );
}
