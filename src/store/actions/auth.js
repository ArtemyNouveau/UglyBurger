import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime*1000)
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

        let url = isSignUp ?
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCiaxhQccPyOXq_mqmEeFIfOnrH1h8gRcU':
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCiaxhQccPyOXq_mqmEeFIfOnrH1h8gRcU';

        axios.post(url, user)
            .then(response => {
                console.log(response.data)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })
    }
}
