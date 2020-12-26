import { LOADING, LOGIN, LOGOUT, SIGNUP, ERROR } from "../actions/auth";

const initialState = {
    user: null,
    allowed: false,
    isSignup: false,
    loading: false,
    error: null
}

const Reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGOUT:
            return {
                ...state,
                user: null
            }

        case LOGIN:
            return {
                ...state,
                user: {username: action.email},
            }
        case SIGNUP:
            return {
                ...state,
                isSignup: true
            }
        case LOADING:
            return {
                ...state,
                loading: action.loading,
            }
        case ERROR:
            return {
                ...state,
                error: action.error,
            }

        default:
            return state
    }
}

export default Reducer;