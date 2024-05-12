import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const OrderForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        time: '',
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
        localStorage.setItem("order", JSON.stringify(formData));
    };

    return (
        <div>
            <h2>Order Form</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Имя</Form.Label>
                <Form.Control type="text" required
                    placeholder="Enter name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange} />

                <Form.Label>Адрес</Form.Label>
                <Form.Control type="text" placeholder="Enter address" required
                    name="address"
                    value={formData.address}
                    onChange={handleChange} />

                <Form.Label>Телефон</Form.Label>
                <Form.Control type="tel" placeholder="Enter phone" required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange} />

                <Form.Label>Время</Form.Label>
                <Form.Control type="time" placeholder="Enter time" required
                    name="time"
                    value={formData.time}
                    onChange={handleChange} />

                <Button variant="primary" type="submit">
                    Оформить заказ
                </Button>
            </Form>
        </div>
    );
};

export default OrderForm;
