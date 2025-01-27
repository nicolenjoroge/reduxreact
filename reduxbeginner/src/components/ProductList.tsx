import React from 'react'
import { useDispatch } from 'react-redux';
import { addItem } from '../features/CartSlice';


interface Product {
  id: string;
  name: string;
  price: number;
}

const products: Product[] = [
  {id: '1', name: 'Product 1', price: 100},
  {id: '2', name: 'Product 2', price: 200},
]

const ProductList:React.FC = () => {
  const dispatch = useDispatch()

  const handleAddToCart = (product: Product) => {
    dispatch(addItem({ ...product, quantity: 1}))
  }

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <p>{product.name} - ${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList