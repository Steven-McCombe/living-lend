import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_MULTIPLE_TO_CART } from '../../utils/actions';
// import './style.css';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
  MDBBtnGroup
} from "mdb-react-ui-kit";

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  var sum = 0;

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);


  function calculateTotal() {
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });

    
    
}

const [orderTotal, setOrderTotal]  = useState(NaN);
const handleInputChange = (e) => {
        const { value } = e.target;
        return setOrderTotal(value*sum)

}


  return (
    <section>
      <MDBContainer className="h-100 py-5">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard className="shopping-cart" style={{ borderRadius: "15px" }}>
              <MDBCardBody className="text-black">
                <MDBRow>
                  <MDBCol lg="14" className="px-5 py-4">
                    <MDBTypography
                      tag="h3"
                      className="mb-5 pt-2 text-center fw-bold text-uppercase"
                    >
                      Your Cart
                    </MDBTypography>
                    {state.cart.map((item, index) => (
                    <CartItem key={`${index}:${item}`}
                    item={item} />
                    ))}

                    <hr
                      className="mb-4"
                      style={{
                        height: "2px",
                        backgroundColor: "#1266f1",
                        opacity: 1,
                      }}
                    />
                    <div
                      className="d-flex justify-content-between p-2 mb-2"
                      style={{ backgroundColor: "#e1f5fe" }}
                    >
                      <MDBTypography tag="h5" className="fw-bold mb-0">
                        Total Per Month:
                      </MDBTypography>
                      <MDBTypography tag="h5" className="fw-bold mb-0">
                        ${calculateTotal()}
                      </MDBTypography>
                    </div>
                    <MDBTypography
                      tag="h5"
                      className="mb-5 pt-2 text-center"
                    >
                        <hr
                      className="mb-4"
                      style={{
                        height: "2px",
                        backgroundColor: "#1266f1",
                        opacity: 1,
                      }}
                    />
                        <div>How many months would you like to rent your furniture?</div>
                        <form className='form'>
                        <div class="form-outline">
                        <input type="number" id="typeNumber" min="1" max="12" class="form-control" onChange={handleInputChange}/>
                        </div>

                        </form>
                        <p></p>
                        <div
                      className="d-flex justify-content-between p-2 mb-2"
                      style={{ backgroundColor: "#e1f5fe" }}
                    >
                      <MDBTypography tag="h5" className="fw-bold mb-0">
                        Order Total:
                      </MDBTypography>
                      <MDBTypography tag="h5" className="fw-bold mb-0">
                        ${orderTotal}
                      </MDBTypography>
                    </div>
                    <hr
                      className="mb-4"
                      style={{
                        height: "2px",
                        backgroundColor: "#1266f1",
                        opacity: 1,
                      }}
                    />
                    <p id='test'></p>
        <form
          className="flex-row justify-center justify-space-between-md align-center"
        >   
          <div>Country/Region:</div>
          <input className="form-input"/>
          
          <div>Address:</div>
          <input className="form-input"
            placeholder="street address or P.O. Box..."/>
            <div></div>
          <input className="form-input"
            placeholder="Apt, Suitte, unit, building, floor, etc."/>
          
                <div class="container">
  <div className="row">
    <div className="col-md">
    <div>City:</div>
          <input className="form-input"/>
    </div>
    <div className="col-md">
    <div>State:</div>
          <input className="form-input"/>
    </div>
    <div className="col-md">
    <div>ZIP Code:</div>
          <input className="form-input"/>
    </div>
  </div>
</div>


        </form>
        <MDBBtn color = "warning" onClick={submitCheckout}>Checkout</MDBBtn>

                    </MDBTypography>
                  </MDBCol>

                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default Cart;