import React, {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
function Protected(props) {
  const {Component} = props;
  const navigate = useNavigate();
  useEffect(()=>{
      let loggedIn;
      if(localStorage.getItem('loggedIn') === null){
            loggedIn = [];
      }else{
            loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
      }
      if(loggedIn.length === 0){
          navigate('/login');
      }
  },[])
  return (
    <div>
        <Component />
    </div>
  );
}

export default Protected;