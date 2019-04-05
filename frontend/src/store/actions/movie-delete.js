import axios, {MOVIES_URL} from "../../urls";

export const MOVIE_DELETE_REQUEST = 'MOVIE_DELETE_REQUEST';
export const MOVIE_DELETE_SUCCESS = 'MOVIE_DELETE_SUCCESS';


// TODO finish with errors
export const MOVIE_DELETE_ERROR = 'MOVIE_DELETE_ERROR';



export const movieDelete = (movieId) => {
    return dispatch => {
        dispatch({type: MOVIE_DELETE_REQUEST});
        return axios.delete(MOVIES_URL + movieId + '/', {headers: {
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }}).then((response) => {
                console.log(response);
                return dispatch({type: MOVIE_DELETE_SUCCESS, id: movieId});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            //return dispatch({type: MOVIE_DELETE_ERROR, errors: error.response.data})
        })
    };
};