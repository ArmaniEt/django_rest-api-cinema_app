import axios, {MOVIES_URL} from "../../urls";

export const MOVIE_ADD_REQUEST = "MOVIE_ADD_REQUEST";
export const MOVIE_ADD_SUCCESS = "MOVIE_ADD_SUCCESS";
export const MOVIE_ADD_ERROR = "MOVIE_ADD_ERROR";



export const movieAddRequest = () => {
    return {type: MOVIE_ADD_REQUEST}

};


export const movieAddSuccess = (data) => {
    return {type: MOVIE_ADD_SUCCESS, data}
};



export const movieAddError = (errors) => {
    return {type: MOVIE_ADD_ERROR, errors}

};


export const movieAdd = (data) => {
    return dispatch => {
        dispatch(movieAddRequest());

        return axios.post(MOVIES_URL, data, {headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }}).then(response => {
            console.log(response);
            return dispatch(movieAddSuccess(response.data));

        }).catch(error => {
            console.log(error);
            console.log(error.response);

            return dispatch(movieAddError(error.response.data));
        });

    };

};