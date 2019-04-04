import {REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS} from "../actions/register";
import {LOGIN_SUCCESS} from "../actions/login";

const initialState = {
    errors: {},
    loading: false
};



const registerUserReducer = (state = initialState, action) => {
    switch(action.type){
        case REGISTER_REQUEST:
            return {...state, errors: {}, loading: true};
        case REGISTER_ERROR:
            console.log(action);
            return {...state, errors: action.errors, loading: false};
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false
            };

        default:
            return state;

    }

};


export default registerUserReducer;

