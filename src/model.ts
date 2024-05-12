export interface Category {
    id: number;
    name: string;
    parent_id: number;
};

export interface Product {
    id: number;
    category_id: number;
    description: string;
    name: string;
}

export interface Image {
    id: number;
    image_name: string;
    image_url: string;
    product_id: number;
}

export interface ProductVariation {
    id: number;
    product_id: number;
    price: number;
    stock: number;
}

export interface ProductVariationProperties {
    name: string;
    type: 0 | 1 | 2 | 3
}

export interface ProductVariationPropertyListValues {
    product_variation_property_id: number;
    title: string;
    value: number;
}

export interface ProductVariationPropertyValues {
    product_variation_id: number;
    product_variation_property_id: number;
    value_string: string;
    value_int: number;
    value_float: number;
    product_variation_property_list_value_id: number;
}

export interface ProductOrder {
    product: string;
    quantity: number;
    price: number;
    property: string;

    name: string;
    address: string;
    phone: string;
    time: string;
}