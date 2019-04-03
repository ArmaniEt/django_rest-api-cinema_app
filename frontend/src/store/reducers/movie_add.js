import {MOVIE_ADD_ERROR, MOVIE_ADD_REQUEST, MOVIE_ADD_SUCCESS} from "../actions/movie_add";

const initialState = {
    movie: {},
    loading: false,
    errors: {}

};


const movieAddReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIE_ADD_REQUEST:
            return{
                ...state,
                loading: true,
                movie: {},
                errors: {}

            };
        case MOVIE_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                movie: action.data,
                errors: {}
            };
        case MOVIE_ADD_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.errors
            };


        default:
            return state;
    }
};


export default movieAddReducer;