import React, { useEffect, useState } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { fetchCategories } from '../../utils/api';
import { Category } from '../../../../model';

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
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await fetchCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchData();
    }, []);

    const handleCategoryClick = (categoryId: number) => {
        setSelectedCategoryId(categoryId);
        onCategorySelect(categoryId);
    };

    return (
        <Container className='mb-4'>
            <ListGroup as="ul" horizontal={'md'}>
                <ListGroup.Item as="li" disabled>Категории товаров
                </ListGroup.Item>
                {categories.map((category: Category, index) => (
                    <ListGroup.Item as="li" action
                        key={category.id}
                        variant={variants[index % variants.length]}
                        onClick={() => handleCategoryClick(category.id)}
                        active={selectedCategoryId === category.id}
                    >
                        {category.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default CategoryList;
