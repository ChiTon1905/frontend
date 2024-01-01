import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CategoryContext = createContext()

const url1 = 'http://127.0.0.1:8000/api/categories'
const url2 = 'https://bookstore2001.000webhostapp.com/api/categories'

export const CategoryContextProvider = ({ children }) => {
    const [category, setCategory] = useState([])
    const [filterData, setFilterData] = useState([])
    const [name, setName] = useState('');
    const navigate = useNavigate()
    const fetchCategories = async () => {
        try {
            const respone = await axios.get(url1)
                .then(response => {
                    console.log(response.data)
                    setCategory(response.data.data)
                    setFilterData(response.data.data)
                })
        } catch (error) {
            console.error('error fetching', error)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const createCategory = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/categories/store', {
                name: name
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            toast.success('Thành công !!!!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            fetchCategories()
            navigate('/admin/category')
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    const updateCategory = async (id) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/categories/${id}`, {
                name: name
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            toast.success('Thành công !!!!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            fetchCategories();
            navigate('/admin/category')
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const deleteCategory = async (id) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/categories/delete/${id}`, {}
            , {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.status === 204) {
                setCategory(prevCategories => prevCategories.filter(category => category.id !== id));
                toast.success('Thành công !!!!', {
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
            fetchCategories()
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error('Đã có sách ở thể loại này', {
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
    return (
        <CategoryContext.Provider
            value={{
                category,
                setCategory,
                filterData,
                setFilterData,
                name,
                setName,
                fetchCategories,
                createCategory,
                updateCategory,
                deleteCategory
            }}
        >
            {
                children
            }
        </CategoryContext.Provider>
    )
}

export const useCategory = () => useContext(CategoryContext)