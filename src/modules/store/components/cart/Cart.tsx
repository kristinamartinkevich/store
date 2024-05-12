import React from 'react';
import { ProductOrder } from '../../../../model';

const Cart: React.FC = () => {
    const cartItems: ProductOrder[] = [];

    return (
        <div>
            <h2>Cart</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.product}>
                        {item.product}
                        <span>
                            ₽{item.quantity * item.price}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;
