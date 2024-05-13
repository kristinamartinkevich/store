import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { clear, placeOrder } from '../../../../store';
import { ProductOrder } from '../../../../model';

type fields = 'name' | 'address' | 'phone' | 'time';

type fieldForm = { label: string, type: string, placeholder: string, name: fields };

const fields: fieldForm[] = [
    { label: 'Имя', type: 'text', placeholder: 'Enter name', name: 'name' },
    { label: 'Адрес', type: 'text', placeholder: 'Enter address', name: 'address' },
    { label: 'Телефон', type: 'tel', placeholder: 'Enter phone', name: 'phone' },
    { label: 'Время', type: 'time', placeholder: 'Enter time', name: 'time' }
];

const OrderForm = () => {
    const dispatch = useDispatch();
    const cartItems: ProductOrder[] = useSelector(state => state.products);

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        time: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        dispatch(placeOrder({
            name: formData.name,
            address: formData.address,
            phone: formData.phone,
            time: formData.time,
        }))
        setFormData({
            name: '',
            address: '',
            phone: '',
            time: ''
        })
        dispatch(clear());
    };

    return (
        <Form onSubmit={handleSubmit}>
            {fields.map((field, index) => (
                <Form.Group key={index}>
                    <Form.Label>{field.label}</Form.Label>
                    <Form.Control
                        type={field.type}
                        placeholder={field.placeholder}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
            ))}

            <Button variant="primary" type="submit" className='my-2' disabled={!cartItems.length}>
                Оформить заказ
            </Button>
        </Form>
    );
};

export default OrderForm;
