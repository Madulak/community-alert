import { LOGIN, LOGOUT } from "../actions/auth";

const initialState = {
    user: {palazo: 'palazo'},
    allowed: false,
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
                user: {palazo: 'palazo'},
            }

        default:
            return state
    }
}

export default Reducer;