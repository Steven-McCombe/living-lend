import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBBtn,
    MDBRipple,
  } from "mdb-react-ui-kit";
import Cart from '../components/CartSide';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
    const [state, dispatch] = useStoreContext();
    const { id } = useParams();

    const [currentProduct, setCurrentProduct] = useState({});

    const { loading, data } = useQuery(QUERY_PRODUCTS);

    const { products, cart } = state;

    useEffect(() => {
        // already in global store
        if (products.length) {
            setCurrentProduct(products.find((product) => product._id === id));
        }
        // retrieved from server
        else if (data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products,
            });

            data.products.forEach((product) => {
                idbPromise('products', 'put', product);
            });
        }
        // get cache from idb
        else if (!loading) {
            idbPromise('products', 'get').then((indexedProducts) => {
                dispatch({
                    type: UPDATE_PRODUCTS,
                    products: indexedProducts,
                });
            });
        }
    }, [products, data, loading, dispatch, id]);

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === id);
        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });
            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                product: { ...currentProduct, purchaseQuantity: 1 },
            });
            idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
        }
    };

    const removeFromCart = () => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: currentProduct._id,
        });

        idbPromise('cart', 'delete', { ...currentProduct });
    };

    return (
        <>
            {currentProduct && cart && (
                <MDBContainer fluid className="my-5">
                    <MDBRow className="justify-content-center">
                        <MDBCol md="8" lg="6" xl="4">
                            <MDBCard style={{ borderRadius: "15px" }}>
                                <MDBRipple
                                    rippleColor="light"
                                    rippleTag="div"
                                    className="bg-image rounded hover-overlay"
                                >
                                    <MDBCardImage
                                        src={currentProduct.image}
                                        fluid
                                        className="w-100"
                                        style={{
                                            borderTopLeftRadius: "15px",
                                            borderTopRightRadius: "15px",
                                        }}
                                    />
                                    <a href="#!">
                                        <div className="mask"></div>
                                    </a>
                                </MDBRipple>
                                <MDBCardBody className="pb-0">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <h5 className="text-dark">{currentProduct.name}</h5>
                                            <p className="small text-muted"></p>
                                        </div>
                                        <div>
                                            <div className="d-flex flex-row justify-content-end mt-1 mb-4 text-danger">
                                                <MDBIcon fas icon="star" />
                                                <MDBIcon fas icon="star" />
                                                <MDBIcon fas icon="star" />
                                                <MDBIcon fas icon="star" />
                                                <MDBIcon fas icon="star" />
                                            </div>
                                        </div>
                                    </div>
                                </MDBCardBody>
                                <hr className="my-0" />
                                <MDBCardBody className="pb-0">
                                    <div className="d-flex justify-content-between">
                                        <h5 className="warning">${currentProduct.price}.00</h5>
                                        <p className="text-dark">Per Month</p>
                                    </div>
                                    <p className="small text-muted">{currentProduct.description}</p>
                                </MDBCardBody>
                                <hr className="my-0" />
                                <MDBCardBody className="pb-0">
                                        <a href="/products" className="text-dark fw-bold">
                                            Return to Products
                                        </a>
                                    <div className="d-flex justify-content-end align-items-center pb-2 mb-4">
                                        <MDBBtn color="success" onClick={addToCart}><i className="fa-solid fa-cart-plus"></i></MDBBtn>
                                        <MDBBtn
                                        color='danger'
                                        disabled={!cart.find((p) => p._id === currentProduct._id)}
                                        onClick={removeFromCart}
                                        >
                                        <i className="fa-solid fa-trash"></i>
                                        </MDBBtn>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            )}
            {loading && <img src={spinner} alt="loading" />}
            <Cart/>
        </>
    );
} 
export default Detail;
