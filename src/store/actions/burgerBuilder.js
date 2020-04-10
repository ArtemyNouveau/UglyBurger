import * as actionTypes from './actionTypes'
import axiosInstance from "../../axios-orders";

export const addIngridient = (ingridient) => ({
    type: actionTypes.ADD_INGRIDIENT,
    ingridient: ingridient,
});

export const removeIngridient = (ingridient) => ({
    type: actionTypes.REMOVE_INGRIDIENT,
    ingridient: ingridient,
});

export const setIngridients = (ingridients) => {
    return {
        type: actionTypes.SET_INGRIDIENT,
        ingridients: ingridients
    }
};

export const fetchIngridientsFailed = (err) => {
    return {
        type: actionTypes.FETCH_INGRIDIENTS_FAILED,
        error: err
    }
};

export const initIngridient = () => {
    return (dispatch) => {
        axiosInstance.get('/Ingredients.json')
            .then((response) => {
                dispatch(setIngridients(response.data))
            })
            .catch((err) => {
                dispatch(fetchIngridientsFailed(err))
            })
    }
};
