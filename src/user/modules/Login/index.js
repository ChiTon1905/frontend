
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useUser } from '../../../Contexts/UserContext'

import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const {
        handleSubmit,
        email,
        setEmail,
        password,
        setPassword,
        user,
        setUser,
        updateUser,
        name,
        setName,
        address, 
        setAddress,
        phone, 
        setPhone,
        genre, 
        setGenre
    } = useUser()

    console.log(email, 'email')

    console.log(password, 'password')

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Login'
    },[])

    const googleLogin = useGoogleLogin({
        onSuccess: async tokenResponse => {
            console.log(tokenResponse);
            // fetching userinfo can be done on the client or the server
            const userInfo = await axios
                .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                })
                .then(res => res.data);

            console.log(userInfo);

            const responseUser = await axios.post('http://127.0.0.1:8000/api/save-google-user', userInfo);

            console.log('user-google-save', responseUser.data)
            localStorage.setItem('token', responseUser.data.token)
            localStorage.setItem('user', JSON.stringify(responseUser.data.user));

            setUser(JSON.parse(localStorage.getItem('user')))

            navigate('/')
        }
    })


    return (
        <section className="my-auto dark:bg-gray-900">
            <div className="mt-36 mb-36 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" value={email}
                                    className="bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                                dark:focus:border-blue-500" placeholder="name@gmail.com" required=""
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" value={password}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg f
                                ocus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                                 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                  dark:focus:border-blue-500" required=""
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember"
                                            aria-describedby="remember" type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded 
                                        bg-gray-50 focus:ring-3 focus:ring-primary-300 
                                        dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600
                                         dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember"
                                            className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <Link to="#"
                                    className="text-sm font-medium text-primary-600 
                                hover:underline dark:text-primary-500">Forgot password?</Link>
                            </div>
                            <button type="submit" onClick={handleSubmit}
                            className="w-full 
                            text-white bg-primary-600 hover:bg-primary-700 
                            focus:ring-4 focus:outline-none focus:ring-primary-300 
                            font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:
                            bg-primary-600 dark:hover:bg-primary-700
                             dark:focus:ring-primary-800">
                                Sign in
                            </button>

                            <button onClick={googleLogin} className="w-full 
                            text-white bg-orange-600 hover:bg-orange-700 
                            focus:ring-4 focus:outline-none focus:ring-orange-300 
                            font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:
                            bg-orange-600 dark:hover:bg-orange-700
                             dark:focus:ring-orange-800">
                                Sign in with Google
                            </button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?
                                <Link to="/register"
                                    className="font-medium text-primary-600 
                                hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login