import {combineReducers} from 'redux';
import loginReducer from "./login";
import authReducer from "./auth";
import tokenLoginReducer from "./app";
import movieAddReducer from "./movie_add";
import movieListReducer from "./movie-list";
import movieEditReducer from "./movie-edit";
import movieDetailReducer from "./movie-detail";


const rootReducer = combineReducers({
    login: loginReducer,
    auth: authReducer,
    app: tokenLoginReducer,
    movie: movieAddReducer,
    movieList: movieListReducer,
    movieEdit: movieEditReducer,
    movieDetail: movieDetailReducer

});

export default rootReducer
