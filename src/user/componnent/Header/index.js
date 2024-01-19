import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { CiSearch } from "react-icons/ci";

import axios from 'axios';

import Dropdown from '../Dropdown/dropdown';

import { useCategory } from '../../../Contexts/CategoriesContext';
import { useUser } from '../../../Contexts/UserContext';
import { useSearch } from '../../../Contexts/SearchContext';

const navigations = [
    {
        name: 'Sản Phẩm',
        path: '/products'
    }
]

const Header = () => {

    const { category, setCategory } = useCategory()
    const { user, setUser, handleLogout } = useUser()

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const { state, dispatch } = useSearch();
    const { search } = state;
    const [loading, setLoading] = useState(false);


    const handleSearchChange = (searchTerm) => {
        dispatch({ type: 'SET_SEARCH', payload: searchTerm });
    };

    const handleSearchClick = async () => {
        try {
            setLoading(true)
            const respone = await axios.post('http://127.0.0.1:8000/api/search', { search })
                .then(response => {
                    console.log(response.data)
                    dispatch({ type: 'SET_BOOKS', payload: response.data.data })
                    setLoading(false)
                })
        } catch (error) {
            console.error('error fetching', error)
            setLoading(false)
        }
    }




    if (category.length === 0) {
        return <div>Loading</div>
    }

    return (
        <header className="text-gray-600 body-font shadow-lg">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link to='/' className="flex title-font  font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <span className="ml-3 text-xl ">
                        Bookstore
                    </span>
                </Link>
                <nav className="md:mr-auto ml-5 flex flex-wrap items-center text-base justify-center">
                    <Dropdown cats={category} />
                    <Link
                        to='/search'
                        className="mr-5 hover:text-gray-900"
                    >
                        Sản phẩm
                    </Link>
                </nav>
                <div className="ml-5 flex w-[30%] items-center justify-between">
                    <input
                        type="search"
                        className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none motion-reduce:transition-none dark:border-neutral-500 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon2"
                        value={search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />

                    <span
                        className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                        id="basic-addon2">
                        <Link
                            to='/search'
                            className="inline-flex items-center py-2 pr-3 text-2xl"
                            onClick={handleSearchClick}
                        >
                            <CiSearch />
                        </Link>
                    </span>
                </div>
                <Link to="/cart" className="inline-flex items-center py-2 px-3 text-2xl">
                    <AiOutlineShoppingCart />
                </Link>
                {
                    user ? (
                        <div className="relative inline-block text-left items-center py-2 px-3 text-xl">
                            <div>
                                <button
                                    onClick={toggleDropdown}
                                    className="inline-flex justify-center w-full px-4 py-2 "
                                >
                                    {user.name}
                                </button>
                            </div>
                            {isOpen && (
                                <div className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                    <div
                                        className="py-1"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="options-menu"
                                    >
                                        <Link
                                            to="/userinfo"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                                            role="menuitem"
                                        >
                                            Thông tin người dùng
                                        </Link>
                                        <Link
                                            to="/orderhistory"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                                            role="menuitem"
                                        >
                                            Quản lý đơn hàng
                                        </Link>
                                        <Link
                                            to="/wishlist"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                                            role="menuitem"
                                        >
                                            Danh sách yêu thích
                                        </Link>
                                        <Link
                                            to="/login"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                                            role="menuitem"
                                            onClick={handleLogout}
                                        >
                                            Đăng xuất
                                        </Link>

                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to='/login' className="inline-flex items-center py-2 px-3 text-xl hover:text-blue-500">
                            Đăng nhập
                        </Link>
                    )
                }

            </div>
        </header>
    )
}
export default Header
