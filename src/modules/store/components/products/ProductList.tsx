import React, { useEffect, useState } from 'react';
import { fetchProductImagesByProductId, fetchProductsByCategoryId } from '../../utils/api';
import { Card, Col, Row } from 'react-bootstrap';
import ProductCard from './ProductCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Image, Product } from '../../../../model';

interface Props {
    categoryId: number;
}

export interface ProductWithImage {
    id: number;
    category_id: number;
    description: string;
    name: string;
    image: string;
}

const ProductList: React.FC<Props> = ({ categoryId }) => {
    const [products, setProducts] = useState<ProductWithImage[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await fetchProductsByCategoryId(categoryId, 0);
                productsData.length > 0 ? setHasMore(true) : setHasMore(false);
                const productsWithImages = await Promise.all(productsData.map(async (product: Product) => {
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


    const fetchMoreData = async () => {
        try {
            const productsData = await fetchProductsByCategoryId(categoryId, offset);
            productsData.length > 0 ? setHasMore(true) : setHasMore(false);
            const productsWithImages = await Promise.all(productsData.map(async (product: Product) => {
                const imagesData = await fetchProductImagesByProductId(product.id);
                const imageUrl = imagesData.map((image: Image) => image.image_url)[0];
                return { ...product, image: imageUrl };
            }));

            setProducts(prevProducts => [...prevProducts, ...productsWithImages]);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAddToCart = (product: any) => {

    };

    const onScroll = () => {
        setOffset(prevOffset => prevOffset + 10);
        fetchMoreData()
    };

    return (
        <div>
            <InfiniteScroll
                dataLength={products.length}
                next={onScroll}
                hasMore={hasMore}
                loader={<p>Loading...</p>}
                endMessage={<p>No more data to load.</p>}
                scrollThreshold={0.9}
            >
                <Row>
                    {products.map((product) => (
                        <Col md="4" key={product.id}>
                            <ProductCard product={product} onAddToCart={() => handleAddToCart(product)} />
                        </Col>
                    ))}
                </Row>
            </InfiniteScroll>

        </div >
    );
};

export default ProductList;
