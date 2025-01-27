import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../app/store'
import { removeItem, updateQuantity } from '../features/CartSlice'

const Cart: React.FC = () => {
    const items = useSelector((state: RootState) => state.cart.items)
    const dispatch = useDispatch()

    const handleRemoveFromCart = (id: string) => {
        dispatch(removeItem(id))
    }

    const handleQuantityChange = (id: string, quantity: number) => {
        dispatch(updateQuantity({id, quantity}))
    }

  return (
    <div>
        <h2>Shopping Cart</h2>
        {items.length === 0 ? (
            <p>Your cart is empty!</p>
        ): (
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <p>{item.name} - ${item.price}</p>
                        <input 
                            type='number'
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        />
                        <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default Cart