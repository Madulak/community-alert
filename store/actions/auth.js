
export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN';

export const logout = () => {
    return dispatch => {

        dispatch({type: LOGOUT})
    }
}

export const login = () => {
    return dispatch => {

        dispatch({type: LOGIN})
    }
}