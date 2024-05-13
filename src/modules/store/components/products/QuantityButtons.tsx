import React from 'react';
import { Button, Col } from 'react-bootstrap';

interface Props {
    quantity: number;
    stock: number;
    onQuantityChange: (newQuantity: number) => void;
}

const QuantityButtons: React.FC<Props> = ({ quantity, onQuantityChange, stock }) => {
    const incrementQuantity = () => {
        if (quantity < stock) {
            onQuantityChange(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 0) {
            onQuantityChange(quantity - 1);
        }
    };

    return (
        <Col>
            <Button variant="danger" onClick={decrementQuantity}>-</Button>
            <span className='h6 mx-2'>{quantity}</span>
            <Button variant="danger" onClick={incrementQuantity}>+</Button>
        </Col>
    );
};

export default QuantityButtons;
