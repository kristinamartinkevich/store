import React from 'react';
import { Card } from 'react-bootstrap';

interface Product {
    id: number;
    category_id: number;
    description: string;
    name: string;
}

interface Props {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAddToCart }) => {
    const handleAddToCart = () => {
        onAddToCart(product);
    };

    return (
        <div>
            <Card.Img variant="top" src={product.image} style={{ width: 'auto', height: '200px' }} />
            <Card.Body>
                <Card.Text>
                    {product.name} - ${product.price}
                </Card.Text>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </Card.Body>
        </div>
    );
};

export default ProductCard;
