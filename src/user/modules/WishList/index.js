import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-js-pagination';


import { useUser } from '../../../Contexts/UserContext'

import axios from 'axios'

const WishList = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [wishlist, setWishList] = useState([])

    const {
        user
    } = useUser()

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/wishlist', {
                    params: {
                        user_id: user.id,
                        page: currentPage
                    }
                });
                console.log('respone', response.data);
                setWishList(response.data.wishlist);

            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };
        document.title = 'Wishlist';
        fetchWishlist();
    }, [currentPage]);
    console.log('wishlist-index', wishlist);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        console.log('Current Page:', pageNumber);
    };


    if (wishlist.length === 0) {
        return <div>Loading</div>
    } else
        return (
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col justify-start w-full mb-20">
                        <h2 className="text-xl text-yellow-500 tracking-widest font-medium title-font uppercase mb-1">
                            Danh sách yêu thích</h2>
                        <hr className='mt-5 text-gray-600 w-auto '>
                        </hr>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {wishlist.data.map((books) => (
                            <div className="lg:w-1/4 md:w-1/2 p-4 w-full mb-4 cursor-pointer"
                                key={books.book.id} >
                                <Link to={`/books/${books.book.id}`} className="block relative h-48 rounded overflow-hidden">
                                    <img
                                        alt={books.book.name}
                                        className="object-contain object-center w-full h-full block"
                                        src={`http://127.0.0.1:8000/images/${books.book.image[0].image_path}`} />
                                </Link>
                                <div className="mt-4">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">{books.book.categories.name}</h3>
                                    <h2 className="text-gray-900 title-font text-xl font-medium">{books.book.name}</h2>
                                    <p className="mt-1 text-ellipsis font-semibold">{books.book.price - (books.book.price * books.book.promotion.discount)} đ</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div >
                        <ReactPaginate
                            activePage={currentPage}
                            itemsCountPerPage={wishlist.per_page}
                            totalItemsCount={wishlist.total}
                            pageRangeDisplayed={5}
                            onChange={handlePageChange}
                            innerClass='flex justify-center items-center'
                            itemClass='mr-5 hover:text-blue-500'
                        />
                    </div>
                </div>
            </section>
        )
}

export default WishList