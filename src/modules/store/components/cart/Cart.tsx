import { useSelector } from 'react-redux';
import OrderForm from './OrderForm';
import { Col, Row } from 'react-bootstrap';

const Cart = () => {
    const cartItems = useSelector(state => state.products)
    console.log(cartItems)

    return (
        <Row className='justify-content-center my-2'>
            <Col>
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
            </Col>
            <Col>
                <OrderForm />
            </Col>
        </Row>
    );
};

export default Cart;
