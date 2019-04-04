import moment from "moment";
import {SHOWS_URL} from "../../urls";
import axios, {MOVIES_URL} from "../../urls";

export const MOVIE_SHOWS_REQUEST = "MOVIE_DETAIL_REQUEST";
export const MOVIE_SHOWS_SUCCESS = "MOVIE_DETAIL_SUCCESS";

export const MOVIE_LOAD_SUCCESS = "MOVIE_LOAD_SUCCESS";


export const loadShows = (movieId) => {
    return dispatch => {
        const startsAfter = moment().format('YYYY-MM-DD HH:mm');
        const startsBefore = moment().add(3, 'days').format('YYYY-MM-DD');
        const query = encodeURI(`movie_id=${movieId}&hall_id=&starts_after=${startsAfter}&starts_before=${startsBefore}`);
        dispatch({type: MOVIE_SHOWS_REQUEST});
        return axios.get(`${SHOWS_URL}?${query}`).then(response => {
            console.log(response);
            return dispatch({type: MOVIE_SHOWS_SUCCESS, shows: response.data})
            // do MOVIE_SHOWS_SUCCESS here
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        });

    };

};


export const loadMovie = (id) => {
    return dispatch => {
        axios.get(MOVIES_URL + id).then(response => {
            console.log(response.data);
            return dispatch({type: MOVIE_LOAD_SUCCESS, movie: response.data});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        });
        loadShows(id);
    }
};