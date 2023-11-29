import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-js-pagination';

import { useSearch } from '../../../Contexts/SearchContext'
import { useCategory } from '../../../Contexts/CategoriesContext'
import { useAuthor } from '../../../Contexts/AuthorsContext'
import { usePublishers } from '../../../Contexts/PublishersContext'
import { useBooklayouts } from '../../../Contexts/BooklayoutsContext'
import { useLanguages } from '../../../Contexts/LanguagesContext'

import { FaChevronDown } from "react-icons/fa6";

import axios from 'axios'

//sort
const sortOptions = [
    {
        label: 'Theo tên A -> Z',
        sortBy: 'name',
        sortOrder: 'asc'
    },
    {
        label: 'Theo tên  Z -> A',
        sortBy: 'name',
        sortOrder: 'desc'
    },
    {
        label: 'Giá Từ Thấp Đến Cao',
        sortBy: 'price',
        sortOrder: 'asc'
    },
    {
        label: 'Giá Từ Cao Đến Thấp',
        sortBy: 'price',
        sortOrder: 'desc'
    }
];

const Search = () => {
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    const { state, dispatch } = useSearch();
    const {
        categories,
        language,
        author,
        publisher,
        booklayout,
        search,
        sort_by,
        sort_order,
        books } = state;

    const { category, setCategory } = useCategory()
    const { authors, setAuthors } = useAuthor()
    const { publishers, setPublishers } = usePublishers();
    const { booklayouts, setBooklayouts } = useBooklayouts();
    const { languages, setLanguages } = useLanguages()


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/search',
                    {
                        categories,
                        author,
                        publisher,
                        booklayout,
                        language,
                        search,
                        sort_by,
                        sort_order,
                        page: currentPage,
                        per_page: state.perPage
                    })

                console.log(response.data)
                dispatch({ type: 'SET_BOOKS', payload: response.data.data })
                setTotalCount(response.data.total_count)

            } catch (error) {

                console.error('Error fetching books', error);

            }
        }
        fetchBooks()
    }, [categories, author, publisher, booklayout, language, search, sort_by, sort_order, currentPage, state.perPage, dispatch])


    const handleCategoriesChange = (value) => {
        dispatch({
            type: 'SET_CATEGORIES',
            payload: value,
        });
    };

    const handleAuhorChange = (value) => {
        dispatch({
            type: 'SET_AUTHOR',
            payload: value,
        });
    };

    const handlePublisherChange = (value) => {
        dispatch({
            type: 'SET_PUBLISHER',
            payload: value,
        });
    };

    const handleBooklayoutChange = (value) => {
        dispatch({
            type: 'SET_BOOKLAYOUT',
            payload: value,
        });
    };

    const handleLanguageChange = (value) => {
        dispatch({
            type: 'SET_LANGUAGE',
            payload: value,
        });
    };

    // Handle sort changes
    const handleSortChange = (sort_by, sort_order) => {
        dispatch({
            type: 'SET_SORT',
            payload: { sort_by, sort_order },
        });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='flex flex-warp mt-10 pb-14'>
            <section className='border border-gray-300 '>
                <div className='flex justify-between items-center '>
                    <p className='ml-20 mr-20 mt-4 flex text-xl font-extrabold  dark:text-white text-slate-900'>
                        Filter
                    </p>
                </div>
                <hr className='mt-5 bg-gray-300'>
                </hr>
                <div className='mt-2'>
                    {/* cac bang the loai */}
                    <div className='flex flex-col '>
                        <p className='text-gray-400 m-3 mt-4 uppercase'>
                            Category
                        </p>
                        {
                            category.map((cat) => (
                                <div className="flex items-center mb-4 ml-5" key={cat.id}>
                                    <input
                                        id={`category-${cat.id}`}
                                        type="radio"
                                        value={cat.attributes.cat_name}
                                        name="categories"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                            focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
                            focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        onChange={(e) => handleCategoriesChange(e.target.value)}
                                    />
                                    <label
                                        htmlFor={`category-${cat.id}`}
                                        className="ms-2 text-sm font-medium 
                            text-gray-900 dark:text-gray-300">
                                        {cat.attributes.cat_name}
                                    </label>
                                </div>
                            ))
                        }
                        <p className='text-gray-400 m-3 mt-4 uppercase'>
                            Authors
                        </p>
                        {
                            authors.map((author) => (
                                <div className="flex items-center mb-4 ml-5" key={author.id}>
                                    <input
                                        id={`author-${author.id}`}
                                        type="radio"
                                        value={author.attributes.name}
                                        name="default-radio-2"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                            focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
                            focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        onChange={(e) => handleAuhorChange(e.target.value)}
                                    />
                                    <label
                                        htmlFor={`author-${author.id}`}
                                        className="ms-2 text-sm font-medium 
                            text-gray-900 dark:text-gray-300">
                                        {author.attributes.name}
                                    </label>
                                </div>
                            ))
                        }
                        <p className='text-gray-400 m-3 mt-4 uppercase'>
                            Publishers
                        </p>
                        {
                            publishers.map((pub) => (
                                <div className="flex items-center mb-4 ml-5" key={pub.id}>
                                    <input
                                        id={`${pub.id}`}
                                        type="radio"
                                        value={pub.attributes.name}
                                        name="publisher"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                            focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
                            focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        onChange={(e) => handlePublisherChange(e.target.value)}
                                    />
                                    <label
                                        htmlFor={`${pub.id}`}
                                        className="ms-2 text-sm font-medium 
                            text-gray-900 dark:text-gray-300">
                                        {pub.attributes.name}
                                    </label>
                                </div>
                            ))
                        }
                        <p className='text-gray-400 m-3 mt-4 uppercase'>
                            Booklayouts
                        </p>
                        {
                            booklayouts.map((pub) => (
                                <div className="flex items-center mb-4 ml-5" key={pub.id}>
                                    <input
                                        id={`${pub.id}`}
                                        type="radio"
                                        value={pub.attributes.name}
                                        name="Booklayout"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                            focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
                            focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        onChange={(e) => handleBooklayoutChange(e.target.value)}
                                    />
                                    <label
                                        htmlFor={`${pub.id}`}
                                        className="ms-2 text-sm font-medium 
                            text-gray-900 dark:text-gray-300">
                                        {pub.attributes.name}
                                    </label>
                                </div>
                            ))
                        }
                        <p className='text-gray-400 m-3 mt-4 uppercase'>
                            Language
                        </p>
                        {
                            languages.map((pub) => (
                                <div className="flex items-center mb-4 ml-5" key={pub.id}>
                                    <input
                                        id={`${pub.id}`}
                                        type="radio"
                                        value={pub.attributes.name}
                                        name="languages"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                            focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
                            focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        onChange={(e) => handleLanguageChange(e.target.value)}
                                    />
                                    <label
                                        htmlFor={`${pub.id}`}
                                        className="ms-2 text-sm font-medium 
                            text-gray-900 dark:text-gray-300">
                                        {pub.attributes.name}
                                    </label>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
            <div>
                {
                    books.length > 0 ?
                        <section className="text-gray-600 body-font">
                            <div className="container px-5 pt-5 pb-14 mx-auto">
                                <div className="flex flex-wrap justify-between items-center w-full mb-20">
                                    <h2 className="text-xl text-yellow-500 tracking-widest font-medium title-font uppercase mb-1">
                                        Kết quả tìm kiếm - {totalCount}
                                    </h2>
                                    <div className="relative inline-block text-left">
                                        <div>
                                            <button
                                                onClick={toggleDropdown}
                                                className="inline-flex justify-center w-full px-4 py-2 mr-24 "
                                            >
                                                Sort By
                                                <FaChevronDown className="ml-3 mt-1" />
                                            </button>
                                        </div>
                                        {isOpen && (

                                            < div className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                                <div
                                                    className="py-1"
                                                    role="menu"
                                                    aria-orientation="vertical"
                                                    aria-labelledby="options-menu"
                                                >
                                                    {sortOptions.map((option, index) => (
                                                        <button
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            role="menuitem"
                                                            onClick={() => handleSortChange(option.sortBy, option.sortOrder)}
                                                        >
                                                            {option.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-wrap -m-4">
                                    {
                                        books.map((books) => {
                                            return (
                                                <div key={books.id} className="lg:w-1/4 md:w-1/2 p-4 w-full mb-4 border border-opacity-50 cursor-pointer">
                                                    <Link to={`/books/${books.id}`} className="block relative h-48 rounded overflow-hidden">
                                                        <img alt={books.attributes.name} className="object-contain object-center w-full h-full block"
                                                            src={`http://127.0.0.1:8000/images/${books.attributes.image[0].image_path}`} />
                                                    </Link>
                                                    <div className="mt-4">
                                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">{books.attributes.category?.name}</h3>
                                                        <h2 className="text-gray-900 title-font text-xl font-medium">{books.attributes.name}</h2>
                                                        <p className="mt-1 text-ellipsis font-semibold">{books.attributes.price - (books.attributes.price * books.attributes.promotion.discount )} đ</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </section>
                        :
                        <div>Loading....</div>
                }
                <div >
                    <ReactPaginate
                        activePage={currentPage}
                        itemsCountPerPage={state.perPage}
                        totalItemsCount={totalCount}
                        pageRangeDisplayed={5} 
                        onChange={handlePageChange}
                        innerClass='flex justify-center items-center'
                        itemClass='mr-5 hover:text-blue-500'
                    />
                </div>
            </div>
        </div >
    )
}

export default Search