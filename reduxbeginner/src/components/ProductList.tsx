import React from 'react'
import { useSelector } from 'react-redux'
import { getProductsSelector } from './products.slice'


const ProductList:React.FC = () => {

  const products = useSelector(getProductsSelector)

  return (
    <div>
        <label>Games List</label>
        {products.map(product =>
            <div key={product.id}>
                <span>{`${product.title}: ${product.price}`}</span>
            </div>
        )}
    </div>
  )
}

export default ProductList