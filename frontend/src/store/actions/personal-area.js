import axios, {REGISTER_UPDATE_URL} from "../../urls";

export const USER_UPDATE_REQUEST = "USER_UPDATE_REQUEST";
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
export const USER_UPDATE_ERRORS = "USER_UPDATE_ERRORS";


export const userUpdate = (data, id) => {
    return dispatch => {
        dispatch({type: USER_UPDATE_REQUEST});
        return axios.patch(REGISTER_UPDATE_URL + id + '/', data, {
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        }).then(response => {
            console.log(response);
            return dispatch({type: USER_UPDATE_SUCCESS});
        }).catch(error => {
            console.log(error);
            console.log(error.response);

            //return dispatch({type: USER_UPDATE_ERRORS, errors: error.response.data});
        })
    };

};