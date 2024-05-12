import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';

const Cart: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);

    return (
        <div>
            <h2>Cart</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.product.id}>
                        {item.product.name} - Quantity: {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;
