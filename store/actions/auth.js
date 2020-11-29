// import firebase from 'firebase';
import { firebase } from '../../firebase';
export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP';

export const signup = (email, password) => {
    return async dispatch => {
        try {
            // const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
            // console.log(user.additionalUserInfo.isNewUser);
            // const isNewUser = user.additionalUserInfo.isNewUser;
            // if (isNewUser) {
                await firebase.firestore().collection('users').add({
                    email: 'email timestamp',
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
            // }
        } catch (error) {
            console.log(error)
            throw error;
        }

        dispatch({type: SIGNUP})
    }
}

export const logout = () => {
    return dispatch => {

        dispatch({type: LOGOUT})
    }
}

export const login = (email, password) => {
    return async dispatch => {

        try {
            const user = await firebase.auth().signInWithEmailAndPassword(email, password)
            console.log(user);
        } catch (error) {
            console.log(error);
            throw error;
        }

        dispatch({type: LOGIN})
    }
}