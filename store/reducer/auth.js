import { LOADING, LOGIN, LOGOUT, SIGNUP } from "../actions/auth";

const initialState = {
    user: {palazo: 'palazo'},
    allowed: false,
    isSignup: false,
    loading: false
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
                user: action.email,
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

        default:
            return state
    }
}

export default Reducer;