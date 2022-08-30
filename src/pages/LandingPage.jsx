import React from 'react'
import twitterLandingPageImage from '../../assets/twitter-landing-page.png';
import { useNavigate } from "react-router-dom";
function LandingPage() {
    const navigate = useNavigate();
	return (
		<div className="h-[100vh] flex sm:flex-col">
            <div className="flex-[0.5] flex items-center justify-center">
                <div className="w-[60%]">
                    <img src={twitterLandingPageImage} />
                </div>
            </div>
            <div className="flex-[0.5] bg-[#e0f2fe] flex flex-col items-center justify-center">
                <h1 className="mb-[50px] text-5xl uppercase font-bold">Bird App</h1>
                <div className="bg-[#0284c7] py-[10px] px-[15px] rounded-md cursor-pointer text-white font-semibold hover:bg-[#0369a1]" onClick={()=> navigate("./register")}>Join today</div>
                <p className="cursor-default">or</p>
                <div className="bg-[#0284c7] py-[10px] px-[15px] rounded-md cursor-pointer text-white font-semibold hover:bg-[#0369a1]" onClick={()=> navigate("./login")}>Sign in</div>
            </div>
		</div>
	)
}

export default LandingPage;