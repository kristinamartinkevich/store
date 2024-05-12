import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ProductVariation, ProductVariationPropertyValues } from '../../../../model';
import { ProductWithImage } from './ProductList';
import { fetchProductVariationPropertiesById, fetchProductVariationPropertyListValues, fetchProductVariationPropertyValuesById } from '../../utils/api';

interface Props {
    product: ProductWithImage;
    show: boolean;
    productVariations: ProductVariation[];
    handleClose: () => void;
}

const ProductDetails: React.FC<Props> = ({ product, show, productVariations, handleClose }) => {
    const [quantity, setQuantity] = useState<number>(0);
    const [properties, setProperties] = useState<{ name: string, value: any, values: any[] }[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const productVariationPropertyData: ProductVariationPropertyValues[] = await fetchProductVariationPropertyValuesById(productVariations[0].id)
                for (const productVariationProperty of productVariationPropertyData) {
                    const productVariationPropertyId = await fetchProductVariationPropertiesById(productVariationProperty.product_variation_property_id)
                    if (productVariationPropertyId.type == 0) {
                        properties.push({
                            name: productVariationPropertyId.name + ": ",
                            value: productVariationProperty.value_string,
                            values: []
                        })
                    } else if (productVariationPropertyId.type == 1) {
                        properties.push({
                            name: productVariationPropertyId.name + ": ",
                            value: productVariationProperty.value_int,
                            values: []
                        })
                    } else if (productVariationPropertyId.type == 2) {
                        properties.push({
                            name: productVariationPropertyId.name + ": ",
                            value: productVariationProperty.value_float,
                            values: []
                        })
                    }
                    else if (productVariationPropertyId.type == 3) {
                        const productVariationPropertyListValue = await fetchProductVariationPropertyListValues(productVariationProperty.product_variation_property_id)
                        properties.push({
                            name: productVariationPropertyId.name + ": ",
                            value: '',
                            values: productVariationPropertyListValue.map(item => item.value)
                        })
                    }
                }
                setProperties(properties);

            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchData();
    }, [productVariations]);

    const incrementQuantity = () => {
        if (quantity < productVariations[0].stock) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{product.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {productVariations.map((productVariation) => (
                    <span key={productVariation.product_id}>
                        ₽{productVariation.price}
                    </span>
                ))}
                {properties.length == 0 ? (
                    <p>Загрузка...</p>
                ) : (
                    properties.map((property) => (
                        <div key={property.name}>
                            <span>{property.name}</span>
                            <span>{property.value}</span>
                            {property.values.map((value) => (
                                <Button key={value}>{value}</Button>
                            ))}
                        </div>
                    ))
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={decrementQuantity}>-</Button>
                {quantity} (max. {productVariations[0].stock})
                <Button variant="primary" onClick={incrementQuantity}>+</Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductDetails;
