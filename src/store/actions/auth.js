import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (mail, password, isSignUp = true) => {
    return dispatch => {
        dispatch(authStart());
        const user = {
            email: mail,
            password: password,
            returnSecureToken: true
        }
        console.log(isSignUp)

        let url = isSignUp ?
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCiaxhQccPyOXq_mqmEeFIfOnrH1h8gRcU':
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCiaxhQccPyOXq_mqmEeFIfOnrH1h8gRcU';

        axios.post(url, user)
            .then(response => {
                console.log(response.data)
                dispatch(authSuccess(response.data))
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}
