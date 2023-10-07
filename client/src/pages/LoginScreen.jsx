import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useLoginMutation} from "../slices/userApiSlices";
import {saveCredentials} from "../slices/authSlice";
import {toast} from "react-toastify";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LoginScreen = () => {

    const [userInfo,setUserInfo] = useState({
        email: "",
        password: ""
    })

    const dispatch = useDispatch();
    const [login, {isLoading}] = useLoginMutation();
    const user = useSelector((state)=> state.auth.userInfo);
    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';
    
    useEffect(()=>{
        if(user){
            navigate(redirect)
        }
    },[navigate,redirect,user])

    const handleUserInfo = (e) => {
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          [e.target.name]: e.target.value,
        }));
      };


    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const res = await login({...userInfo}).unwrap();
            dispatch(saveCredentials({...res}));   
            navigate("/")
        }catch(err){
            toast.error(err?.data?.message || err.error || err?.data?.err)
        }
    }
      
    
  return (
    <div>
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[87vh] lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in into your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input
                        type="email"
                        name="email"
                        id="email"
                        value={userInfo.email}
                        onChange={(e)=> handleUserInfo(e)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required=""
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input
                        type="password"
                        name="password"
                        id="password"
                        value={userInfo.password}
                        onChange={(e)=> handleUserInfo(e)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="••••••••"
                        required=""
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                    </div>
                    <button
                        type="submit"
                        onClick={e => handleSubmit(e)}
                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        Sign in
                    </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Have an account?{' '}
                        <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                            Sign Up
                        </Link>
                    </p>

                    </form>
                </div>
                </div>
            </div>
        </section>

    </div>
  )
}

export default LoginScreen