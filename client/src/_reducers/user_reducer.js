import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
}from '../_actions/types';

//preState와 action을 더해 next state을 넘겨준다
export default function (state ={}, action){
    switch(action.type){
        case LOGIN_USER:
                //spread operator: 똑같이 가져옴
                return{...state, loginSuccess: action.payload}
                break;

        case REGISTER_USER:
            //spread operator: 똑같이 가져옴
            return{...state, register: action.payload}
            break;
        
        case AUTH_USER:
            //spread operator: 똑같이 가져옴
            return{...state, userData: action.payload}
            break;
        
        default:
            return state;
    }

}