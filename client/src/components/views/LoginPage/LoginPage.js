import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //mount, update,rendering 기능을 위한 Hook의 useState
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
    //이벤트가 발생했을때 페이지 새로고침 방지
    event.preventDefault();

    // console.log('email',Email);
    // console.log('password',Password);

    let body ={
      email: Email,
      password: Password
    };

    // console.log(`Login dispatch : ${dispatch}`); //function
    //action loginUser에 객체 형식의 body를 넣어 진행
    dispatch(loginUser(body))
    .then(response => {

      //reducer에서 보낸 return 값이 response로
      console.log(`login dispatch response`);
      console.log(response);
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

// export default Auth(LoginPage, false);
export default LoginPage;

