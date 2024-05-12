import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { ProductVariation, ProductVariationProperties, ProductVariationPropertyListValues, ProductVariationPropertyValues } from '../../../../model';
import { fetchProductVariationPropertiesById, fetchProductVariationPropertyListValues, fetchProductVariationPropertyValuesById } from '../../utils/api';

interface Props {
    productVariations: ProductVariation[];
    onPropertyChange: (property: string) => void;
}

interface Property {
    name: string, values: any[]
}

const ProductProperties: React.FC<Props> = ({ productVariations, onPropertyChange }) => {
    const [properties, setProperties] = useState<Property[]>([]);
    let count = 0;

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onPropertyChange(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            count++;
            let propertiesData: Property[] = [];
            try {
                const productVariationPropertyData: ProductVariationPropertyValues[] = await fetchProductVariationPropertyValuesById(productVariations[0].id)
                for (const productVariationProperty of productVariationPropertyData) {
                    const productVariationPropertyId: ProductVariationProperties = await fetchProductVariationPropertiesById(productVariationProperty.product_variation_property_id)
                    if (productVariationPropertyId.type == 3) {
                        const productVariationPropertyListValue: ProductVariationPropertyListValues[] = await fetchProductVariationPropertyListValues(productVariationProperty.product_variation_property_id)
                        propertiesData.push({
                            name: productVariationPropertyId.name,
                            values: productVariationPropertyListValue.map(item => item.value)
                        })
                    }
                }
                setProperties(propertiesData);

            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        if (count == 0) { fetchData(); }
    }, [productVariations]);


    return (
        <>
            {
                properties.length == 0 ? (
                    <p>Загрузка свойств товара...</p>
                ) : (
                    properties.map((property) => (
                        <span key={property.name}>
                            <Form.Select onChange={handleSelectChange} required>
                                <option className='text-muted'>Выбрать {property.name}</option>
                                {property.values.map((value) => (
                                    <option value={value}>{value}</option>
                                ))}
                            </Form.Select>
                        </span>
                    ))
                )
            }
        </>
    );
};

export default ProductProperties;
