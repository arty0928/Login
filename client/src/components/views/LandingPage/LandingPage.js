import React, {useEffect}from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';

function LandingPage() {

    const navigate = useNavigate();

    //LandingPage에 들어오자마자 useEffect 시작
    useEffect(()=>{
        ///api/hello server에 요청
        axios.get('/api/hello')
        //server에서 돌아오는 response를 화면에 보임
        .then(response => console.log(response))
        //server와 client 주소가 다름 -> 데이터 못 받음 -> concurrently
    },[])

    const onClickHandler = () => {
        axios.get('/api/user/logout')
        .then(response => {
            if(response.data.success){
                navigate('/login');
            }else{
                alert('로그아웃 하는데 실패했습니다.');
            }
        })
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

