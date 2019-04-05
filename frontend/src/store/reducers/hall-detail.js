import {MOVIE_SHOWS_REQUEST, MOVIE_SHOWS_SUCCESS, HALL_LOAD_SUCCESS} from "../actions/hall-detail";

const initialState = {
    hall: null,
    shows: []
};

const hallDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case HALL_LOAD_SUCCESS:
            return {
                ...state,
                hall: action.hall,
            };
        case MOVIE_SHOWS_REQUEST:
            return {...state, shows: {}};
        case MOVIE_SHOWS_SUCCESS:
            return {...state, shows: action.shows};
        default:
            return state
    }

};


export default hallDetailReducer;