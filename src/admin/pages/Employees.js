import axios from 'axios';
import React, { useState, useEffect } from 'react'

import DataTable from 'react-data-table-component';

import { CiSearch } from "react-icons/ci";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../../Contexts/UserContext';
import { toast } from 'react-toastify';


const Employees = () => {

  const {
    fetchEmployee,
    employee,
    setEmployee,
    filterData,
    setFilterData,
    handleDeleteEmployees
  } = useUser()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    fetchEmployee()
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
      name: 'name',
      selector: (row) => row.name,
      sortable: true,
      sortFunction: (a, b) => {
        // Custom sorting function for the 'name' column
        return a.name.localeCompare(b.name);
      },
    },
    {
      name: 'email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'role',
      selector: row => row.roles.map(role => role.name).join(', '), // Assuming roles is an array
      sortable: true,
      cell: row => <span>{row.roles.map(role => role.name).join(', ')}</span>,
    },
    {
      name: 'action',
      customButton: true,
      cell: (row) => {


        const handleEditClick = () => {
          navigate(`/admin/employees-update/${row.id}`);
        };

        const handleRoleClick = () => {
          navigate(`/admin/employees-role/${row.id}`);
        };

        const handlePermissionClick = () => {
          navigate(`/admin/employees-permissions/${row.id}`);
        };

        const handleDeleteClick = async (row) => {
          toast.error('Không thể xóa admin')
        }
        return (
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleRoleClick}
              className="text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none 
              focus:ring-amber-300 font-medium rounded-lg text-sm px-4 py-2 
              dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800 
              uppercase whitespace-nowrap ml-2"
            >
              Vai trò
            </button>
            <button
              type="button"
              onClick={handlePermissionClick}
              className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none 
              focus:ring-emerald-300 font-medium rounded-lg text-sm px-4 py-2 
              dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 
              uppercase whitespace-nowrap ml-2"
            >
              Quyền
            </button>
            <button
              type="button"
              onClick={handleEditClick}
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none 
              focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 
              dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 
              uppercase whitespace-nowrap ml-2"
            >
              Cập nhật
            </button>
            <button
              type="button"
              onClick={() => handleDeleteClick(row)}
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none 
              focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 
              dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 
              uppercase whitespace-nowrap ml-2"
            >
              Xóa
            </button>
          </div>
        )

      },
    },
  ];

  const handleSearch = (e) => {
    setSearch(e)
    if (e === '') {
      setFilterData(employee)
    } else {
      const filtered = employee.filter((item) => {
        return (
          item.id.toString().includes(e) ||
          item.name.toLowerCase().includes(e.toLowerCase())
        );
      });
      setFilterData(filtered);
    }
  }

  const handleCreate = () => {
    navigate('/admin/employees-create')
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
        <button
          type="button"
          onClick={handleCreate}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                    focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 
                    text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 
                    uppercase">
          create
        </button>
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

export default Employees