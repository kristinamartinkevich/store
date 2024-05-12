import React, { useEffect, useState } from 'react';
import { fetchProductImagesByProductId, fetchProductsByCategoryId } from '../../utils/api';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import ProductCard from './ProductCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Image, Product } from '../../../../model';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';

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
    const [offset, setOffset] = useState<number>(5);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        fetchData();
    }, [categoryId, offset, searchTerm]);

    const fetchData = async () => {
        try {
            const productsData = await fetchProductsByCategoryId(categoryId, offset);
            const productsWithImages = await Promise.all(productsData.map(async (product: Product) => {
                const imagesData = await fetchProductImagesByProductId(product.id);
                const imageUrl = imagesData.map((image: Image) => image.image_url)[0];
                return { ...product, image: imageUrl };
            }));
            setProducts(productsWithImages);
            setHasMore(productsData.length > products.length);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const onScroll = () => {
        setOffset(prevOffset => prevOffset + 10);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filterProductsByName = (products: ProductWithImage[], searchTerm: string) => {
        return products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const filteredProducts = filterProductsByName(products, searchTerm);

    return (
        <>
            <Row className='justify-content-end mb-4'>
                <Col md={4}>
                    <Form.Group>
                        <InputGroup>
                            <Form.Control
                                placeholder="Поиск бренда, товара, категории..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <InputGroup.Text><Icon path={mdiMagnify} size={1} /></InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>
            <InfiniteScroll
                dataLength={filteredProducts.length}
                next={onScroll}
                hasMore={hasMore}
                loader={<p>Загрузка...</p>}
                scrollThreshold={0.9}
            >
                <Row>
                    {filteredProducts.map((product) => (
                        <Col md="3" key={product.id} >
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            </InfiniteScroll>
        </>
    );
};

export default ProductList;
