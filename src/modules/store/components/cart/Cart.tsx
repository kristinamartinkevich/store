import { useSelector } from 'react-redux';
import OrderForm from './OrderForm';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import { ProductOrder } from '../../../../model';

const Cart = () => {
    const cartItems: ProductOrder[] = useSelector(state => state.products)

    return (
        <Row className='justify-content-center my-2'>
            <Col>
                {cartItems.map((product, index) => (
                    <Card key={index}>
                        <Card.Header>{product.name}</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item> ₽{product.quantity * product.price}</ListGroup.Item>
                            <ListGroup.Item>{product.property}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                ))}
            </Col>
            <Col>
                <OrderForm />
            </Col>
        </Row >
    );
};

export default Cart;
