const BASE_URL = 'https://test2.sionic.ru/api/';

export const fetchCategories = async () => {
    try {
        const response = await fetch(`${BASE_URL}Categories?sort=["name","ASC"]&range=[0,24]`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

export const fetchCategoryById = async (categoryId: number) => {
    try {
        const response = await fetch(`${BASE_URL}Categories/${categoryId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch category');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching category with ID ${categoryId}:`, error);
        return null;
    }
};

export const fetchProductsByCategoryId = async (categoryId: number) => {
    try {
        const response = await fetch(`${BASE_URL}Products?sort=["name","ASC"]&range=[0,24]&filter={"category_id":${categoryId}}`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching products for category with ID ${categoryId}:`, error);
        return [];
    }
};

export const fetchProductById = async (productId: number) => {
    try {
        const response = await fetch(`${BASE_URL}Products/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
        return null;
    }
};

export const fetchProductImagesByProductId = async (productId: number) => {
    try {
        const response = await fetch(`${BASE_URL}ProductImages?sort=["image_name","ASC"]&range=[0,24]&filter={"product_id":${productId}}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product images');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching product images for product with ID ${productId}:`, error);
        return [];
    }
};

export const fetchProductVariationsByProductId = async (productId: number) => {
    try {
        const response = await fetch(`${BASE_URL}ProductVariations?filter={"product_id":${productId}}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product variations');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching product variations for product with ID ${productId}:`, error);
        return [];
    }
};

export const fetchProductVariationProperties = async () => {
    try {
        const response = await fetch(`${BASE_URL}ProductVariationProperties`);
        if (!response.ok) {
            throw new Error('Failed to fetch product variation properties');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product variation properties:', error);
        return [];
    }
};

export const fetchProductVariationPropertyListValues = async (propertyId: number) => {
    try {
        const response = await fetch(`${BASE_URL}ProductVariationPropertyListValues?filter={"product_variation_property_id":${propertyId}}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product variation property list values');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching product variation property list values for property with ID ${propertyId}:`, error);
        return [];
    }
};

export const fetchProductVariationPropertyValues = async (variationId: number) => {
    try {
        const response = await fetch(`${BASE_URL}ProductVariationPropertyValues?filter={"product_variation_id":${variationId}}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product variation property values');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching product variation property values for variation with ID ${variationId}:`, error);
        return [];
    }
};
