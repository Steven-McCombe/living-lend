import react from 'react'
import { MDBBtn } from 'mdb-react-ui-kit'
import Cart from '../components/CartSide'
export default function NotFound() {
    return (
        <div className="container d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
            <span></span>
            <h1 className="mb-2"><i class="fa-solid fa-person-circle-question"></i> 404</h1>
            <h2 className="mb-2">UH OH! You're Lost</h2>
            <p className="mb-2" style={{width: "300px"}}>The page you are looking for does not exist.
          How you got here is a mystery. But you can click the button below
                to go back to the products page.</p>
                <MDBBtn
                    color = 'dark'
                    tag="a"
                    size="m"
                    rel="nofollow"
                    href='/products'
                  >
                    Products
        </MDBBtn>
        <Cart/>
    </div>
    )

}