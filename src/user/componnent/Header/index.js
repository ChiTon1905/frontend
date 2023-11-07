import React  from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {BiUserCircle} from 'react-icons/bi'

import Dropdown from '../Dropdown/dropdown';

import { useCategory } from '../../../Contexts/CategoryContext';

const navigations = [
    {
        name: 'Sản Phẩm',
        path: '/products'
    }
]

const Header = () => {

    const { categories, setCategories } = useCategory()
    
    if (categories.length === 0) {
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
                <Dropdown cats = { categories }/>
                    {
                        navigations.map((navigation, index) => {
                            return (
                                <Link  key={index} to={navigation.path} className="mr-5 hover:text-gray-900">{navigation.name}</Link>
                            )
                        })
                    }
                </nav>
                <div className="ml-5 flex w-[30%] items-center justify-between">
                    <input
                        type="search"
                        className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none motion-reduce:transition-none dark:border-neutral-500 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon2" />

                    <span
                        className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                        id="basic-addon2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5">
                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd" />
                        </svg>
                    </span>
                </div>
                <Link to={'#'} className="inline-flex items-center py-2 px-3 text-2xl">
                    <AiOutlineShoppingCart />
                </Link>
                <Link to='/login' className="inline-flex items-center py-2 px-3 text-xl">
                    Sign in
                </Link>
            </div>
        </header>
    )
}
export default Header
