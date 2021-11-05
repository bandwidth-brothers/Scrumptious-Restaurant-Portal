import { HttpAxios } from "../utils/http-common";


const getAllOrders = () => {
    return HttpAxios.orderInstance.get(`/orders`);
};

const getOrderById = (orderId) => {
    return HttpAxios.orderInstance.get(`/orders/${orderId}`);
}

const updateOrderById = (orderId, data) => {
    return HttpAxios.orderInstance.put(`/orders/${orderId}`, data);

}
const getAllOrdersByOwner = (ownerId) => {
    return HttpAxios.orderInstance.get(`orders/owners/${ownerId}/restaurants`);
}

const getAllOrdersByRestaurant = (restaurantId, ownerId) => {
    return HttpAxios.orderInstance.get(`orders/owners/${ownerId}/restaurants/${restaurantId}`);
}

export const OrderService = {
    getAllOrders,
    getOrderById,
    updateOrderById,
    getAllOrdersByOwner,
    getAllOrdersByRestaurant,
};
