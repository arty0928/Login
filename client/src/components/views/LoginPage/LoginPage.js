import { Axios } from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

function LoginPage(props) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // email, password의 상태를 변경해주기 위한 state
  const [Email,setEmail] =  useState("");
  const [Password,setPassword] =  useState("");

  const onEmailHandler = (event) =>{
    //state을 바꿔줌
    setEmail(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // console.log('email',Email);
    // console.log('password',Password);

    let body ={
      email: Email,
      password: Password
    };

    dispatch(loginUser(body))
    .then(response => {
      if(response.payload.loginSuccess){
        navigate('/');
      }else{
        alert('Error');
      }
    })
  }


  return (
    <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center',
    width: '100%', height: '100vh'
  }}>
      <form style={{display: 'flex', flexDirection: 'column'}}
      onSubmit={onSubmitHandler}
    >
        <label>Email</label>
        {/* value에 state을 넣어야 함 -> 이 안에서 데이터를 변경하므로 */}
        {/* onChange를 넣어야 정보 입력가능 */}
        {/* 입력을 할때 onChange라는 이벤트 발생 -> state 변경 -> value 변경 */}
        <input type="email" value={Email} onChange ={onEmailHandler}/>
        <label>Password</label>
        <input type="password" value ={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit" >
          Login
        </button>
    </form>

    </div>
  )
}

export default LoginPage
