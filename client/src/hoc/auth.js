import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {auth} from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

export default function Auth(SpecificComponent, option, adminRoute = null){

    //option종류
    //null -> 아무나 출입이 가능한 페이지
    //true -> 로그인한 유저만 출입이 가능한 페이지
    //false -> 로그인한 유저는 출입 불가능한 페이지

    //adminRoute 기본값이 null
    //admin User만 들어가고 싶게 하면 true


    const dispatch = useDispatch();

    function AuthenticiationCheck(){

    const navigate = useNavigate();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response);

                //유저 상태에 따라 들어올수 있는 페이지 막는 작업
                //로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    // option === true
                    if(option){
                        navigate('/login');
                    }
                }else {
                    //로그인 상태

                    //admin이 아닌데 admin 들어가려고 할때
                    if(adminRoute && !response.payload.isAdmin){
                        navigate('/');
                    }

                    //로그인한 유저가 출입 불가능한 페이지 접근 시(login page, register page)
                    else{
                        if(option===false){
                            navigate('/');
                        }
                    }

                }
            })

        },[])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticiationCheck
}