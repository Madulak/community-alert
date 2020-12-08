import { SELECT_LOCATION } from "../actions/posts";

const initialState = {
    location: {}
}

const reducer = ( state = initialState, action) => {
    switch(action.type) {

        case SELECT_LOCATION:
            return {
                ...state,
                location: action.location,
            }

        default: 
            return state
    }
}

export default reducer;