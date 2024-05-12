import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Product, ProductVariation } from '../../../../model';
import { ProductWithImage } from './ProductList';
import { fetchProductVariationsByProductId } from '../../utils/api';
import ProductDetails from './ProductDetails';

interface Props {
    product: ProductWithImage;
    onAddToCart: (product: Product) => void;
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productVariationData = await fetchProductVariationsByProductId(product.id);
                setProductVariations(productVariationData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchData();
    }, [product]);

    return (
        <>
            <Card className='align-items-center'>
                <Card.Img variant="top" src={product.image} style={{ width: '15rem' }} />
                <Card.Body>
                    <Card.Text>
                        {product.name}
                        {productVariations.map((productVariation) => (
                            <span key={productVariation.product_id}>
                                - ₽{productVariation.price}
                            </span>
                        ))}
                    </Card.Text>
                    <button onClick={handleShowProductDetails}>Add to Cart</button>
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
