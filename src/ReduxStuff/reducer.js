import {
    SET_ADAPT
} from './actions';

const initialState = {
    fontSize: 34,
    fontColor: "black",
    backGround: "lightblue",
    isLoading: false,
}

export function reducer(state = initialState, action) {

    switch (action.type) {
        case SET_ADAPT:
            console.log(action)
            return{
                ...state,
                fontSize: action.payload.fontSize,
                fontColor: action.payload.fontColor,
                backGround: action.payload.backGround
            }

        default:
            return state;
    }
}