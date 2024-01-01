import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AuthorContext = createContext()

const url1='http://127.0.0.1:8000/api/authors'
const url2='https://bookstore2001.000webhostapp.com/api/authors'

export const AuthorContextProvider = ({ children }) => {
    const [authors, setAuthors] = useState([])
    const [filterData, setFilterData] = useState([])
    const [name, setName] = useState('');
    const navigate = useNavigate()

    const fetchAuthors = async () => {
        try {
            const response = await axios.get(url1);
            console.log(response.data);
            setAuthors(response.data.data);
            setFilterData(response.data.data);
        } catch (error) {
            console.error('Error fetching:', error);
            // Additional error handling, if needed
        }
    };

    useEffect(() => {
            fetchAuthors()
        }, [])

        const createAuthor = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/authors/store', {
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
                fetchAuthors()
                navigate('/admin/author')
            } catch (error) {
                console.error('Error creating author:', error);
            }
        };
    
        const updateAuthor = async (id) => {
            try {
                const response = await axios.post(`http://127.0.0.1:8000/api/authors/${id}`, {
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
                fetchAuthors();
                navigate('/admin/author')
            } catch (error) {
                console.error('Error updating author:', error);
            }
        };
    
        const deleteAuthor = async (id) => {
            try {
                const response = await axios.post(`http://127.0.0.1:8000/api/authors/delete/${id}`, {}
                , {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.status === 204) {
                    setAuthors(prevauthors => prevauthors.filter(author => author.id !== id));
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
                window.location.reload()
            } catch (error) {
                console.error('Error deleting author:', error);
                toast.error('Đã có sách ', {
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
        <AuthorContext.Provider
        value={{
            authors,
            setAuthors,
            filterData,
            setFilterData,
            name,
            setName,
            fetchAuthors,
            createAuthor,
            updateAuthor,
            deleteAuthor
        }}
        >
            {
            children
            }
        </AuthorContext.Provider>
    )
}

export const useAuthor = () => useContext(AuthorContext)