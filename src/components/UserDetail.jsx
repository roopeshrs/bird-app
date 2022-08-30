import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from 'react-router-dom';
function UserDetail({image, fullName, userId, nameShorten, backgroundColor, logout, follow, setFollowCountUpdate, followCountUpdate}) {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const followInitialRender = useRef(true);
  const [isFollowInitialValue, setIsFollowInitialValue] = useState(false);
  
  function removeLoggedInUserFromLocal(){
        let loggedIn;
        if(localStorage.getItem('loggedIn') === null){
            loggedIn = [];
        }else{
            loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
        }
        loggedIn = [];
        localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
        navigate('/');
    }

    useEffect(()=>{
        let loggedIn;
        if(localStorage.getItem('loggedIn') === null){
            loggedIn = [];
        }else{
            loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
        }

        let allUsers;
        if(localStorage.getItem('allUsers') === null){
            allUsers = [];
        }else{ 
        allUsers = JSON.parse(localStorage.getItem('allUsers'));
        } 
        const getIndex = allUsers.findIndex(user => user.username === loggedIn[0].username);
        allUsers[getIndex].following.includes(userId.substring(1)) && setIsFollowInitialValue(true);
    },[])

    useEffect(()=>{
        if (followInitialRender.current) {
            followInitialRender.current = false;
        } else {
            setIsFollowInitialValue(false);
            updateFollowCount();
        }
    },[isFollowing])

    const updateFollowCount = () => {
        let loggedIn;
        if(localStorage.getItem('loggedIn') === null){
            loggedIn = [];
        }else{
            loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
        }

        let loggedInUser = loggedIn[0];

        let allUsers;
        if(localStorage.getItem('allUsers') === null){
            allUsers = [];
        }else{
            allUsers = JSON.parse(localStorage.getItem('allUsers'));
        }
        const indexToUpdate = allUsers.findIndex(user => user.username === loggedInUser.username);
        if(isFollowing){
            if(!allUsers[indexToUpdate].following.includes(userId.substring(1))){
                allUsers[indexToUpdate].following.push(userId.substring(1));
                const findIndex = allUsers.findIndex(user => user.username === userId.substring(1));
                allUsers[findIndex].followers.push(loggedInUser.username);
            }
        }else{
            allUsers[indexToUpdate].following = allUsers[indexToUpdate].following.filter(username => username !== userId.substring(1));
            const indexUpdate = allUsers.findIndex(user => user.username === userId.substring(1));
                allUsers[indexUpdate].followers = allUsers[indexUpdate].followers.filter(username => username !== loggedInUser.username);
        }
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
        setFollowCountUpdate(followCountUpdate => followCountUpdate + 1);
    }

  return (
    <div className={`m-[12px] p-[5px] flex items-center justify-between text-[#dcddde] text-sm ${follow && "pb-[12px] border-b-[1px] border-[rgb(229, 229, 229)"}`}>
        <div className="flex items-center">
            <div className="shrink-0 w-[40px] h-[40px] mr-[12px] rounded-[50%] overflow-hidden cursor-pointer border-[1px] border-[rgb(229, 229, 229)]">
            {
                image !== null ? <img src={image} /> : <div className="w-full h-full text-black font-bold grid place-content-center" style={{backgroundColor: backgroundColor}}>{nameShorten}</div> 
            }
            </div>
            <div className="text-md text-black font-bold cursor-default">
                <div>{fullName}</div>
                <div className="text-xs">{userId}</div>
            </div>
        </div>
        {
            logout && (
                <div className="bg-[#0284c7] py-[6px] px-[12px] rounded-3xl cursor-pointer text-white font-semibold hover:bg-[#0369a1] text-center" onClick={()=> removeLoggedInUserFromLocal()}>Logout</div>
            )
        }
        {
            follow && (
                <div className="text-[#0284c7] py-[6px] px-[12px] rounded-3xl cursor-pointer font-bold text-center border-[1px] border-[#0284c7] hover:bg-[#0284c7] hover:text-white" onClick={()=>{
                    setIsFollowing(!isFollowing);
                }}>{
                    isFollowInitialValue || isFollowing ? 'Following' : 'Follow'
                }</div>
            )
        }
    </div>
  );
}

export default UserDetail;