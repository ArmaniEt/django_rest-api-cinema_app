import {MOVIE_LIST_REQUEST_SUCCESS} from "../actions/movie-list";
import {MOVIE_DELETE_SUCCESS} from "../actions/movie-delete";


const initialState = {
    movies: []
};


const movieListReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIE_LIST_REQUEST_SUCCESS:
            return {...state, movies: action.movies};
        case MOVIE_DELETE_SUCCESS:
            let movies = state.movies;
            let movieId = action.id;
            let movieIndex = movies.findIndex(movie => movie.id === movieId);
            movies.splice(movieIndex, 1);
            return {
                ...state,
                movies: movies

            };
        default:
            return state

    }

};

export default movieListReducer;
