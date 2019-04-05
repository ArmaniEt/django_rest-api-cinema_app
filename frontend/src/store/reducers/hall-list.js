import {HALL_LIST_REQUEST_SUCCESS} from "../actions/hall-list";
import {HALL_DELETE_SUCCESS} from "../actions/hall-delete";


const initialState = {
    halls: []
};


const hallListReducer = (state = initialState, action) => {
    switch (action.type) {
        case HALL_LIST_REQUEST_SUCCESS:
            return {...state, halls: action.halls};
        case HALL_DELETE_SUCCESS:
            let halls = state.halls;
            let hallId = action.id;
            let hallIndex = halls.findIndex(movie => movie.id === hallId);
            halls.splice(hallIndex, 1);
            return {
                ...state,
                halls: halls

            };
        default:
            return state
    }

};

export default hallListReducer;