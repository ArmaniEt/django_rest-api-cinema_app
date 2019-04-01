import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR} from "./actions/login";
import {LOGOUT} from "./actions/logout";
import {TOKEN_LOGIN_ERROR, TOKEN_LOGIN_REQUEST, TOKEN_LOGIN_SUCCESS} from "./actions/token-login";
import {MOVIE_ADD_REQUEST, MOVIE_ADD_SUCCESS, MOVIE_ADD_ERROR} from "./actions/movie_add";

const initialState = {
    login: {
        loading: false,
        errors: {}

    },
    app: {
        loading: true,
        errors: {}
    },
    auth: {},
    register: {

    },
    movieList: {

    },
    movieDetail: {

    },
    movieAdd: {
        movie: {},
        loading: false,
        errors: {}
    },
    movieEdit: {

    },

};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                login: {
                    ...state.login,
                    errors: {},
                    loading: true
                }

            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: false
                },
                auth: action.data

            };
        case LOGIN_ERROR:
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    errors: action.errors
                },

            };
        case LOGOUT:
            return {
                ...state,
                auth: {}
            };
        case TOKEN_LOGIN_REQUEST:
            return {
                ...state,
                app: {
                    ...state.app,
                    loading: true,
                    errors: {}
                }
            };
        case TOKEN_LOGIN_SUCCESS:
            return {
                ...state,
                app: {
                    ...state.app,
                    loading: false,
                },

                auth: action.data

            };
        case TOKEN_LOGIN_ERROR:
            return{
                ...state,
                app: {
                    ...state.app,
                    loading: false,
                    errors: action.errors
                }
            };
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

export default reducer;