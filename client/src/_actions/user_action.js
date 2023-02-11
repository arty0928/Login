import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
}from './types';

export function loginUser(dataToSubmit){

    const request = axios.post('/api/user/login',dataToSubmit)
    //서버에서 받은 데이터를 request에 저장
        .then(response =>response.data)
    
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
        .then(response =>response.data)
    
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

