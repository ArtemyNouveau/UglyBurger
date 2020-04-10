import * as actionTypes from './actionTypes'
import axiosInstance from "../../axios-orders";

export const purchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        orderID: id,
        orderData: orderData
    }
};

export const purchaseFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_FAILED,
        error: error
    }
};

export const purchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_START
    }
};

export const purchase = (order) => {
    return dispatch => {
        axiosInstance.post('/orders.json', order)
            .then((response) => {
                dispatch(purchaseSuccess(response.data.name, order))
            })
            .catch((err) => {
                purchaseFailed(err);
            });
    }
};


export const fetchSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
};

export const fetchStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

export const fetchOrders = () => {
    return dispatch => {
        axiosInstance.get("/orders.json")
            .then((response) => {
                const orders = [];
                for (let key in response.data)
                    orders.push({
                        id: key,
                        ...response.data[key]
                    });
                dispatch(fetchSuccess(orders))
            })
            .catch((err) => {
                fetchFailed(err)
            })
    }
};
