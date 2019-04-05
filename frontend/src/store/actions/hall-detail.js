import axios, {HALLS_URL, SHOWS_URL} from "../../urls";
import moment from "moment";


export const HALL_LOAD_SUCCESS = "HALL_LOAD_SUCCESS";
export const MOVIE_SHOWS_SUCCESS = "MOVIE_SHOWS_SUCCESS";
export const MOVIE_SHOWS_REQUEST = "MOVIE_SHOWS_REQUEST";


export const showsRequest = (hallId) => {
    return dispatch => {
        const startsAfter = moment().format('YYYY-MM-DD');
        const startsBefore = moment().add(3, 'days').format('YYYY-MM-DD');
        const query = encodeURI(`movie_id=&hall_id=${hallId}&starts_after=${startsAfter}&starts_before=${startsBefore}`);
        dispatch({type: MOVIE_SHOWS_REQUEST});
        return axios.get(`${SHOWS_URL}?${query}`).then(response => {
            console.log(response);
            return dispatch({type: MOVIE_SHOWS_SUCCESS, shows: response.data})
        }).catch(error => {
            console.log(error);
            console.log(error.response)
        })

    };

};

export const loadHall = (id) => {
    return dispatch => {
        axios.get(HALLS_URL + id).then(response => {
            console.log(response.data);
            return dispatch({type: HALL_LOAD_SUCCESS, hall: response.data});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        });
        showsRequest(id);
    }
};
