/* eslint-disable no-unused-vars */
import React, {useEffect ,useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import {auth} from '../../../_actions/user_action';

function LandingPage() {

    const navigate = useNavigate();

    //Axios 말고 Redux 방식으로 진행
        //const dispatch = useDispatch();
        // const [Email,setEmail] =  useState("");
        // const [Password,setPassword] =  useState("");

    // //LandingPage에 들어오자마자 useEffect 시작
    // useEffect(()=>{
    //     ///api/hello server에 요청
    //     axios.get('/api/hello')
    //     //server에서 돌아오는 response를 화면에 보임
    //     .then(response => console.log(response))
    //     //server와 client 주소가 다름 -> 데이터 못 받음 -> concurrently
    // },[])

    axios.get('/')
    .then(response =>{
        console.log(response);
    })

    const onClickHandler = () => {
        axios.get('/api/user/logout')
        .then(response => {
            // console.log(response)
                //{config:
                // data: {message:
                //          success: true      
                //        } 
                //header:
                //...
                //}
            if(response.data.success){
                navigate('/login');
            }else{
                alert('로그아웃 하는데 실패했습니다.');
            }
        })

        //Axios 말고 Redux 방식으로 진행
            // let body ={
            //     email: Email,
            //     password: Password
            // };
            // dispatch(auth(body))
            // .then(response => {
            //     if(response.payload.isAuth){
            //         navigate('/');
            //     }else{
            //         alert('Error');
            //     }
            // })
    }
    
return (
    <div style ={{display: 'flex', justifyContent: 'center', alignItems: 'center',
                width: '100%', height: '100vh'
                }}>
        <h2>시작 페이지</h2>

        <button onClick={onClickHandler}>
            로그아웃
        </button>
    </div>
)
}

// export default Auth(LandingPage, null);
export default LandingPage;

