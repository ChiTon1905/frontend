import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { useProduct } from '../../../Contexts/ProductContext'

const Product = () => {
    const { id } = useParams()

    const [product, setProduct] = useState([])
    console.log(id, 'id', product)
    const [images, setImages] = useState([])

    const [activeimg, setActiveImage] = useState(null)

    const { amount, setAmount } = useProduct()

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`)
            const data = await response.json()
            console.log(data.data)

            setProduct(data.data)

            setImages(data.data.attributes.image);
            setActiveImage(data.data.attributes.image[0].image_path);

        }
        fetchProduct()
    }, [id])

    const IncreaseAmount = (prev) => {
        setAmount(prev + 1)
    }

    const DecreaseAmount = (prev) => {
        if (prev > 0)
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

    //handlecart

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
                            <span className='ml-2 font-bold uppercase text-gray-900'>
                                {product.attributes.publisher?.name}
                            </span>
                            <div className='mt-2'>
                                Hình thức bìa:
                                <span className='ml-2 font-bold uppercase text-gray-900'>
                                    {product.attributes.booklayout?.name}
                                </span>
                            </div>
                        </div>
                        <div className='ml-12 font-medium'>
                            Tác giả:
                            {
                                bookauthors.map((bookauthor, index) => (
                                    <span key={bookauthor.author.id} className='ml-2 font-bold uppercase text-gray-900'>
                                        {bookauthor.author.name}
                                        {index < bookauthors.length - 1 && ', '}
                                    </span>
                                ))
                            }
                            <div className='mt-2'>
                                Ngôn ngữ:
                                <span className='ml-2 font-bold uppercase text-gray-900'>
                                    {product.attributes.language?.name}
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className="leading-relaxed">
                        {product.attributes.description}</p>
                    <div className="flex flex-nowrap justify-start items-center">
                        <div className="title-font font-medium text-base text-gray-900 line-through mr-5">
                            ${product.attributes.price}
                        </div>
                        <div className="title-font font-medium text-2xl text-red-500 mr-40">
                            ${
                                product.attributes.price - product.attributes.price * product.attributes.promotion.discount
                            }
                            &nbsp;
                            -
                            {
                                product.attributes.promotion.discount * 100
                            }%
                        </div>
                        <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                            </svg>
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
                            onClick={() => { }}
                        >
                            Buy it now</button>
                        <button className="flex mt-5 border border-indigo-500 py-2 px-6 focus:outline-none
                                 hover:bg-indigo-600 hover:text-white rounded"
                            onClick={() => { }}
                        >
                            Add to cart</button>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Product