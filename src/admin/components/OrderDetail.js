import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderDetail = () => {
    const [orderDetail, setOrderDetail] = useState(null)
    const [order, setOrder] = useState(null)
    const [customer, setCustomer] = useState([]);

    const { id } = useParams()

    const fetchOrderDetail = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/order/${id}`);

            console.log('order detail', response.data)
            setOrderDetail(response.data.orderDetails)
            setOrder(response.data.order)
            setCustomer(response.data.users)

        } catch (error) {
            console.error('Error fetching ', error);
        }
    }

    useEffect(() => {
        document.title = 'Order Detail';
        fetchOrderDetail()
    }, [id])

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const handleProcess = (id) => {
        axios.post(`http://127.0.0.1:8000/api/order/${id}`)
            .then(response => {
                console.log(response);
                if (response.data && response.data.message) {
                    toast.success(response.data.message);
                    fetchOrderDetail();
                } else {
                    toast.error('Invalid response from the server');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('An error occurred while processing the order.');
                }
            });
    }

    const handlePending = (id) => {
        axios.post(`http://127.0.0.1:8000/api/order/pending-order/${id}`)
            .then(response => {
                console.log(response);
                if (response.data && response.data.message) {
                    toast.success(response.data.message);
                    fetchOrderDetail();
                } else {
                    toast.error('Invalid response from the server');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('An error occurred while pending the order.');
                }
            });
    }

    const handleBoom = (id) => {
        axios.post(`http://127.0.0.1:8000/api/order/boom-order/${id}`)
            .then(response => {
                console.log(response);
                if (response.data && response.data.message) {
                    toast.success(response.data.message);
                    fetchOrderDetail();
                } else {
                    toast.error('Invalid response from the server');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('An error occurred while pending the order.');
                }
            });
    }


    if (orderDetail === null || order === null) {
        return <p>Loading...</p>; // or display an error message
    }

    return (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col mb-4">
                <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Đơn hàng {order.order_code}</h1>
                <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600"> {formatDate(order.date)} </p>
                <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600"> Trạng thái đơn hàng: {order.status} </p>
            </div>
            <div className="bg-white dark:bg-gray-800 w-full flex justify-between items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800 mb-4">Khách hàng: {customer.name} - {customer.email }</h3>
                <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600"> Người nhận: {order.receiver} - {order.email_receiver} </p>
                <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600"> Nơi nhận: {order.address_receiver} </p>
                <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600"> SĐT nhận: {order.phone_receiver} </p>
            </div>

            <div className="relative overflow-x-auto mt-5">
                <table className="w-full text-sm text-center rtl:text-center text-gray-500 dark:text-gray-400">
                    <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetail.map((orderData) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {orderData.book.id}
                                </th>
                                <td className="px-6 py-4 w-full md:w-40">
                                    <img className="w-full hidden md:block" src={`http://127.0.0.1:8000/images/${orderData.book.image[0].image_path}`} alt={orderData.book.name} />
                                </td>
                                <td className="px-6 py-4">
                                    {orderData.book.name}
                                </td>
                                <td className="px-6 py-4">
                                    {orderData.quantity}
                                </td>
                                <td className="px-6 py-4">
                                    {new Intl.NumberFormat('en-US').format(orderData.price)} đ
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          
            <div className="flex justify-start item-start space-y-2 flex-col mt-5 mb-5">
                <p1 className="text-xl dark:text-white lg:text-2xl font-semibold leading-7 lg:leading-9 text-gray-800">Tổng thành tiền: {new Intl.NumberFormat('en-US').format(order.total)} đ</p1>
            </div>
            <div className="flex flex-row justify-between items-center">
                <button
                    type="button"
                    onClick={() => handleProcess(order.id)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
              focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 
              uppercase whitespace-nowrap mb-2"
                >
                    Xác nhận
                </button>
                <button
                    type="button"
                    onClick={() => handlePending(order.id)}
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none 
              focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 
              dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 
              uppercase whitespace-nowrap mb-2"
                >
                    Chưa xác nhận
                </button>
                <button
                    type="button"
                    onClick={() => handleBoom(order.id)}
                    className="text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none 
              focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2 
              dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800 
              uppercase whitespace-nowrap mb-2"
                >
                    Bùng hàng
                </button>
            </div>

        </div>
    )
}

export default OrderDetail