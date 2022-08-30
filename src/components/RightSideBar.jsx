import React, {useState, useEffect} from "react";
import UserDetail from './UserDetail';
function RightSideBar({setFollowCountUpdate, followCountUpdate}) {
  const [usersList, setUsersList] = useState();
  const [loggedInUser, setLoggedInUser] = useState();
  useEffect(()=>{
    let allUsers;
    if(localStorage.getItem('allUsers') === null){
        allUsers = [];
    }else{
        allUsers = JSON.parse(localStorage.getItem('allUsers'));
    }
    if(allUsers.length > 0){
        setUsersList(allUsers);
    }
  },[])

  useEffect(()=>{
    let loggedIn;
    if(localStorage.getItem('loggedIn') === null){
        loggedIn = [];
    }else{
        loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    }
    if(loggedIn.length > 0){
        setLoggedInUser(loggedIn[0]);
    }
  },[])
  return (
    <>
        <div className="flex-[0.3] border-l-[1px] border-[rgb(229, 229, 229)]">
            <div className="m-[12px] p-[10px] bg-[#e0f2fe] rounded-3xl flex items-center mb-[20px]">
                <div>
                    <i className="fa-solid fa-magnifying-glass mr-[10px] cursor-pointer"></i>
                </div>
                <div className="flex-1">
                    <input type="text" placeholder="Search Twitter" className="w-full bg-[#e0f2fe] outline-0"/>
                </div>
            </div>
            <div className="m-[12px] p-[10px]">
                <h2 className="text-xl font-bold">You might like</h2>
                <div>
                    {
                        usersList && (usersList.filter(user => user.username !== loggedInUser.username).map((user, index) => 
                            <UserDetail 
                                key={index}
                                image={user.image}
                                fullName={user.fullName}
                                userId={`@${user.username}`}
                                nameShorten={user.nameShorten}
                                backgroundColor={user.backgroundColor}
                                follow
                                setFollowCountUpdate={setFollowCountUpdate}
                                followCountUpdate={followCountUpdate}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    </>
  );
}

export default RightSideBar;