import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const OrderDetail = () => {
    const [orderDetail, setOrderDetail] = useState(null)
    const [order, setOrder] = useState(null)

    const { id } = useParams()

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/order/${id}`);

                console.log('order detail', response.data)
                setOrderDetail(response.data.orderDetails)
                setOrder(response.data.order)

            } catch (error) {
                console.error('Error fetching ', error);
            }
        }
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

    if (orderDetail === null || order === null) {
        return <p>Loading...</p>; // or display an error message
    }

    return (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col">
                <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Đơn hàng {order.order_code}</h1>
                <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600"> {formatDate(order.date)} </p>
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
            <div className="flex justify-start item-start space-y-2 flex-col mt-5">
                <p1 className="text-xl dark:text-white lg:text-2xl font-semibold leading-7 lg:leading-9 text-gray-800">Tổng thành tiền: {new Intl.NumberFormat('en-US').format(order.total)} đ</p1>
            </div>

        </div>
    )
}

export default OrderDetail