import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../Contexts/UserContext'

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
    const navigate = useNavigate();

    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [payment, setPayment] = useState('');
    const [orderDetails, setOrderDetails] = useState([])
    const [redirectToPayment, setRedirectToPayment] = useState(true);
    const carts = JSON.parse(localStorage.getItem('cart')) || []

    const { user } = useUser()

    useEffect(() => {
        const carts = JSON.parse(localStorage.getItem('cart')) || []
        setOrderDetails(carts)

        const total = carts.reduce((acc, item) => {
            return acc + (item.price * item.quantity)
        }, 0)
        setTotal(total)
        document.title = 'Checkout';
    }, [])

    console.log('name', name)
    console.log('email', email)
    console.log('phone', phone)
    console.log('address', address)
    console.log('orderDetails', orderDetails)

    const handleStoreOrder = async (e) => {
        e.preventDefault()

        if(payment === 'VN PAY') {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/process-payment', {
                    // Include any necessary payment data here
                    amount: total,
                    redirect: redirectToPayment,
                });
    
                if (response.data.code === '00' && response.data.data.redirectUrl) {
                    if (redirectToPayment) {
                        window.location.href = response.data.data.redirectUrl;
                    } else {
                        console.log('Payment URL:', response.data.data);
                        // Handle the URL as needed, e.g., open in a new tab
                    }
                } else {
                    console.log('Response data:', response.data);
                    console.error('message', response.data.message);
                }
            } catch (error) {
                console.error('Error during payment:', error);
            }
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/store-order', {
                email: email,
                phone: phone,
                address: address,
                total: total,
                payment: payment,
                order_details: orderDetails
            })
            setEmail('')
            setName('')
            setAddress('')
            setPhone('')
            setPayment('')
            localStorage.removeItem('cart')
            

            console.log("store-order", response.data)
            toast.success('Đặt đơn hàng thành công !!!!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            document.title = `Order Confirmation - Total: $${total.toFixed(2)}`;
            navigate('/cart')
        } catch (e) {
            console.error('error: ', e.message)
        }
    }


    return (
        <div className='flex flex-col bg-gray-250'>
            <div className='containter border rounded-lg mr-5 ml-5 mt-5 justify-center bg-white'>
                <h1 className="block mb-2 ml-5 mt-5 items-center justify-center text-xl font-medium text-gray-900 dark:text-white">
                    ĐỊA CHỈ GIAO HÀNG
                </h1>
                <hr className='w-11/12 items-center justify-center ml-5'>
                </hr>
                <form className='mt-5 mr-5 ml-5'>
                    <div className='mb-6'>
                        <label htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Họ và tên
                        </label>
                        <input type="name" id="Name" onChange={(e) => setName(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Nhập họ và tên" required />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <input type="email" id="email" onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="nhập email" required />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor="phone"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            SĐT
                        </label>
                        <input type="phone" id="phone" onChange={(e) => setPhone(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="nhập sđt" required />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor="address"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Địa chỉ
                        </label>
                        <input type="text" id="address" onChange={(e) => setAddress(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 
                            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                            dark:focus:border-blue-500" placeholder="Nhập địa chỉ" required />
                    </div>
                </form>
            </div>
            <div className='containter border rounded-lg mr-5 ml-5 mt-5 justify-center'>
                <h1 className="block mb-2 ml-5 mt-5 items-center justify-center text-xl font-medium text-gray-900 dark:text-white">
                    Phương thức thanh toán
                </h1>
                <hr className='w-11/12 items-center justify-center ml-5 mb-5'>
                </hr>
                <div className="flex items-center mb-4 ml-5">
                    <input
                        id="default-radio-1"
                        type="radio"
                        value="Thanh toán khi nhận hàng"
                        onChange={(e) => setPayment(e.target.value)}
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 
                     dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 
                     dark:bg-gray-700 dark:border-gray-600"/>
                    <label

                        htmlFor="default-radio-1"
                        className="ms-2 text-base font-medium text-gray-900 dark:text-gray-300">
                        Thanh toán khi nhận hàng
                    </label>
                </div>
                <div className="flex items-center mb-4 ml-5">
                    <input id="default-radio-1"
                        type="radio"
                        value="VN PAY"
                        onChange={(e) => setPayment(e.target.value)}
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 
                     dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 
                     dark:bg-gray-700 dark:border-gray-600"/>
                    <label
                        htmlFor="default-radio-1"
                        className="ms-2 text-base font-medium text-gray-900 dark:text-gray-300">
                        VN PAY
                    </label>
                </div>
            </div>
            <div className='containter border rounded-lg mr-5 ml-5 mt-5 justify-center'>
                <h1 className="block mb-2 ml-5 mt-5 items-center justify-center text-xl font-medium text-gray-900 dark:text-white">
                    Kiểm tra lại đơn hàng
                </h1>
                <hr className='w-11/12 items-center justify-center ml-5'>
                </hr>
                {
                    carts.map((cart) => (
                        <div className='flex mt-5 mr-5 ml-5' key={cart?.id}>
                            <div className="flex w-2/5 mb-5">
                                <div className="w-24">
                                    <img className="h-24" src={`http://127.0.0.1:8000/images/${cart.attributes.image[0].image_path}`}
                                        alt={cart.attributes.name} />
                                </div>
                                <div className="flex flex-col justify-between ml-4 flex-grow">
                                    {cart.attributes.name}
                                </div>
                            </div>
                            <div className="flex justify-center w-1/5">
                                {cart?.quantity}
                            </div>
                            <span className="text-center w-1/5 font-semibold text-sm">
                                {cart.price} đ
                            </span>
                            <span className="text-center w-1/5 font-semibold text-sm">
                                {cart.price * cart?.quantity} đ
                            </span>
                        </div>
                    )
                    )
                }

            </div>
            <div className='border rounded-lg mr-5 ml-5 mt-5 mb-5 grid justify-items-end'>
                <div className='mb-4 mr-5 mt-5 '>
                    Tổng tiền hàng : {total?.toFixed(0)} đ
                </div>
                <div className='mb-4 mr-5'>
                    <button
                        type="button"
                        onClick={handleStoreOrder}
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none 
                    focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 
                    text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 uppercase">
                        Thanh toán
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Checkout