import {USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_ERRORS} from "../actions/personal-area";
import {LOGOUT} from "../actions/logout";


let requestSuccess = ['Данные успешно обновлены, аутентифицируйтесь заново для применения'];
const initialState = {
    loading: false,
    success: []
};

const personalAreaReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
                success: []
            };
        case USER_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: requestSuccess
            };
        case LOGOUT:
            return {
                ...state,
                loading: false,
                success: []
            };
        default:
            return state;
    }
};


export default personalAreaReducer;