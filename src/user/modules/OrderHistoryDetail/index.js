import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import { useUser } from '../../../Contexts/UserContext'

const OrderHistoryDetail = () => {
    const [orderHistoryDetail, setOrderHistoryDetail] = useState(null)
    const [order, setOrder] = useState(null)
    const [ total , setTotal ] = useState(0)
    const { id } = useParams()
    console.log('id:', id);

    const {
       user
    } = useUser()

    useEffect(() => {
        const fetchOrderDetailHistory = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/orderhistory/${id}`);

                console.log('order detail', response.data)
                setOrderHistoryDetail(response.data.orderDetails)
                setOrder(response.data.order)

                const totalPrice = response.data.orderDetails.reduce((total, item) => {
                    return total + (item.price * item.quantity);
                }, 0);

                setTotal(totalPrice)

            } catch (error) {
                console.error('Error fetching ', error);
            }
        }
        document.title = 'Order Detail History';
        fetchOrderDetailHistory()
    }, [id])

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    console.log('state', orderHistoryDetail)

    console.log('state order', order)

    

    if (orderHistoryDetail === null || order === null) {
        return <p>Loading...</p>; // or display an error message
    }

    return (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col">
                <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Đơn hàng {order.order_code} </h1>
                <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600"> {formatDate(order.date)} </p>
                <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">Trạng thái: {order.status} </p>
            </div>
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                        <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Đơn hàng</p>
                        {
                            orderHistoryDetail.map((orderData) => (
                                <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                    <div className="pb-4 md:pb-8 w-full md:w-40">
                                        <img className="w-full hidden md:block" src={`http://127.0.0.1:8000/images/${orderData.book.image[0].image_path}`} alt={orderData.book.name} />
                                    </div>
                                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                                            <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{orderData.book.name}</h3>
                                            <div className="flex justify-start items-start flex-col space-y-2">
                                                <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Thể loại: </span> {orderData.book.categories.name }</p>
                                                <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Bìa sách: </span> {orderData.book.booklayout.name }</p>
                                                <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Nhà xuất bản: </span> {orderData.book.publisher.name }</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between space-x-8 items-start w-full">
                                            <p className="text-base dark:text-white xl:text-lg leading-6"> {new Intl.NumberFormat('en-US').format(orderData.price)} đ<span className="text-red-300 line-through">{new Intl.NumberFormat('en-US').format(orderData.book.price)} đ</span></p>
                                            <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{orderData.quantity}</p>
                                            <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">{new Intl.NumberFormat('en-US').format(orderData.price * orderData.quantity)} đ</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Thanh toán</h3>
                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div className="flex justify-between w-full">
                                    <p className="text-base dark:text-white leading-4 text-gray-800">Thành tiền</p>
                                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{new Intl.NumberFormat('en-US').format(total)} đ</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Tổng cộng</p>
                                <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{new Intl.NumberFormat('en-US').format(total)} đ</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Khách hàng - {user.name}</h3>
                    <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                        <div className="flex flex-col justify-start items-start flex-shrink-0">
                            <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 7L12 13L21 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="cursor-pointer text-sm leading-5 ">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Người nhận</p>
                                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{order.receiver} - {order.email_receiver}</p>
                                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">Nơi nhận: {order.address_receiver}</p>
                                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">SĐT: {order.phone_receiver}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderHistoryDetail