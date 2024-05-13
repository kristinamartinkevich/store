import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

interface Props {
    handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>, sort: 'name' | 'price') => void;
    order: 'ASC' | 'DESC';
}

const ProductFilters: React.FC<Props> = ({ handleSortChange, order }) => {
    return (
        <Row className='justify-content-end mb-4'>
            <Col md={2}>
                <Form.Group>
                    <Form.Control as="select" onChange={(e) => handleSortChange(e, 'name')} value={order}>
                        <option value={''}>Сортировка по имени</option>
                        <option value="ASC">Имя по возрастанию</option>
                        <option value="DESC">Имя по убыванию</option>
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col md={2}>
                <Form.Group>
                    <Form.Control as="select" onChange={(e) => handleSortChange(e, 'price')} >
                        <option value={''}>Сортировка по цене</option>
                        <option value="ASC">Цена по возрастанию</option>
                        <option value="DESC">Цена по убыванию</option>
                    </Form.Control>
                </Form.Group>
            </Col>
        </Row>
    );
};

export default ProductFilters;
