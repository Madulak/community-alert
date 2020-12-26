import { LOADING, SELECT_LOCATION, UPLOADED_POST } from "../actions/posts";

const initialState = {
    location: {},
    loading: false,
    uploadedPost: []
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
        case UPLOADED_POST:
            return {
                ...state,
                uploadedPost: action.uploadedPost
            }

        default: 
            return state
    }
}

export default reducer;