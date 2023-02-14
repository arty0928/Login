import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
}from './types';

//LoginPage에서 body로 email과 pw로 넣어준것을 dataToSubmit으로 받음
export function loginUser(dataToSubmit){

    const request = axios.post('/api/user/login',dataToSubmit)
    //서버에서 받은 데이터를 request에 저장
    //서버에서 로그인 정보(loginSuccess: true, userId: ~~)를 쿠키에 저장해서 response로 보냄 -> response.data가 request로
    //response.data : loginSuccess: true, userId: ~~
        .then(response => response.data);
    
    // console.log(request); //promise (axios사용해서)

    //return해서 reducer에 넘겨줘야
    //reducer: pre와 next action을 조합해서 다음 state을 만들어야 
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit){

    const request = axios.post('/api/user/register',dataToSubmit)
    //서버에서 받은 데이터를 request에 저장
    //console.log(response.data) : {success: true} : server에서 json 타입으로 보낸 response
        .then(response =>response.data)
    
    console.log(`registerUser: request: ${request}`);
    //return해서 reducer에 넘겨줘야
    //reducer: pre와 next action을 조합해서 다음 state을 만들어야 
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth(){

    const request = axios.get('/api/user/auth')
    //서버에서 받은 데이터를 request에 저장
        .then(response =>response.data)
    
    //return해서 reducer에 넘겨줘야
    //reducer: pre와 next action을 조합해서 다음 state을 만들어야 
    return {
        type: AUTH_USER,
        payload: request
    }
}

