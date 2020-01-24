export const SET_ADAPT = "SET_ADAPT";
export const START_ADAPT = "START_ADAPT";
export const SIGNUP = "SIGNUP"

export function setAdapt(adaptions) {
    return {
       type: START_ADAPT,
       payload: adaptions,
       type: SET_ADAPT
    }
}

export function signUp(form) {
    console.log(form)
}