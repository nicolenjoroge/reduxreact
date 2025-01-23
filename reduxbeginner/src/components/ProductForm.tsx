import React, { useState } from 'react'
import { Product } from './products.slice'


const ProductForm:React.FC = () => {

  const [product, setProduct] = useState<Product>({
    id: '',
    title: '',
    price: 0
  })

  const handleChange = ({target: {name, value}}: React.ChangeEvent<HTMLInputElement>) => {
    setProduct(prev => {
      (prev as any)[name] = value
      const newValue = {...prev}
      return newValue
    })
  }

  
  return (
    <>
        <h2>Add Game To Store</h2>
        <form>
            <input type='text' placeholder='game title' name='title' value={product.title} onChange={handleChange}/>
            <input type='text' placeholder='price' name='price' value={product.price} onChange={handleChange}/>
            <input type='text' placeholder='id' name='id' value={product.id} onChange={handleChange}/>
            <button type='submit'>Add Game</button>
        </form>
    </>
  )
}

export default ProductForm