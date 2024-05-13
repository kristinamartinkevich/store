import React, { useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import ProductProperties from './ProductProperties';
import { ProductData } from './ProductList';
import { addToCart } from '../../../../actions';
import QuantityButtons from './QuantityButtons';

interface Props {
    product: ProductData;
    show: boolean;
    handleClose: () => void;
}

const ProductDetails: React.FC<Props> = ({ product, show, handleClose }) => {
    const [quantity, setQuantity] = useState<number>(0);
    const [selectedProperty, setSelectedProperty] = useState<string>('');

    const handleAddToCart = () => {
        addToCart({
            product: product.name,
            quantity: quantity,
            price: product.productVariations[0].price,
            property: selectedProperty,
            name: '',
            address: '',
            phone: '',
            time: '',
        });
        handleClose();
    };

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
    };

    const handlePropertyChange = (property: string) => {
        setSelectedProperty(property);
    };

    return (
        <Form onSubmit={(e) => { e.preventDefault(); handleClose(); }}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{product.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            {product.productVariations.length > 0 &&
                                <ProductProperties productVariations={product.productVariations} onPropertyChange={handlePropertyChange} />
                            }
                        </Col>
                        <Col>
                            <QuantityButtons
                                stock={product.productVariations[0].stock}
                                quantity={quantity}
                                onQuantityChange={handleQuantityChange}
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button type='submit' disabled={!(selectedProperty && quantity)} onClick={handleAddToCart}>Добавить в Корзину</Button>
                </Modal.Footer>
            </Modal>
        </Form >
    );
};

export default ProductDetails;