import React from 'react'
import { useUser } from '../../../Contexts/UserContext'

const FormUserCreate = () => {
    const {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        passwordConfirmation,
        setPasswordConfirmation,
        handleNameChange,
        handleEmailChange,
        handlePasswordChange,
        handlePasswordConfirmationChange,
        isValidEmail,
        isValidName,
        isValidPassword,
        isValidPasswordConfirmation,
        handleCreateUser
    } = useUser()
    return (
        <div>
            <form className='mt-5 mr-5 ml-5'>
                <div className='mb-6'>
                    <label htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Name
                    </label>
                    <input type="name" id="Name" onChange={handleNameChange} value={name}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập tên" required />
                            {
                        !isValidName && 
                        <p className='text-red-500 text-xs'>Name should be at least 3 characters long</p>
                        }

                </div>
                <div className='mb-6'>
                    <label htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        email
                    </label>
                    <input type="email" id="email" onChange={handleEmailChange} value={email}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập email" required />
                        {!isValidEmail && <p className='text-red-500 text-xs'>Please enter a valid email address.</p>}
        
                </div>
                <div className='mb-6'>
                    <label htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        password
                    </label>
                    <input type="password" id="password" onChange={handlePasswordChange} value={password}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập lại mật khẩu" required />
                         {
                        !isValidPassword && 
                        <p className='text-red-500 text-xs'>Password should be at least 8 characters long</p>
                        }
                </div>
                <div className='mb-6'>
                    <label htmlFor="passwordConfirmed"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Nhập lại mật khẩu
                    </label>
                    <input type="password" id="password" onChange={handlePasswordConfirmationChange} value={passwordConfirmation}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập lại mật khẩu" required />
                         {
                        isValidPasswordConfirmation === false && 
                        <p className='text-red-500 text-xs'>Password confirmation does not match</p>
                        }
                </div>
                <div className='mb-4 mr-5 '>
                    <button
                        type="submit"
                        onClick={handleCreateUser}
                        className=" text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none 
            focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 
            text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 uppercase">
                        Lưu
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormUserCreate