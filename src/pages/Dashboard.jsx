import React, {useState} from "react";
import LeftSideBar from '../components/LeftSideBar';
import RightSideBar from '../components/RightSideBar';
import {Outlet} from 'react-router-dom';
function Dashboard() {
  const [followCountUpdate, setFollowCountUpdate] = useState(0);
  return (
    <>
        <div className="flex h-[100vh]">
            <LeftSideBar />
            <Outlet context={[followCountUpdate]} />
            <RightSideBar setFollowCountUpdate={setFollowCountUpdate} followCountUpdate={followCountUpdate} />
        </div>
    </>
  );
}

export default Dashboard;