import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Product, ProductVariation } from '../../../../model';
import { ProductWithImage } from './ProductList';
import { fetchProductVariationsByProductId } from '../../utils/api';
import ProductDetails from './ProductDetails';
import Properties from './ProductProperties';

interface Props {
    product: ProductWithImage;
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    const [productVariations, setProductVariations] = useState<ProductVariation[]>([]);

    let minPrice = 0;

    const [quantity, setQuantity] = useState<number>(0);

    const incrementQuantity = () => {
        if (quantity < productVariations[0]?.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productVariationData = await fetchProductVariationsByProductId(product.id);
                setProductVariations(productVariationData);
                minPrice = Math.min(...productVariations.map(productVariation => productVariation.price));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchData();
    }, [product]);

    return (
        <>
            <Card className='align-items-center'>
                <Card.Img variant="top" src={product.image} style={{ height: '10rem', width: 'auto' }} />
                <Card.Body>
                    <Card.Text>
                        <h2>{product.name}</h2>
                        {productVariations.map((productVariation) => (
                            <h4 className='text-primary' key={productVariation.product_id}>
                                ₽{productVariation.price}
                            </h4>
                        ))}
                        {productVariations.length > 0 &&
                            <Properties productVariations={productVariations} />
                        }
                    </Card.Text>
                    <Button variant="primary" onClick={decrementQuantity}>-</Button>
                    {quantity} (Макс. {productVariations[0]?.stock})
                    <Button variant="primary" onClick={incrementQuantity}>+</Button>
                    <Button>Добавить в Корзину</Button>
                </Card.Body>
            </Card>
        </>
    );
};

export default ProductCard;
