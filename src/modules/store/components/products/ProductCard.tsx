import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { ProductVariation } from '../../../../model';
import { ProductData } from './ProductList';
import ProductDetails from './ProductDetails';

interface Props {
    product: ProductData;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    const [showProductDetails, setShowProductDetails] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductData>();
    const minPrice = Math.min(...product?.productVariations.map((productVariation: ProductVariation) => productVariation.price));

    const handleShowProductDetails = () => {
        setSelectedProduct(product);
        setShowProductDetails(true);
    };

    const handleCloseProductDetails = () => {
        setShowProductDetails(false);
        setSelectedProduct(undefined);
    };

    return (
        <>
            <Card className='align-items-center m-2'>
                <Card.Img variant="top" src={product.image} style={{ height: '10rem', width: 'auto' }} />
                <Card.Body>
                    <Card.Text>
                        <div className='text-truncate product-title h6'>{product.name}</div>
                        <span className='text-primary h4' >
                            ₽{minPrice}
                        </span>
                    </Card.Text>
                    <Button onClick={handleShowProductDetails}>Выбрать</Button>
                </Card.Body>
            </Card>
            {selectedProduct && (
                <ProductDetails
                    product={selectedProduct}
                    show={showProductDetails}
                    handleClose={handleCloseProductDetails}
                />
            )}
        </>
    );
};

export default ProductCard;
