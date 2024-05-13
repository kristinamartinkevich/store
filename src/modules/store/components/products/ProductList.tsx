import React, { useEffect, useState } from 'react';
import { fetchProductImagesByProductId, fetchProductVariationsByProductId, fetchProductsByCategoryId } from '../../utils/api';
import { Col, Row } from 'react-bootstrap';
import ProductCard from './ProductCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Image, Product, ProductVariation } from '../../../../model';
import ProductFilters from './ProductFilters';

interface Props {
    categoryId: number;
}

export interface ProductData {
    id: number;
    category_id: number;
    description: string;
    name: string;
    image: string;
    productVariations: ProductVariation[];
}

const sortByPrice = (products: ProductData[], order: 'ASC' | 'DESC') => {
    return products.sort((a, b) => {
        if (order === 'ASC') {
            return a.productVariations[0].price - b.productVariations[0].price;
        } else {
            return b.productVariations[0].price - a.productVariations[0].price;
        }
    });
};


const ProductList: React.FC<Props> = ({ categoryId }) => {
    const [products, setProducts] = useState<ProductData[]>([]);
    const [offset, setOffset] = useState<number>(5);
    const [hasMore, setHasMore] = useState(true);
    const [order, setOrder] = useState<'ASC' | 'DESC'>('ASC');

    useEffect(() => {
        fetchData();
    }, [categoryId, offset, order]);

    const fetchData = async () => {
        try {
            const productsData = await fetchProductsByCategoryId(order, categoryId, offset);

            const productsWithImages = await Promise.all(productsData.map(async (product: Product) => {
                const imagesData = await fetchProductImagesByProductId(product.id);
                const imageUrl = imagesData.map((image: Image) => image.image_url)[0];

                const productVariationData = await fetchProductVariationsByProductId(product.id);

                return { ...product, image: imageUrl, productVariations: productVariationData };
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

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>, sort: 'name' | 'price') => {
        if (!e.target.value) {
            setOrder('ASC');
        }
        const selectedOrder = e.target.value as 'ASC' | 'DESC';
        if (sort == 'name') {
            setOrder(selectedOrder);
        }
        else if (sort == 'price') {
            const sortedProducts = sortByPrice(products.slice(), selectedOrder);
            setProducts(sortedProducts);
        }
    }

    return (
        <>
            <ProductFilters handleSortChange={handleSortChange} order={order} />
            <InfiniteScroll
                dataLength={products.length}
                next={onScroll}
                hasMore={hasMore}
                loader={<p>Загрузка...</p>}
                scrollThreshold={0.9}
            >
                <Row>
                    {products.map((product) => (
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
