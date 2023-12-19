import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PublishersContext = createContext()

const url1='http://127.0.0.1:8000/api/publishers'
const url2='https://bookstore2001.000webhostapp.com/api/publishers'

export const PublishersContextProvider = ({ children }) => {
    const [publishers, setPublishers] = useState([])
    const [filterData, setFilterData] = useState([])
    const [name, setName] = useState('');
    const navigate = useNavigate()

    const fetchPublishers = async () => {
        try {
            const respone = await axios.get(url1)
                .then(response => {
                    console.log(response.data)
                    setPublishers(response.data.data)
                    setFilterData(response.data.data)
                })
        } catch (error) {
            console.error('error fetching', error)
        }
    }

    useEffect(() => {
            fetchPublishers()
        }, [])

        const createPublisher = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/publishers/store', {
                    name: name
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
                fetchPublishers()
                navigate('/admin/Publisher')
            } catch (error) {
                console.error('Error creating Publisher:', error);
            }
        };
    
        const updatePublisher = async (id) => {
            try {
                const response = await axios.post(`http://127.0.0.1:8000/api/publishers/${id}`, {
                    name: name
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
                fetchPublishers();
                navigate('/admin/Publisher')
            } catch (error) {
                console.error('Error updating Publisher:', error);
            }
        };
    
        const deletePublisher = async (id) => {
            try {
                const response = await axios.post(`http://127.0.0.1:8000/api/publishers/delete/${id}`);
                if (response.status === 204) {
                    setPublishers(prevPublishers => prevPublishers.filter(Publisher => Publisher.id !== id));
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
                fetchPublishers()
            } catch (error) {
                console.error('Error deleting Publisher:', error);
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
        <PublishersContext.Provider
        value={{
            publishers,
            setPublishers,
            filterData,
            setFilterData,
            name,
            setName,
            fetchPublishers,
            createPublisher,
            updatePublisher,
            deletePublisher
        }}
        >
            {
            children
            }
        </PublishersContext.Provider>
    )
}

export const usePublishers = () => useContext(PublishersContext)