import {combineReducers} from 'redux';
import loginReducer from "./login";
import authReducer from "./auth";
import tokenLoginReducer from "./app";
import movieAddReducer from "./movie_add";
import movieListReducer from "./movie-list";
import movieEditReducer from "./movie-edit";
import movieDetailReducer from "./movie-detail";
import registerUserReducer from "./register";



const rootReducer = combineReducers({
    login: loginReducer,
    auth: authReducer,
    register: registerUserReducer,
    app: tokenLoginReducer,
    movie: movieAddReducer,
    movieList: movieListReducer,
    movieEdit: movieEditReducer,
    movieDetail: movieDetailReducer,
});

export default rootReducer
