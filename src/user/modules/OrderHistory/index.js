import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ReactPaginate from 'react-js-pagination';
import { useUser } from '../../../Contexts/UserContext';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderHistory = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [perPage, setPerPage] = useState(1);
    const [orderHistory, setOrderHistory] = useState([])
    const { user } = useUser()
    const fetchOrderHistory = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/orderhistory', {
                params: {
                    user_id: user.id,
                    page: currentPage,
                },
            });

            console.log(response.data)
            setOrderHistory(response.data.order.data)
            setTotalPage(response.data.order.total)
            setPerPage(response.data.order.per_page)
            console.log('order', orderHistory)

        } catch (error) {

            console.error('Error fetching ', error);

        }
    }

    useEffect(() => {
       
        document.title = 'Order history';
        fetchOrderHistory()
    }, [currentPage])

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        console.log('Current Page:', pageNumber);
    };

    const handleDone = (id) => {
        axios.post(`http://127.0.0.1:8000/api/order/confirm-order/${id}`)
          .then(response => {
            console.log(response);
            if (response.data && response.data.message) {
              toast.success(response.data.message);
              fetchOrderHistory()
            } else {
              toast.error('Invalid response from the server');
            }
          })
          .catch(error => {
            console.error('Error:', error);
            if (error.response && error.response.data && error.response.data.message) {
              toast.error(error.response.data.message);
            } else {
              toast.error('An error occurred while done the order.');
            }
          });
      }

      const handleCancel = (id) => {
        axios.post(`http://127.0.0.1:8000/api/order/cancel-order/${id}`)
          .then(response => {
            console.log(response);
            if (response.data && response.data.message) {
              toast.success(response.data.message);
              fetchOrderHistory()
            } else {
              toast.error('Invalid response from the server');
            }
          })
          .catch(error => {
            console.error('Error:', error);
            if (error.response && error.response.data && error.response.data.message) {
              toast.error(error.response.data.message);
            } else {
              toast.error('An error occurred while cancel the order.');
            }
          });
      }

    if (orderHistory.length === 0) {
        return (
            <div className='h-[60vh] flex justify-center items-center text-4xl'>
                Chưa có đơn đặt hàng
            </div>
        )
    }

    return (
        <div className="mt-5 mb-5 mr-5 ml-5 relative overflow-x-auto">
            <div className="mt-5 flex flex-col justify-start w-full mb-14">
                <h2 className="text-xl text-yellow-500 tracking-widest font-medium title-font uppercase mb-1">
                    Lịch sử đặt hàng
                </h2>
                <hr className='mt-5 text-gray-600 w-auto '>
                </hr>
            </div>
            <table className="mb-5 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-md">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Mã đơn hàng
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Trạng thái đơn hàng
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Thành tiền
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phương thức thanh toán
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ngày đặt hàng
                        </th>
                        <th scope="col" className="px-6 py-3" colSpan={2}>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderHistory.map((order) => (
                            <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 rounded-md">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer hover:text-blue-500">
                                    <Link to={`http://localhost:3000/orderhistory/detail/${order.id}`}>
                                        {order.order_code}
                                    </Link>
                                </th>
                                <td className="px-6 py-4">
                                    {order.status}
                                </td>
                                <td className="px-6 py-4">
                                    {order.total}
                                </td>
                                <td className="px-6 py-4">
                                    {order.payment}
                                </td>
                                <td className="px-6 py-4">
                                    {formatDate(order.date)}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        type="button"
                                        onClick={() => handleDone(order.id)}

                                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none 
                                                focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 
                                                dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 
                                                uppercase whitespace-nowrap"
                                        disabled={order.status === 'chưa xác nhận'}
                                    >
                                        Đã nhận
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleCancel(order.id)}
                                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none 
                                                focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 
                                                dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 
                                                uppercase whitespace-nowrap ml-2"
                                    >
                                        Hủy
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div >
                <ReactPaginate
                    activePage={currentPage}
                    itemsCountPerPage={perPage}
                    totalItemsCount={totalPage}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                    innerClass='flex justify-center items-center'
                    itemClass='mr-5 hover:text-blue-500'
                    pageCount={Math.ceil(orderHistory.total / orderHistory.per_page)}
                />
            </div>
        </div>
    )
}

export default OrderHistory