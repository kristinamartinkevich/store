import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { fetchCategoriesFailure, fetchCategoriesStart, fetchCategoriesSuccess, Category } from './CategorySlice';
import { Col, ListGroup, Row } from 'react-bootstrap';

interface Props {
    onCategorySelect: (categoryId: number) => void;
}

const variants = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
];

const CategoryList: React.FC<Props> = ({ onCategorySelect }) => {
    const dispatch = useDispatch();
    const { categories, loading, error } = useSelector((state: RootState) => state.categories);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                dispatch(fetchCategoriesStart());
                const response = await fetch('https://test2.sionic.ru/api/Categories?sort=["name","ASC"]&range=[0,24]');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                dispatch(fetchCategoriesSuccess(data));
            } catch (error) {
                dispatch(fetchCategoriesFailure(error.message));
            }
        };
        fetchCategoryData();
    }, [dispatch, onCategorySelect]);

    const handleCategoryClick = (categoryId: number) => {
        setSelectedCategoryId(categoryId);
        onCategorySelect(categoryId);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Row className='justify-content-start'>
                <Col sm="3">
                    <h2>Категории товаров</h2>
                </Col>
            </Row>
            <ul>
                <ListGroup horizontal>
                    {categories.map((category: Category, index) => (
                        <ListGroup.Item
                            key={category.id}
                            variant={variants[index % variants.length]}
                            onClick={() => handleCategoryClick(category.id)}
                            active={selectedCategoryId === category.id}
                        >
                            {category.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </ul>
        </>
    );
};

export default CategoryList;
