import React, { useEffect, useState } from 'react'
import { BsCurrencyDollar, BsDot } from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'
import { Stacked, Pie, Button, SparkLine } from '../components'
import { earningData, SparklineAreaData, ecomPieChartData } from '../data/dummy'
import { useStateContext } from '../contexts/ContextProvider'
import AppAdmin from '../App'
import axios from 'axios'

import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { BsBoxSeam } from 'react-icons/bs';
import { FiBarChart, } from 'react-icons/fi';
import { FaChevronDown } from "react-icons/fa6";

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
const Ecommerce = () => {
  const [bookCount, setBookCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const [orders, setOrders] = useState([])
  const [sort_by, setSortBy] = useState('name');
  const [sort_order, setSortOrder] = useState('asc');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const fetchDashBoard = async () => {
    try {
      const respone = await axios.get('http://127.0.0.1:8000/api/dashboard', {
        sort_by: sort_by,
        sort_order: sort_order
      })
        .then(response => {
          console.log('dashboard', response.data)
          setBookCount(response.data.book_count);
          setUserCount(response.data.user_count);
          setTotal(response.data.total_revenue)
          setOrderCount(response.data.order_count);
          setOrders(response.data.order)
        })
    } catch (error) {
      console.error('error fetching', error)
    }
  }

  const handleSortChange = (newSortBy, newSortOrder) => {
    // Update state with new sort_by and sort_order values
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);

  };

  useEffect(() => {
    fetchDashBoard()
    document.title = 'ecommerce'
  }, [sort_by, sort_order])
  return (
    <>

      <div className='mt-12'>
        <div className='flex flex-wrap lg:flex-nowarp justify-center'>
          <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-64 w-full lg:w-1000
                        rounded-xl  p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center '>
            <div className='flex justify-between items-center'>
              <div>
                <p className='font-bold text-gray-400'>Earnings</p>
                <p className='text-2xl'>{new Intl.NumberFormat('en-US').format(total)} đ</p>
              </div>
            </div>
            <div className='mt-3'>
              <Button
                color="white"
                bgColor="blue"
                text="download"
                borderRadius="10px"
                size="md"
              />
            </div>
          </div>

          <div className='flex m-3 flex-wrap jusify-center gap-1 items-center'>
            <div
              className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg 
                md:w-56 p-4 pt-8 rounded-2xl'
            >
              <button type="button"
                className='text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl text-blue-500 bg-blue-200'>
                <MdOutlineSupervisorAccount />
              </button>
              <p className='mt-3'>
                <span className='text-lg font-semibold'>
                  {userCount}
                </span>
              </p>
              <p className='text-sm text-gray-400 mt-1'>
                Customers
              </p>
            </div>
            <div
              className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg 
                md:w-56 p-4 pt-8 rounded-2xl'
            >
              <button type="button"
                className='text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl text-white bg-yellow-500'>
                <BsBoxSeam />
              </button>
              <p className='mt-3'>
                <span className='text-lg font-semibold'>
                  {bookCount}
                </span>
              </p>
              <p className='text-sm text-gray-400 mt-1'>
                Products
              </p>
            </div>
            <div
              className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg 
                md:w-56 p-4 pt-8 rounded-2xl'
            >
              <button type="button"
                className='text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl text-rose-500 bg-pink-200'>
                <FiBarChart />
              </button>
              <p className='mt-3'>
                <span className='text-lg font-semibold'>
                  {orderCount}
                </span>
              </p>
              <p className='text-sm text-gray-400 mt-1'>
                sales
              </p>
            </div>
          </div>
        </div>
        <div className='flex gap-10 flex-warp justify-center'>
          <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780'>
            <div className='flex justify-between'>
              <p className='font-bold text-xl'>Revenue Update</p>
              <div className='flex items-center gap-4'>
                <p className='flex items-center gap-2 text-gray-600 hover:drop-shadow-xl'>
                  <span><GoDotFill /></span>
                  <span>Expense</span>
                </p>
                <p className='flex items-center gap-2 text-green-600 hover:drop-shadow-xl'>
                  <span><GoDotFill /></span>
                  <span>Budget</span>
                </p>
              </div>

            </div>

            <div className='mt-10 flex gap-10 flex-warp justify-center'>
              <div className='border-r-1 border-color m-4 pr-10'>
                <div>
                  <p>
                    <span className='text-3xl font-semibold'>$5,000</span>
                    <span className='p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white
                  bg-green-400 ml-3 text-xs'>5%</span>
                  </p>
                  <p className='text-gray-500 mt-1'>Budget</p>
                </div>
                <div className='mt-8'>
                  <p>
                    <span className='text-3xl font-semibold'>$5,00</span>
                  </p>
                  <p className='text-gray-500 mt-1'>Expense</p>
                </div>
                <div className='mt-5'>
                  <SparkLine
                    height='200px'
                    width='250px'
                  />
                </div>
                <div className='mt-10'>
                  <Button
                    color='white'
                    bgColor='blue'
                    text='Download Report'
                    borderRadius='10px'
                  />
                </div>
              </div>
              <div>
                <Stacked
                  width='320px'
                  height='360px'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-10 flex-warp justify-center'>
          <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780'>
            <div className='flex justify-between'>
              <p className='font-bold text-xl'>Order</p>

              <div className='flex items-center gap-4'>
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
                    <div className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
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
                            key={index}
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
            </div>

            <div className="relative overflow-x-auto mt-5">
              <table className="w-full text-sm text-center rtl:text-center text-gray-500 dark:text-gray-400">
                <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      id
                    </th>
                    <th scope="col" className="px-6 py-3">
                      code
                    </th>
                    <th scope="col" className="px-6 py-3">
                      payment
                    </th>
                    <th scope="col" className="px-6 py-3">
                      total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((orderData) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {orderData.id}
                      </th>
                      <td className="px-6 py-4">
                        {orderData.order_code}
                      </td>
                      <td className="px-6 py-4">
                        {orderData.payment}
                      </td>
                      <td className="px-6 py-4">
                        {new Intl.NumberFormat('en-US').format(orderData.total)} đ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default Ecommerce