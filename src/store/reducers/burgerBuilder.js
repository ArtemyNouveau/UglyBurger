import * as actionTypes from "../actions/actionTypes"
import {updateObject} from "../utility";

const initialState = {
    ingridients: null,
    totalPrice: 0,
    error: false
};

const INGRIDIENT_PRICES = {
    bacon: 1,
    cheese: 0.5,
    meat: 2,
    salad: 0.1,
};

const burgerBuilder = (state = initialState, action) => {
    let update = {};
    switch (action.type) {
        case actionTypes.ADD_INGRIDIENT:
            update = {
                ingridients: {
                    ...state.ingridients,
                    [action.ingridient]: state.ingridients[action.ingridient] + 1
                },
                totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingridient]
            };
            return updateObject(state, update);
        case actionTypes.REMOVE_INGRIDIENT:
            update = {
                ingridients: {
                    ...state.ingridients,
                    [action.ingridient]: state.ingridients[action.ingridient] - 1,
                },
                totalPrice: state.totalPrice - INGRIDIENT_PRICES[action.ingridient]
            };
            return updateObject(state, update);
        case actionTypes.SET_INGRIDIENT:
            update = {
                ingridients: action.ingridients,
                totalPrice: 4,
                error: false
            };
            return updateObject(state, update);
        case actionTypes.FETCH_INGRIDIENTS_FAILED:
            update = {
                error: true
            };
            return updateObject(state, update);
        default:
            return initialState
    }
};

export default burgerBuilder
