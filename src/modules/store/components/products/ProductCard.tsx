import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { ProductVariation } from '../../../../model';
import { ProductData } from './ProductList';
import ProductDetails from './ProductDetails';

interface Props {
    product: ProductData;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    const [show, setShow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductData>();
    const minPrice = Math.min(...product?.productVariations.map((productVariation: ProductVariation) => productVariation.price));

    const handleShowProductDetails = () => {
        setSelectedProduct(product);
        setShow(true);
    };

    const handleCloseProductDetails = () => {
        setShow(false);
        setSelectedProduct(undefined);
    };

    return (
        <>
            <Card className='align-items-center m-2'>
                <Card.Img variant="top" src={product.image} style={{ height: '10rem', width: 'auto' }} />
                <Card.Body>
                    <Card.Text>
                        <h6 className='text-truncate product-title'>{product.name}</h6>
                        <span className='text-primary h4' >
                            ₽{minPrice}
                        </span>
                    </Card.Text>
                    <Button onClick={handleShowProductDetails}>Добавить в Корзину</Button>
                </Card.Body>
            </Card>
            {selectedProduct && (
                <ProductDetails
                    product={selectedProduct}
                    show={show}
                    handleClose={handleCloseProductDetails}
                />
            )}
        </>
    );
};

export default ProductCard;
