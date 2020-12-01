import { LOGIN, LOGOUT, SIGNUP } from "../actions/auth";

const initialState = {
    user: {palazo: 'palazo'},
    allowed: false,
    isSignup: false
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

        default:
            return state
    }
}

export default Reducer;