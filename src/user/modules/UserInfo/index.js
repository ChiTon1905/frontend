import React, { useState, useEffect } from 'react'
import { useUser } from '../../../Contexts/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {

    const navigate = useNavigate();

    const {
        name,
        setName,
        email,
        setEmail,
        user,
        setUser,
        address,
        setAddress,
        phone,
        setPhone,
        updateUser,
        handlePhoneChange,
        handleAddressChange,
        handleNameChange,
        handleEmailChange,
        handlePasswordChange,
        handlePasswordConfirmationChange,
        isValidEmail,
        isValidName,
        isValidPassword,
        isValidPasswordConfirmation,
        isValidPhone,
        genre,
        setGenre
    } = useUser()

    console.log('name', name)

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setName(user.name);
            setAddress(user.address);
            setPhone(user.phone);
            setEmail(user.email);    
        }
      }, []);

    
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        if (!isValidEmail) {
            alert('Invalid email address');
            return;
        }
        if (!isValidName) {
            alert('Invalid name');
            return;
        }
        
        if (!isValidPhone) {
            alert('Invalid phone');
            return;
        }

        if(address === ''){
            alert('Invalid address');
            return;
        }

        axios.post(`http://127.0.0.1:8000/api/users/${user.id}`, {
            name: name,
            email: email,
            address: address,
            phone: phone,
            genre: genre
        })
            .then(response => {
                console.log('update user',response.data);
                navigate('/userinfo')
                alert('Thay doi thanh cong')
            })
            .catch(error => {
                console.error(error.response.data);
            });
    };

    return (
        <div className='flex flex-col bg-gray-250'>
            <div className='containter border rounded-lg mr-5 ml-5 mt-5 mb-5 justify-center bg-white'>
                <h1 className="block mb-2 ml-5 mt-5 items-center justify-center text-xl font-medium text-gray-900 dark:text-white uppercase">
                    thông tin người dùng
                </h1>
                <hr className='w-11/12 items-center justify-center ml-5'>
                </hr>
                <form className='mt-5 mr-5 ml-5'>
                    <div className='mb-6'>
                        <label htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Họ và tên
                        </label>
                        <input type="name" id="Name" onChange={handleNameChange} value={name}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Nhập họ và tên" required />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <input type="email" id="email" onChange={handleEmailChange} value={email}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="nhập email" required />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor="phone"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            SĐT
                        </label>
                        <input type="phone" id="phone" onChange={handlePhoneChange} value={phone}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="nhập sđt" required />
                    </div>
                    <div className=' flex flex-row'>
                        <label htmlFor="address"
                            className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                            Giới tính :
                        </label>
                        <div className="flex items-center mb-4 ml-5">
                            <input
                                id="male-radio"
                                type="radio"
                                value="Nam"
                                name="gender-radio"
                                checked={user && genre === 'Nam'}
                                onChange={(e) => setGenre(e.target.value)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 
                     dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 
                     dark:bg-gray-700 dark:border-gray-600 checked:border-blue-500"/>
                            <label
                                htmlFor="default-radio-1"
                                className="ms-2 text-base font-medium text-gray-900 dark:text-gray-300">
                                Nam
                            </label>
                        </div>
                        <div className="flex items-center mb-4 ml-5">
                            <input
                                id="female-radio"
                                type="radio"
                                value="Nữ"
                                name="gender-radio"
                                checked={user && genre === 'Nữ'}
                                onChange={(e) => setGenre(e.target.value)}  
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 
                                          dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 
                                         dark:bg-gray-700 dark:border-gray-600 checked:border-blue-500"/>
                            <label
                                htmlFor="default-radio-1"
                                className="ms-2 text-base font-medium text-gray-900 dark:text-gray-300">
                                Nữ
                            </label>
                        </div>
                    </div>
                    <div className='mb-6'>
                        <label htmlFor="address"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Địa chỉ
                        </label>
                        <input type="text" id="address" onChange={handleAddressChange} value={address}
                            className="bg-gray-50 border border-gray-300 text-gray-900 
                            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                            dark:focus:border-blue-500" placeholder="Nhập địa chỉ" required />
                    </div>
                    <div className='mb-4 mr-5 '>
                        <button
                            type="button"
                            onClick={ handleUpdateUser }
                            className=" text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none 
                    focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 
                    text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 uppercase">
                            Lưu thay đổi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserInfo