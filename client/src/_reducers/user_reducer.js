/* eslint-disable no-unreachable */
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
}from '../_actions/types';

//preState와 action을 더해 next state을 넘겨준다
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state ={}, action){

    switch(action.type){
        case LOGIN_USER:
                console.log(` ====== LOGIN_USER reducer 시작 ======`);
                //spread operator: 똑같이 가져옴
                return{...state, loginSuccess: action.payload};
                // eslint-disable-next-line no-unreachable
                break;

        case REGISTER_USER:
            console.log(` ====== REGISTER_USER reducer 시작 ====== `);
            //spread operator: 똑같이 가져옴
            return{...state, register: action.payload}
            // eslint-disable-next-line no-unreachable
            break;
        
        case AUTH_USER:
            console.log(` ====== AUTH_USER reducer 시작 ====== `);
            //spread operator: 똑같이 가져옴
            return{...state, userData: action.payload}
            break;
        
        default:
            return state;
    }

}