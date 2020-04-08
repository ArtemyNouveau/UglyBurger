import * as actionTypes from "./actions"

const initialState = {
    ingridients: {
        bacon: 0,
        cheese: 1,
        meat: 1,
        salad: 0,
    },
    totalPrice: 4
};

const INGRIDIENT_PRICES = {
    bacon: 1,
    cheese: 0.5,
    meat: 2,
    salad: 0.1,
};

const reducer = (state = initialState, action) => {
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
        default:
            return initialState
    }
};

export default reducer
