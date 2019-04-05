import axios, {HALLS_URL} from "../../urls";

export const HALL_ADD_REQUEST = "HALL_ADD_REQUEST";
export const HALL_ADD_SUCCESS = "HALL_ADD_SUCCESS";
export const HALL_ADD_ERROR = "MOVIE_ADD_ERROR";



export const hallAddRequest = () => {
    return {type: HALL_ADD_REQUEST}

};


export const hallAddSuccess = (data) => {
    return {type: HALL_ADD_SUCCESS, data}
};



export const hallAddError = (errors) => {
    return {type: HALL_ADD_ERROR, errors}

};


export const hallAdd = (data) => {
    return dispatch => {
        dispatch(hallAddRequest());

        return axios.post(HALLS_URL, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        }).then(response => {
            console.log(response);
            return dispatch(hallAddSuccess(response.data));

        }).catch(error => {
            console.log(error);
            console.log(error.response);

            return dispatch(hallAddError(error.response.data));
        });

    };
};