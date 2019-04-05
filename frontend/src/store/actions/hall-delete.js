import axios, {HALLS_URL} from "../../urls";

export const HALL_DELETE_REQUEST = 'MOVIE_DELETE_REQUEST';
export const HALL_DELETE_SUCCESS = 'MOVIE_DELETE_SUCCESS';


// TODO finish with errors
export const HALL_DELETE_ERROR = 'MOVIE_DELETE_ERROR';



export const hallDelete = (hallId) => {
    return dispatch => {
        dispatch({type: HALL_DELETE_REQUEST});
        return axios.delete(HALLS_URL + hallId + '/', {headers: {
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }}).then((response) => {
                console.log(response);
                return dispatch({type: HALL_DELETE_SUCCESS, id: hallId});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            //return dispatch({type: HALL_DELETE_ERROR, errors: error.response.data})
        })
    };
};