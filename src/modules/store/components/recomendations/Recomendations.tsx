import { useState } from 'react';
import CategoryList from '../category/CategoryList';
import ProductList from '../products/ProductList';

function Recomendations() {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const handleCategorySelect = (categoryId: number) => {
        setSelectedCategoryId(categoryId);
    };

    return (
        <>
            <CategoryList onCategorySelect={handleCategorySelect} />
            {selectedCategoryId && <ProductList categoryId={selectedCategoryId} />}
        </>
    );
}

export default Recomendations;
