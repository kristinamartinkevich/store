import React from 'react';

const OrderHistory: React.FC = () => {
    const order = localStorage.getItem("order");

    return (
        <div>
            {order}
        </div>
    );
};

export default OrderHistory;
