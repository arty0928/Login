import axios from 'axios';
import {
    LOGIN_USER
} from './types';

export function loginUser(dataToSubmit){
    
    //server에서 login 주소와 동일하게
    const requset = axios.post('/login', dataToSubmit)
    .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: requset
    }

}