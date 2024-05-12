import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { ProductVariation } from '../../../../model';
import { ProductWithImage } from './ProductList';
import { fetchProductVariationsByProductId } from '../../utils/api';
import ProductDetails from './ProductDetails';

interface Props {
    product: ProductWithImage;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    const [productVariations, setProductVariations] = useState<ProductVariation[]>([]);
    const [show, setShow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductWithImage>();

    const handleShowProductDetails = () => {
        setSelectedProduct(product);
        setShow(true);
    };

    const handleCloseProductDetails = () => {
        setShow(false);
        setSelectedProduct(undefined);
    };
    let minPrice = 0;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productVariationData = await fetchProductVariationsByProductId(product.id);
                setProductVariations(productVariationData);
                minPrice = Math.min(...productVariations.map(productVariation => productVariation.price));
            } catch (error) {
                console.error('Error fetching product variation:', error);
            }
        };
        fetchData();
    }, [product]);

    return (
        <>
            <Card className='align-items-center m-2'>
                <Card.Img variant="top" src={product.image} style={{ height: '10rem', width: 'auto' }} />
                <Card.Body>
                    <Card.Text>
                        <h6 className='text-truncate product-title'>{product.name}</h6>
                        {productVariations.map((productVariation) => (
                            <h4 className='text-primary' key={productVariation.product_id}>
                                ₽{productVariation.price}
                            </h4>
                        ))} <Button onClick={handleShowProductDetails}>Добавить в Корзину</Button>
                    </Card.Text>
                </Card.Body>
            </Card>
            {selectedProduct && (
                <ProductDetails
                    product={selectedProduct}
                    productVariations={productVariations}
                    show={show}
                    handleClose={handleCloseProductDetails}
                />
            )}
        </>
    );
};

export default ProductCard;
