import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId)
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
    localStorage.removeItem("expiration")
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    const expirationDate = new Date(new Date().getTime() + expirationTime * 1000);
    localStorage.setItem('expiration', expirationDate)
    return dispatch => {
        setTimeout(() => {
            localStorage.removeItem("expiration")
            localStorage.removeItem("token")
            localStorage.removeItem("userId")
            dispatch(logout())
        }, expirationTime * 1000)
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

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const expirationDate = new Date(localStorage.getItem("expiration"));
        const currentDate = new Date();
        if (token && expirationDate > currentDate) {
            dispatch(authSuccess(token, userId))
            console.log((expirationDate-currentDate)/1000)
            dispatch(checkAuthTimeout((expirationDate.getTime()-currentDate.getTime())/1000))
        }
    }
}
