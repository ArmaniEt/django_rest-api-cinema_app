import {MOVIE_SHOWS_REQUEST, MOVIE_SHOWS_SUCCESS, MOVIE_LOAD_SUCCESS} from "../actions/movie-detail";

const initialState = {
    movie: null,
    shows: []
};

const movieDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIE_LOAD_SUCCESS:
            return {
                ...state,
                movie: action.movie,
            };
        case MOVIE_SHOWS_REQUEST:
            return {...state, shows: {}};
        case MOVIE_SHOWS_SUCCESS:
            return {...state, shows: action.shows};
        default:
            return state
    }

};


export default movieDetailReducer;
