import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { ProductVariation, ProductVariationProperties, ProductVariationPropertyListValues, ProductVariationPropertyValues } from '../../../../model';
import { fetchProductVariationPropertiesById, fetchProductVariationPropertyListValues, fetchProductVariationPropertyValuesById } from '../../utils/api';

interface Props {
    productVariations: ProductVariation[];
}

interface Property {
    name: string, value: any, values: any[]
}

const ProductProperties: React.FC<Props> = ({ productVariations }) => {
    const [properties, setProperties] = useState<Property[]>([]);
    let count = 0;

    useEffect(() => {
        const fetchData = async () => {
            count++;
            let propertiesData: Property[] = [];
            try {
                const productVariationPropertyData: ProductVariationPropertyValues[] = await fetchProductVariationPropertyValuesById(productVariations[0].id)
                for (const productVariationProperty of productVariationPropertyData) {
                    const productVariationPropertyId: ProductVariationProperties = await fetchProductVariationPropertiesById(productVariationProperty.product_variation_property_id)
                    if (productVariationPropertyId.type == 0) {
                        propertiesData.push({
                            name: productVariationPropertyId.name + ": ",
                            value: productVariationProperty.value_string,
                            values: []
                        })
                    } else if (productVariationPropertyId.type == 1) {
                        propertiesData.push({
                            name: productVariationPropertyId.name + ": ",
                            value: productVariationProperty.value_int,
                            values: []
                        })
                    } else if (productVariationPropertyId.type == 2) {
                        propertiesData.push({
                            name: productVariationPropertyId.name + ": ",
                            value: productVariationProperty.value_float,
                            values: []
                        })
                    }
                    else if (productVariationPropertyId.type == 3) {
                        const productVariationPropertyListValue: ProductVariationPropertyListValues[] = await fetchProductVariationPropertyListValues(productVariationProperty.product_variation_property_id)
                        propertiesData.push({
                            name: productVariationPropertyId.name + ": ",
                            value: '',
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
                        <div key={property.name}>
                            <span className='text-muted'>{property.name}</span>
                            <h6>{property.value}</h6>
                            {property.values.length > 0 &&
                                <Form.Select>
                                    {property.values.map((value) => (
                                        <option>{value}</option>
                                    ))}
                                </Form.Select>
                            }
                        </div>
                    ))
                )
            }
        </>
    );
};

export default ProductProperties;
