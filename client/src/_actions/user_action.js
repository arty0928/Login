import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
}from './types';

//LoginPage에서 body로 email과 pw로 넣어준것을 dataToSubmit으로 받음
export function loginUser(dataToSubmit){

    console.log(`loginUser action 시작`);

    const request = axios.post('/api/user/login',dataToSubmit)
    //서버에서 받은 데이터를 request에 저장
    //서버에서 로그인 정보(loginSuccess: true, userId: ~~)를 쿠키에 저장해서 response로 보냄 -> response.data가 request로
    //response.data : loginSuccess: true, userId: ~~
        .then(response => response.data);
    
    console.log(request); //promise (axios사용해서)
    // requestResult : object
        // loginSuccess : true  
        // userId : "63ec2eb0346fd1264af65b20"
    
    //return해서 reducer에 넘겨줘야
    //reducer: pre와 next action을 조합해서 다음 state을 만들어야 
    //action은 무엇이 일어났는지 설명한다
    return {
        type: LOGIN_USER, //LOGIN_USER가 발생했고,
        payload: request  //그 LOGIN_USER이 정상 작동한 설명을 payload에
    }
}

export function registerUser(dataToSubmit){

    console.log(`registerUser action 시작`);

    const request = axios.post('/api/user/register',dataToSubmit)
    //서버에서 받은 데이터를 request에 저장
    //console.log(response.data) : {success: true} : server에서 json 타입으로 보낸 response
        .then(response =>response.data)
    
    //console.log(request);
        // Promise result
            // success : true   


    //return해서 reducer에 넘겨줘야
    //reducer: pre와 next action을 조합해서 다음 state을 만들어야 
    return {
        //action에는 type과 payload field 가 2개 있음
        //이름을 다르게 하면 오류남
        type: REGISTER_USER,
        payload: request
    }
}

export function auth(){

    console.log(`auth action 시작`);

    const request = axios.get('/api/user/auth')
    //서버에서 받은 데이터를 request에 저장
        .then(response =>response.data)
    
        console.log(request)
    //return해서 reducer에 넘겨줘야
    //reducer: pre와 next action을 조합해서 다음 state을 만들어야 
    return {
        type: AUTH_USER,
        payload: request
    }
}

