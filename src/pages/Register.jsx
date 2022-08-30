import React from 'react';
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
function Register() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();

    function generateLightColorHex() {
        let color = "#";
        for (let i = 0; i < 3; i++)
            color += ("0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
        return color;
    }

    const onSubmit = (data) => {
        let nameShorten = data.fullName.toUpperCase().split(' ').map(word => word[0]).join("");
        let backgroundColor = generateLightColorHex();
        saveToLocal({...data, nameShorten, image:null, backgroundColor, followers:[], following:[], likedPosts:[]});
        reset({ fullName: '', email: '',  username: '', password: ''});
    }

    function saveToLocal(newUser){
        let allUsers;
        if(localStorage.getItem('allUsers') === null){
            allUsers = [];
        }else{
            allUsers = JSON.parse(localStorage.getItem('allUsers'));
        }
        allUsers.push(newUser);
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
        navigate('/login');
    }

    function isEmailUnique(email){
        let isUnique = true;
        let allUsers;
        if(localStorage.getItem('allUsers') === null){
            allUsers = [];
        }else{
            allUsers = JSON.parse(localStorage.getItem('allUsers'));
        }
        allUsers.forEach((user)=> {
            if(email === user.email){
                isUnique = 'email already exist';
            }
        })
        return isUnique;
    }

    function isUsernameUnique(username){
        let isUnique = true;
        let allUsers;
        if(localStorage.getItem('allUsers') === null){
            allUsers = [];
        }else{
            allUsers = JSON.parse(localStorage.getItem('allUsers'));
        }
        allUsers.forEach((user)=> {
            if(username === user.username){
                isUnique = 'username already exist';
            }
        })
        return isUnique;
    }

	return (
        <div className="flex items-center justify-center h-[100vh] w-[100vw]">
        <i className="fa-brands fa-twitter fixed top-[30px] left-[30px] text-5xl cursor-pointer text-[rgba(253,253,253,1)] bg-[rgba(35,64,143,1)] p-[7px] rounded-[50%]" onClick={()=> navigate("/")}></i>
		<form className="w-[30%] bg-[#e0f2fe] p-[30px] sm:w-[80%] md:w-[60%] lg:w-[40%]" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-center text-2xl mb-[15px] font-bold cursor-default">Register</h1>
            <div className="mb-[22px]">
                <label className="text-md font-semibold w-full">Full name:<br/>
                <input type="text" placeholder="Full name" {...register("fullName", {
                    required: "fullname required",
                    pattern: {
                    value: /^(?!_)(?!\[)(?!\])(?!\\)(?!\^)[a-zA-z][a-zA-Z\s]*$/,
                    message: "Name should only contain letters",
                  },
                })} className="outline-0 pl-[8px] h-[40px] w-full font-normal" />
                </label><br/>
                {errors.fullName && (
                    <small className="text-[#dc2626]">
                        {errors.fullName.message}
                    </small>
                )}
            </div>

            <div className="mb-[22px]">
                <label className="text-md font-semibold w-full">Email:<br/>
                <input type="text" placeholder="Email" {...register("email", {
                    required: "email required",
                    pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "enter a valid email"
                    },
                    validate: isEmailUnique,
                })} className="outline-0 pl-[8px] h-[40px] w-full font-normal" />
                </label><br/>
                {errors.email && (
                    <small className="text-[#dc2626]">
                        {errors.email.message}
                    </small>
                )}
            </div>

            <div className="mb-[22px]">
                <label className="text-md font-semibold w-full">Username:<br />
                <input type="text" placeholder="Username" {...register("username", {
                    required: "username required",
                    pattern: {
                        value: /^(?!_)(?!\[)(?!\])(?!\\)(?!\^)[a-zA-Z0-9]*$/,
                        message: "only alphabets and numbers allowed and no space",
                    },
                    minLength: {
                        value: 6,
                        message: "Minimum Required length is 6",
                    },
                    maxLength: {
                        value: 10,
                        message: "Maximum allowed length is 10",
                    },
                    validate: isUsernameUnique,
                })} className="outline-0 pl-[8px] h-[40px] w-full font-normal" />
                </label><br />
                {errors.username && (
                    <small className="text-[#dc2626]">
                        {errors.username.message}
                    </small>
                )}
            </div>

            <div className="mb-[22px]">
                <label className="text-md font-semibold w-full">Password:<br />
                <input type="password" placeholder="Password" {...register("password", {
                    required: "password required",
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]+)$/,
                        message: "Password must contain lowercase, uppercase, number and special character",
                    },
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                    },
                })} className="outline-0 pl-[8px] h-[40px] w-full font-normal" />
                </label><br />
                {errors.password && (
                    <small className="text-[#dc2626]">
                        {errors.password.message}
                    </small>
                )}
            </div>

            <input type="submit" className="bg-[#0284c7] py-[10px] px-[15px] rounded-md cursor-pointer text-white font-semibold hover:bg-[#0369a1]" />
            <div className="text-sm font-semibold mt-[10px] text-[#0284c7] hover:text-[#0369a1] hover:[&>*]:border-b-[1px] hover:[&>*]:border-[#0369a1]"><Link to="/login">Already have an account?</Link></div>
        </form>
        </div>
	)
}

export default Register;