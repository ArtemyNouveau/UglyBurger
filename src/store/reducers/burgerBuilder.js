import * as actionTypes from "../actions/actionTypes"

const initialState = {
    ingridients: null,
    totalPrice: 4,
    error: false
};

const INGRIDIENT_PRICES = {
    bacon: 1,
    cheese: 0.5,
    meat: 2,
    salad: 0.1,
};

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGRIDIENT:
            return {
                ...state,
                ingridients: {
                    ...state.ingridients,
                    [action.ingridient]: state.ingridients[action.ingridient] + 1
                },
                totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingridient]
            };
        case actionTypes.REMOVE_INGRIDIENT:
            return {
                ...state,
                ingridients: {
                    ...state.ingridients,
                    [action.ingridient]: state.ingridients[action.ingridient] - 1,
                },
                totalPrice: state.totalPrice - INGRIDIENT_PRICES[action.ingridient]
            };
        case actionTypes.SET_INGRIDIENT:
            return {
                ...state,
                ingridients: action.ingridients,
                error: false
            };
        case actionTypes.FETCH_INGRIDIENTS_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return initialState
    }
};

export default burgerBuilder
