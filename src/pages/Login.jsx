import React, {useRef, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
function Login() {
    const navigate = useNavigate();
    const errorElement = useRef();
    useEffect(()=>{
      let loggedIn;
      if(localStorage.getItem('loggedIn') === null){
        loggedIn = [];
      }else{
        loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
      }
      if(loggedIn.length > 0){
          navigate('/dashboard/home');
      }
    },[])
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();

    const onSubmit = (data) => {
        isEmailUsernameExist(data);
    };

    function isEmailUsernameExist(data){
        let userFound = false;
        let passwordMatch = false;
        let errorMessage = "";
        let allUsers;
        if(localStorage.getItem('allUsers') === null){
            allUsers = [];
        }else{
            allUsers = JSON.parse(localStorage.getItem('allUsers'));
        }
        allUsers.forEach(user => {
            if(data.emailorUsername === user.email || data.emailorUsername === user.username){
                userFound = true;
                if(data.password === user.password){
                    passwordMatch = true;
                    saveLoggedUserToLocal(user);
                }
            }
        })
        if(userFound === false){
            errorMessage = "Wrong email or username. Try again!"
        }else if(passwordMatch === false){
            errorMessage = "Wrong password. Try again!"
        }

        errorElement.current && (errorElement.current.innerText = errorMessage);
    }

    function saveLoggedUserToLocal(user){
        let loggedIn;
        if(localStorage.getItem('loggedIn') === null){
            loggedIn = [];
        }else{
            loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
        }
        loggedIn.push(user);
        localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
        reset({ emailorUsername: '',  password: ''});
        navigate("/dashboard/home");
    }

	return (
        <div className="flex items-center justify-center h-[100vh] w-[100vw]">
        <i className="fa-brands fa-twitter fixed top-[30px] left-[30px] text-5xl cursor-pointer text-[rgba(253,253,253,1)] bg-[rgba(35,64,143,1)] p-[7px] rounded-[50%]" onClick={()=> navigate("/")}></i>
		<form className="w-[30%] bg-[#e0f2fe] p-[30px] sm:w-[80%] md:w-[60%] lg:w-[40%]" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-center text-2xl mb-[15px] font-bold cursor-default">Login</h1>
            <div className="mb-[22px]">
                <label className="text-md font-semibold w-full">Email or Username:<br/>
                <input type="text" placeholder="Email or Username" {...register("emailorUsername", {
                    required: "email or username required",
                })} className="outline-0 pl-[8px] h-[40px] w-full font-normal" />
                </label><br />
                {errors.emailorUsername && (
                    <small className="text-[#dc2626]">
                        {errors.emailorUsername.message}
                    </small>
                )}
            </div>
            
            <div className="mb-[22px]">
                <label className="text-md font-semibold w-full">Password:<br />
                <input type="password" placeholder="Password" {...register("password", {
                    required: "password required",
                })} className="outline-0 pl-[8px] h-[40px] w-full font-normal" />
                </label><br />
                {errors.password && (
                    <small className="text-[#dc2626]">
                        {errors.password.message}
                    </small>
                )}
            </div>

            <div className="mb-[10px]"><small ref={errorElement} className="text-[#dc2626]"></small></div>
            <input type="submit" className="bg-[#0284c7] py-[10px] px-[15px] rounded-md cursor-pointer text-white font-semibold hover:bg-[#0369a1]" />
            <div className="text-sm font-semibold mt-[10px] text-[#0284c7] hover:text-[#0369a1] hover:[&>*]:border-b-[1px] hover:[&>*]:border-[#0369a1]"><Link to="/register">Don't have an account?</Link></div>
        </form>
        </div>
	)
}

export default Login;