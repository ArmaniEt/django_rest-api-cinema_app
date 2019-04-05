import {HALL_ADD_ERROR, HALL_ADD_REQUEST, HALL_ADD_SUCCESS} from "../actions/hall-add";

const initialState = {
    hall: {},
    loading: false,
    errors: {}

};


const hallAddReducer = (state = initialState, action) => {
    switch (action.type) {
        case HALL_ADD_REQUEST:
            return{
                ...state,
                loading: true,
                hall: {},
                errors: {}

            };
        case HALL_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                hall: action.data,
                errors: {}
            };
        case HALL_ADD_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.errors
            };

        default:
            return state;
    }
};


export default hallAddReducer;