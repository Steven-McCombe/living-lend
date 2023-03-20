import react from 'react'
import CategoryMenu from '../components/CategoryMenu'
import ProductList from '../components/ProductList'
import Cart from '../components/CartSide'
export default function Products() {
    return (
    <div>
            <CategoryMenu></CategoryMenu>
            <ProductList></ProductList>
            <Cart />
    </div>
    )

}