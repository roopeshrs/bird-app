import React, {useState, useEffect} from "react";
import SideBarRow from './SideBarRow';
import UserDetail from './UserDetail';
function LeftSideBar() {
    const [user, setUser] = useState();
    useEffect(()=>{
        let loggedIn;
        if(localStorage.getItem('loggedIn') === null){
            loggedIn = [];
        }else{
            loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
        }
        if(loggedIn.length > 0){
            setUser(loggedIn[0]);
        }
    }, [])

    const rowContent = [
      {
          title: "Home", 
          icon: <i className="fa-solid fa-house"></i>, 
          active: true
      },
      {
          title: "Explore", 
          icon: <i className="fa-solid fa-hashtag"></i>, 
          active: false
      },
      {
          title: "Communities", 
          icon: <i className="fa-solid fa-user-group"></i>, 
          active: false
      },
      {
          title: "Notifications", 
          icon: <i className="fa-solid fa-bell"></i>, 
          active: false
      },
      {
          title: "Messages", 
          icon: <i className="fa-solid fa-envelope"></i>, 
          active: false
      },
      {
          title: "Bookmarks", 
          icon: <i className="fa-solid fa-bookmark"></i>, 
          active: false
      },
      {
          title: "Profile", 
          icon: <i className="fa-solid fa-user"></i>, 
          active: false
      },
      {
          title: "More", 
          icon: <i className="fa-solid fa-ellipsis"></i>, 
          active: false
      },
    ]

  return (
    <div className="flex-[0.2] flex flex-col justify-between border-r-[1px] border-[rgb(229, 229, 229)]">
        <div>
            <div className="m-[10px]">
                <i className="fa-brands fa-twitter text-5xl cursor-pointer text-[rgba(253,253,253,1)] bg-[rgba(35,64,143,1)] p-[7px] rounded-[50%]"></i>
            </div>
            <div>
                {
                    rowContent.map((content, index) => 
                        <SideBarRow 
                            key={index} 
                            title={content.title} 
                            icon={content.icon} 
                            active={content.active}
                        />
                    )
                }
            </div>
        </div>
        {
            user && (
                <div className="bg-[#e0f2fe]">
                    <UserDetail 
                        image={user.image}
                        fullName={user.fullName}
                        userId={`@${user.username}`}
                        nameShorten={user.nameShorten}
                        backgroundColor={user.backgroundColor}
                        logout
                    />
                </div>
            )
        }
    </div>
  );
}

export default LeftSideBar;