import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { fetchProductImagesByProductId, fetchProductsByCategoryId } from '../../utils/api';
import { addToCart } from '../cart/CartSlice';
import { Card, Col, Row } from 'react-bootstrap';
import ProductCard from './ProductCard';

interface Props {
    categoryId: number;
}

interface Image {
    id: number;
    image_name: string;
    image_url: string;
    product_id: number;
}

const ProductList: React.FC<Props> = ({ categoryId }) => {
    const [products, setProducts] = useState<any[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await fetchProductsByCategoryId(categoryId);
                setProducts(productsData);

                const productsWithImages = await Promise.all(productsData.map(async (product) => {
                    const imagesData = await fetchProductImagesByProductId(product.id);
                    const imageUrl = imagesData.map((image: Image) => image.image_url)[0];
                    return { ...product, image: imageUrl };
                }));

                setProducts(productsWithImages);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, [categoryId]);

    const handleAddToCart = (product: any) => {
        dispatch(addToCart(product));
    };

    return (
        <div>
            <Row>
                {products.map((product) => (
                    <Col md="4" key={product.id}>
                        <Card>
                            <ProductCard product={product} onAddToCart={() => handleAddToCart(product)} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductList;
