import {
    LOGIN_USER
}from '../_actions/types';

//preState와 action을 더해 next state을 넘겨준다
export default function (state ={}, action){
    //왜 action type이지
    switch(action.type){
        case LOGIN_USER:
                //spread operator: 똑같이 가져옴
                return{...state, loginSuccess: action.payload}
                break;
        
        default:
            return state;
    }

}