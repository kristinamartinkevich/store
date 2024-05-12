import React, { useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { ProductVariation } from '../../../../model';
import { ProductWithImage } from './ProductList';
import ProductProperties from './ProductProperties';

interface Props {
    product: ProductWithImage;
    show: boolean;
    productVariations: ProductVariation[];
    handleClose: () => void;
}

const ProductDetails: React.FC<Props> = ({ product, show, productVariations, handleClose }) => {
    const [quantity, setQuantity] = useState<number>(0);
    const [selectedProperty, setSelectedProperty] = useState<string>('');

    const incrementQuantity = () => {
        if (quantity < productVariations[0].stock) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
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
                            {productVariations.length > 0 &&
                                <ProductProperties productVariations={productVariations} onPropertyChange={handlePropertyChange} />
                            }
                        </Col>
                        <Col>
                            <Button variant="danger" onClick={decrementQuantity}>-</Button>
                            <span className='h6 mx-2'>{quantity}</span>
                            <Button variant="danger" onClick={incrementQuantity}>+</Button>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button type='submit' disabled={!(selectedProperty && quantity)} onClick={handleClose}>Добавить в Корзину</Button>
                </Modal.Footer>
            </Modal>
        </Form >
    );
};

export default ProductDetails;