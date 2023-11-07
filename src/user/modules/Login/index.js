import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='mt-10 mb-10'>
            <div className="flex justify-center">
                <div className="flex flex-col justify-center items-center md:flex-row shadow rounded-xl max-w-7xl w-[90%]  m-2">
                    <div className=" w-full md:w-3/4">
                        <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 py-4">
                            {/* Login using Social accounts */}
                            <h1 className="font-semibold text-xl md:text-5xl text-gray-600 m-2">Login to your account</h1>
                        </div>
                        <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
                            <div className="">
                                <input type="text" placeholder="User Name"
                                    className=" bg-gray-100 rounded-lg px-5 py-2 focus:border 
                                    border-blue-600 focus:outline-none text-black 
                                    placeholder:text-gray-600 placeholder:opacity-50 
                                    font-semibold md:w-72 lg:w-[340px]"/>
                            </div>
                            <div className="">
                                <input type="password" placeholder="Password"
                                    className=" bg-gray-100 
                                    rounded-lg px-5 py-2 
                                    focus:border border-blue-600 
                                    focus:outline-none text-black 
                                    placeholder:text-gray-600 placeholder:opacity-50 
                                    font-semibold md:w-72 lg:w-[340px]"/>
                            </div>
                            <div className="flex items-center justify-between ">
                                <div className="flex items-center h-5">
                                    <input id="remember" 
                                    aria-describedby="remember" 
                                    type="checkbox" 
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 
                                    dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 
                                    dark:ring-offset-gray-800" required=""/>
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                                <Link to="#" className="text-sm font-medium 
                                text-primary-600 hover:underline 
                                dark:text-primary-500 ml-36">Forgot password?</Link>
                            </div>
                        </div>

                        <div className="text-center mt-7">
                            <button
                                className=" px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-gradient-to-l 
                                from-blue-400 to-emerald-400  font-medium m-2 mb-6 ">Sign
                                In</button>
                        </div>

                    </div>
                    <div
                        className="h-[100%] w-full md:w-1/3  bg-gradient-to-l from-blue-400 to-emerald-400  items-center flex justify-center">

                        <div className="text-white text-base font-semibold text-center my-10 space-y-2 m-2">
                            <h1 className="text-5xl">New Here?</h1>
                            <h1 className="">Sign Up and discover new oppurtinities here</h1>
                            <Link to='/register'>
                                <button className="bg-white rounded-2xl px-4 text-emerald-400 py-1">Sign Up</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login