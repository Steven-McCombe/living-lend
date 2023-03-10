import react from 'react'
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
  
export default function Signup() {
    return (
        <MDBContainer fluid className = "my-3">
    
   
              <MDBRow>
                <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center justify-content-center'>
    
                  <p classNAme="h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
    
                  <div className="d-flex flex-row align-items-center mb-4 ">
                    <MDBIcon fas icon="user me-3" size='lg'/>
                    <MDBInput label='Your Name' id='form1' type='text' className='w-100'/>
                  </div>
    
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="envelope me-3" size='lg'/>
                    <MDBInput label='Your Email' id='form2' type='email'/>
                  </div>
    
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3" size='lg'/>
                    <MDBInput label='Password' id='form3' type='password'/>
                  </div>
    
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="key me-3" size='lg'/>
                    <MDBInput label='Repeat your password' id='form4' type='password'/>
                  </div>
    
                  <div className='mb-4'>
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                  </div>
    
                  <MDBBtn className='mb-4' size='lg'>Register</MDBBtn>
    
                </MDBCol>
    
                <MDBCol col='10' md='6' className = "d-flex align-items-center">
                  <img src="https://source.unsplash.com/emqnSQwQQDo" className="img-fluid rounded mb-3 shadow" alt="Bedroom" style={{width: '75%', height: '75%'}}/>
                </MDBCol>
    
              </MDBRow>
    
        </MDBContainer>
      );

}