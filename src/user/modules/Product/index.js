import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { useProduct } from '../../../Contexts/ProductContext'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../../Contexts/UserContext'
import { FaHeart } from "react-icons/fa";
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Product = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState([])
    console.log(id, 'id', product)
    const [images, setImages] = useState([])

    const [activeimg, setActiveImage] = useState(null)

    const { amount, setAmount } = useProduct()

    const { pricePromotion, setPricePromotion } = useState(0)

    const [isInWishlist, setIsInWishlist] = useState(false);
    const {
        user
    } = useUser()

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`)
            const data = await response.json()
            console.log(data.data)

            setProduct(data.data)

            setImages(data.data.attributes.image);
            setActiveImage(data.data.attributes.image[0].image_path);

            document.title = `${data.data.attributes.name}`;

        }
        const checkWishlist = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/wishlist', {
                    params: {
                        user_id: user.id
                    }
                });

                const wishlistProducts = response.data.wishlist.data.map(item => item.book.id);
                setIsInWishlist(wishlistProducts.includes(id));


            } catch (error) {
                console.error('Error checking wishlist:', error);
            }
        };
        fetchProduct()
        checkWishlist();
    }, [id])

    const IncreaseAmount = (prev) => {
        if (prev < product.attributes.quantity)
            setAmount(prev + 1)
    }

    const DecreaseAmount = (prev) => {
        if (prev > 1)
            setAmount(prev - 1)
    }

    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 250


        const currentIndex = images.findIndex((img) => img.image_path === activeimg)
        console.log('Current Index:', currentIndex);
        if (currentIndex !== -1) {
            // Check if the current image is found in the images array
            const newIndex = (currentIndex - 1 + images.length) % images.length;
            const newActiveImage = images[newIndex].image_path;
            setActiveImage(newActiveImage);
        }
        else {
            // Handle the case where activeImage is not found in the images array
            if (images.length > 0) {
                setActiveImage(images[0].image_path);
            }
        }
    }


    const slideRight = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 250

        const currentIndex = images.findIndex((img) => img.image_path === activeimg);

        if (currentIndex !== -1) {
            // Check if the current image is found in the images array
            const newIndex = (currentIndex + 1) % images.length;
            const newActiveImage = images[newIndex].image_path;
            setActiveImage(newActiveImage);
        } else {
            // Handle the case where activeImage is not found in the images array
            if (images.length > 0) {
                setActiveImage(images[0].image_path);
            }
        }
    }

    const handleCart = (product, redirect) => {
        console.log(product)
        const cart = JSON.parse(localStorage.getItem('cart')) || []
        const isProductExist = cart.find(item => item.id === product.id)
        if (amount > product.attributes.quantity) {
            toast('Đặt quá số lượng sách')
        }
        if (isProductExist) {
            const updateCart = cart.map(item => {
                if (item.id === product.id) {
                    if ((item.quantity + amount) > product.attributes.quantity) {
                        toast('Đặt quá số lượng sách')
                    } else {
                        toast('Sản phẩm đã thêm vào giỏ hàng')
                        return {
                            ...item,
                            quantity: item.quantity + amount
                        }
                    }
                }
                return item
            })
            updateCart.forEach(item => {
                const originalPrice = item.attributes.price;
                const discountPercentage = item.attributes.promotion.discount;
                item.price = originalPrice - originalPrice * discountPercentage;
            });
            localStorage.setItem('cart', JSON.stringify(updateCart))
        } else {
            const discountedPrice = product.attributes.price - product.attributes.price * product.attributes.promotion.discount;
            localStorage.setItem('cart', JSON.stringify([...cart, { ...product, quantity: amount, price: discountedPrice }]));
            toast('Sản phẩm đã thêm vào giỏ hàng')
        }
        setAmount(1)
        if (redirect) {
            navigate('/cart')
        }
    }

    const handleCreateOrDeleteItemWishList = async () => {
        if (user) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/wishlist/createordelete', {
                    user_id: user.id,
                    book_id: product.id
                });

                console.log('wishlist', response.data);
                setIsInWishlist(previousState => !previousState);
                toast.success(response.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (error) {
                console.error('Error:', error.message);
            }
        } else {
            toast.error('Bạn phải đăng nhập mới yêu thích được', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    if (!Object.keys(product).length > 0) return <div>Loading...</div>

    const bookauthors = product.attributes.authors.map((author, index) => (
        { author }
    ))


    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="flex flex-col justify-between lg:flex-row gap-16">
                <div className="flex flex-col gap-6 lg:w-2/4 mt-5">
                    <img alt={product.attributes.name} className="lg:w-1/2 w-full lg:h-auto max-h-[600px] h-64 
                    object-contain object-center rounded ml-44" src={`http://127.0.0.1:8000/images/${activeimg}`} />

                    <div className='flex flex-row justify-center h-24 mt-5 mb-10 '>
                        <BsChevronCompactLeft
                            size='40'
                            onClick={slideLeft}
                            className='ml-24 mr-5 mt-8 opacity-50 cursor-pointer hover:opacity-100' />
                        <div id='slider' className=' flex flex-row w-full h-32 overflow-x-scroll  scroll whitespace-nowwarp scroll-smooth scrollbar-hide'>
                            {
                                images.map((image) => (
                                    <img
                                        key={image.id}
                                        src={`http://127.0.0.1:8000/images/${image.image_path}`}
                                        alt=''
                                        className='w-24 h-24 mb-5 rounded-md cursor-pointer 
                                    hover:scale-125 ease-in-out duration-300 inline-block'
                                        onClick={() => setActiveImage(image.image_path)} />
                                ))
                            }
                        </div>
                        <BsChevronCompactRight
                            size='40'
                            className='opacity-50 cursor-pointer hover:opacity-100 mt-8'
                            onClick={slideRight}
                        />
                    </div>
                </div>
                <div className="flex flex-col lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 mr-10">
                    <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">{product.attributes.category?.name}</h2>
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.attributes.name}</h1>
                    <div className="flex mb-4">
                        <div className='font-medium'>
                            Nhà xuất bản:
                            <span className='ml-2 font-bold uppercase text-gray-900 hover:text-blue-500'>
                                <Link to={`http://localhost:3000/publishers/${product.attributes.publisher?.id}`}>
                                    {product.attributes.publisher?.name}
                                </Link>
                            </span>
                            <div className='mt-2'>
                                Hình thức bìa:
                                <span className='ml-2 font-bold uppercase text-gray-900 hover:text-blue-500'>
                                    <Link to={`http://localhost:3000/booklayouts/${product.attributes.booklayout?.id}`}>
                                        {product.attributes.booklayout?.name}
                                    </Link>
                                </span>
                            </div>
                        </div>
                        <div className='ml-12 font-medium'>
                            Tác giả:
                            {
                                bookauthors.map((bookauthor, index) => (
                                    <span key={bookauthor.author.id} className='ml-2 font-bold uppercase text-gray-900 hover:text-blue-500'>
                                        <Link to={`http://localhost:3000/authors/${bookauthor.author?.id}`}>
                                            {bookauthor.author.name}
                                        </Link>
                                        {index < bookauthors.length - 1 && ', '}
                                    </span>
                                ))
                            }
                            <div className='mt-2'>
                                Ngôn ngữ:
                                <span className='ml-2 font-bold uppercase text-gray-900 hover:text-blue-500'>
                                    <Link to={`http://localhost:3000/languages/${product.attributes.language?.id}`}>
                                        {product.attributes.language?.name}
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className="leading-relaxed">
                        {product.attributes.description}</p>
                    <div className="flex flex-nowrap justify-start items-center">
                        <div className="title-font font-medium text-base text-gray-900 line-through mr-5">
                            {product.attributes.price} d
                        </div>
                        <div className="title-font font-medium text-2xl text-red-500 mr-40">
                            {
                                product.attributes.price - product.attributes.price * product.attributes.promotion.discount
                            } d
                            &nbsp;
                            -
                            {
                                product.attributes.promotion.discount * 100
                            }%
                        </div>
                        <button
                            onClick={handleCreateOrDeleteItemWishList}
                            className={`rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 hover:text-red-500 ${isInWishlist ? 'text-red-500' : ''}`}>
                            <FaHeart />
                        </button>
                    </div>
                    <div className='flex flex-row items-center'>
                        <span className='font-medium text-black'>Số lượng: &nbsp;</span>
                        <button
                            className='bg-gray-200 py-2 px-5 rounded-lg 
                                text-violet-800 text-xs'
                            onClick={() => DecreaseAmount(amount)}>
                            -
                        </button>
                        <span className='py-4 px-6 rounded-lg'>{amount}</span>
                        <button
                            className='bg-gray-200 py-2 px-5 rounded-lg 
                                text-violet-800 text-xs'
                            onClick={() => IncreaseAmount(amount)}>
                            +
                        </button>
                    </div>
                    <div className='flex flex-row item-center gap-12'>
                        <button className="flex mt-5 text-white bg-indigo-500 
                                border-0 py-2 px-6 focus:outline-none
                                 hover:bg-indigo-600 rounded mr-5"
                            onClick={() => handleCart(product, true)}
                        >
                            Buy it now</button>
                        <button className="flex mt-5 border border-indigo-500 py-2 px-6 focus:outline-none
                                 hover:bg-indigo-600 hover:text-white rounded"
                            onClick={() => handleCart(product)}
                        >
                            Add to cart</button>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default Product