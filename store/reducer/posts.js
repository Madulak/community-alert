import { LOADING, SELECT_LOCATION } from "../actions/posts";

const initialState = {
    location: {},
    loading: false
}

const reducer = ( state = initialState, action) => {
    switch(action.type) {

        case SELECT_LOCATION:
            return {
                ...state,
                location: action.location,
            }
        case LOADING:
            return {
                ...state,
                loading: action.loading
            }

        default: 
            return state
    }
}

export default reducer;