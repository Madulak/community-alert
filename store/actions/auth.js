// import firebase from 'firebase';
import { firebase } from '../../firebase';
export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP';
export const LOADING = 'LOADING';
export const ERROR = 'ERROR';

export const signup = (email, password) => {
    return async dispatch => {
        
        try {
            const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
            console.log(user.user.email);
            dispatch({type: LOADING, loading:true})
            const isNewUser = user.additionalUserInfo.isNewUser;
            if (isNewUser) {
                await firebase.firestore().collection('users').add({
                    email: email,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
            }
            dispatch({type: LOADING, loading: false})
        } catch (error) {
            console.log(error)
            dispatch({type: LOADING, loading: false})
            throw error;
        }

        dispatch({type: SIGNUP,  })
    }
}

export const logout = () => {
    return dispatch => {

        dispatch({type: LOGOUT})
    }
}

export const login = (email, password) => {
    return async dispatch => {
        let usermail;
        dispatch({type: ERROR, error: null})
        try {
            dispatch({type: LOADING, loading: true})
            const user = await firebase.auth().signInWithEmailAndPassword(email, password)
            console.log(user);
            usermail = user.user.email;
            dispatch({type: LOADING, loading: false})
        } catch (error) {
            console.log(error.message);
            dispatch({type: ERROR, error: error.message})
            dispatch({type: LOADING, loading: false})
            throw error;
        }

        dispatch({type: LOGIN, email: usermail})
    }
}