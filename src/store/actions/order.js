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
