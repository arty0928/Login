import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';


function Register(props) {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // email, password의 상태를 변경해주기 위한 state
  const [Email,setEmail] =  useState("");
  const [Password,setPassword] =  useState("");
  const [Name,setName] =  useState("");
  const [ConfirmPassword,setConfirmPassword] =  useState("");

  const onEmailHandler = (event) =>{
    //state을 바꿔줌
    setEmail(event.currentTarget.value);
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if(Password !== ConfirmPassword){
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }

    let body ={
      email: Email,
      password: Password,
      name: Name
    };

    dispatch(registerUser(body))
    .then(response => {
      if(response.payload.success){
        navigate('/login');
      }else{
        alert('Failed to signUp');
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
        {/* value에 state을 넣어야 함 -> 이 안에서 데이터를 변경하므로 */}
        {/* onChange를 넣어야 정보 입력가능 */}
        {/* 입력을 할때 onChange라는 이벤트 발생 -> state 변경 -> value 변경 */}
        <label>Email</label>
        <input type="email" value={Email} onChange ={onEmailHandler}/>

        <label>Password</label>
        <input type="password" value ={Password} onChange={onPasswordHandler} />

        <label>Name</label>
        <input type="text" value ={Name} onChange={onNameHandler} />
        
        <label>ConfirmPassword</label>
        <input type="password" value ={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        
        <br />
        <button type="submit" >
          회원가입
        </button>
    </form>

    </div>
  )
}

export default Register
