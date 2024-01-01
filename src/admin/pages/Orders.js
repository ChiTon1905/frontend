import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom'

import DataTable from 'react-data-table-component';

const Orders = () => {

  const [order, setOrder] = useState([])
  const [filterData, setFilterData] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const fetchOrder = async () => {
    try {
      const respone = await axios.get('http://127.0.0.1:8000/api/order')
        .then(response => {
          console.log(response.data)
          setOrder(response.data.orders)
          setFilterData(response.data.orders)
        })
    } catch (error) {
      console.error('error fetching', error)
    }
  }

  useEffect(() => {
    fetchOrder()

  }, [])

  const columns = [
    {
      name: 'id',
      selector: (row) => row.id,
      sortable: true,
      sortFunction: (a, b) => {
        // Custom sorting function for the 'id' column
        return a.id - b.id;
      },
    },
    {
      name: 'code',
      selector: (row) => row.order_code,
      sortable: true,
    },
    {
      name: 'status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'payment',
      selector: (row) => row.payment,
      sortable: true,
    },
    {
      name: 'total',
      selector: (row) => <span>{new Intl.NumberFormat('en-US').format(row.total)}VND</span>,
      sortable: true,
    },
    {
      name: 'user_name',
      selector: (row) => row.user.name,
      sortable: true,
    },
    {
      name: 'action',
      customButton: true,
      cell: (row) => {
        const handleProcess = (row) => {
          axios.post(`http://127.0.0.1:8000/api/order/${row.id}`)
            .then(response => {
              console.log(response);
              if (response.data && response.data.message) {
                toast.success(response.data.message);
                fetchOrder();
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

        const handlePending = (row) => {
          axios.post(`http://127.0.0.1:8000/api/order/pending-order/${row.id}`)
            .then(response => {
              console.log(response);
              if (response.data && response.data.message) {
                toast.success(response.data.message);
                fetchOrder();
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

        const handleShow = () => {
          navigate(`/admin/orderdetail/${row.id}`);
        }
        return (
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleShow}
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none 
              focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 
              dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 
              uppercase whitespace-nowrap"
            >
              Hiển thị
            </button>
            <button
              type="button"
              onClick={() => handleProcess(row)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
              focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 
              uppercase whitespace-nowrap ml-2"
            >
              Xác nhận
            </button>
            <button
              type="button"
              onClick={() => handlePending(row)}
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none 
              focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 
              dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 
              uppercase whitespace-nowrap ml-2"
            >
              Chưa xác nhận
            </button>
          </div>
        )

      },
    },
  ];

  const handleSearch = (e) => {
    setSearch(e)
    if (e === '') {
      setFilterData(order)
    } else {
      const filtered = order.filter((item) => {
        return (
          item.id.toString().includes(e) ||
          item.status.toLowerCase().includes(e.toLowerCase())
        );
      });
      setFilterData(filtered);
    }
  }

  return (
    <div className='mt-12 ml-5 mr-5'>
      <div className='flex flex-wrap lg:flex-nowarp justify-end'>
        <input
          type="search"
          className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid 
      border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal 
      leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] 
      focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] 
      focus:outline-none motion-reduce:transition-none dark:border-neutral-500 dark:text-neutral-200
       dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon2"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <span
          className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
          id="basic-addon2">
          <Link
            to='/search'
            className="inline-flex items-center py-2 pr-3 text-2xl"
          >
            <CiSearch />
          </Link>
        </span>
      </div>
      <div className='flex flex-wrap justify-center items-center mt-5' >
        <DataTable
          columns={columns}
          data={filterData}
          pagination
          responsive
          striped
          highlightOnHover
          sortActive
        />
      </div>
    </div>
  )
}

export default Orders