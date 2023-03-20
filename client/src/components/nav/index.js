import { useState } from 'react'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBIcon,
  MDBCollapse,
  MDBBadge
} from 'mdb-react-ui-kit';
//importing auth. Display a different nav bar if user is logged in.
import Auth from "../../utils/auth";
import Cart from '../CartSide';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART, UPDATE_CART_COUNT } from '../../utils/actions';

//Logic to log the user out when clicked on the nav bar
const handleLogout = () => {
  Auth.logout();
};

export default function Nav() {
  
  const [state, dispatch] = useStoreContext();
  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateItems() { 
    let totalItems = 0;
    state.cart.forEach(item => {
      totalItems += item.purchaseQuantity;
    });
    return totalItems;
  }
    const [showNavSecond, setShowNavSecond] = useState(false);
  // function to show nav based on user being logged in or not
    function showNavigation() {
      if (Auth.loggedIn()) {
        return (
          <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
              <MDBNavbarBrand href='/'>Living Lend</MDBNavbarBrand>
              <MDBNavbarToggler
                aria-expanded='false'
                aria-label='Toggle navigation'
                onClick={() => setShowNavSecond(!showNavSecond)}
              >
                <MDBIcon icon='bars' fas />
              </MDBNavbarToggler>
              <MDBCollapse navbar show={showNavSecond}>
                <MDBNavbarNav>
                  <MDBNavbarLink active aria-current='page' href='/'>
                    Home
                  </MDBNavbarLink>
                  <MDBNavbarLink href='/products'>Products</MDBNavbarLink>
                  <MDBNavbarLink href='/orderhistory'>Order History</MDBNavbarLink>
                  <MDBNavbarLink href='/login' onClick={handleLogout}>Logout</MDBNavbarLink>
                  <MDBNavbarItem >
                    <MDBNavbarLink onClick={toggleCart}>
                      <MDBBadge pill color='danger'>{calculateItems()}</MDBBadge>
                      <span >
                        <MDBIcon  fas icon='shopping-cart'></MDBIcon>
                      </span>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
        );
      } else {
        return (
          <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
              <MDBNavbarBrand href='/home'>Living Lend</MDBNavbarBrand>
              <MDBNavbarToggler
                aria-expanded='false'
                aria-label='Toggle navigation'
                onClick={() => setShowNavSecond(!showNavSecond)}
              >
                <MDBIcon icon='bars' fas />
              </MDBNavbarToggler>
              <MDBCollapse navbar show={showNavSecond}>
                <MDBNavbarNav>
                  <MDBNavbarLink href='/'>Home</MDBNavbarLink>
                  <MDBNavbarLink href='/products'>Products</MDBNavbarLink>
                  <MDBNavbarLink href='/login'>Login/Signup</MDBNavbarLink>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
        );
      }
    }
  
    return (
      <>
        {showNavigation()}
      </>
    );
  }
  