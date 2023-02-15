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
                // console.log(state);
                    // userData:{
                    //     isAuth: false,
                    //     error: true
                    // }

                // console.log(action.payload);
                    // { loginSuccess: true,
                    //   userId: ~~
                    // }
                
                
                //loginSuccess에 action.payload를 넣어줌
                //redux extension에서 store내부 확인) store안에 
                
                //preState인 userData에 loginSuccess라는 이름의 action 추가
                //loginSuccess : { 
                //        loginSucces: true, 
                //        userId: ~
                //      } 

                //...state -> 이런 형식이 안전(원본값을 복사하기 떄문에)
                return {...state, loginSuccess: action.payload};

                // console.log(action);
                    //payload: {loginSuccess: true, userId:~~}
                    //type: "login_user"

                //action.payload말고 action만 넣어도 됨
                //왜냐면 dispatch response로 action.payload로 접근하므로

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
            //console.log(state);
                //loginSuccess: {loginSuccess: true, userId: ~~}
                //userDate: {email: , isAuth: , ,,}

            return{...state, userData: action.payload}
            break;
        
        default:
            return state;
    }

}