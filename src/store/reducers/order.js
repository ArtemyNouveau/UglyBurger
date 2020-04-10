import * as actionTypes from '../actions/actionTypes'

const initialState = {
    orders: [],
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_SUCCESS:
            const newOrder = {
                id: action.orderID,
                ...action.orderData
            };
            return {
                ...state,
                loading: false,
                orders: [...state.orders, newOrder]
            };
        case actionTypes.PURCHASE_FAILED:
            return {
                ...state,
                loading: false
            };
        case actionTypes.PURCHASE_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            };
        case actionTypes.FETCH_ORDERS_FAILED:
            return {
                ...state,
                loading: false
            };
        default:
            return state
    }
};

export default reducer
