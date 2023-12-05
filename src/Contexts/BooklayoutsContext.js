import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BooklayoutsContext = createContext()

const url1='http://127.0.0.1:8000/api/booklayouts'
const url2='https://bookstore2001.000webhostapp.com/api/booklayouts'

export const BooklayoutsContextProvider = ({ children }) => {
    const [booklayouts, setBooklayouts] = useState([])
    const [filterData, setFilterData] = useState([])
    const [name, setName] = useState('');
    const navigate = useNavigate()

    const fetchBooklayouts = async () => {
        try {
            const respone = await axios.get(url1)
                .then(response => {
                    console.log(response.data)
                    setBooklayouts(response.data.data)
                    setFilterData(response.data.data)
                })
        } catch (error) {
            console.error('error fetching', error)
        }
    }

    useEffect(() => {
            fetchBooklayouts()
        }, [])

        const createBooklayout = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/booklayouts/store', {
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
                fetchBooklayouts()
                navigate('/admin/Booklayout')
            } catch (error) {
                console.error('Error creating Booklayout:', error);
            }
        };
    
        const updateBooklayout = async (id) => {
            try {
                const response = await axios.post(`http://127.0.0.1:8000/api/booklayouts/${id}`, {
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
                fetchBooklayouts();
                navigate('/admin/Booklayout')
            } catch (error) {
                console.error('Error updating Booklayout:', error);
            }
        };
    
        const deleteBooklayout = async (id) => {
            try {
                const response = await axios.post(`http://127.0.0.1:8000/api/booklayouts/delete/${id}`);
                if (response.status === 204) {
                    setBooklayouts(prevbooklayouts => prevbooklayouts.filter(Booklayout => Booklayout.id !== id));
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
                console.error('Error deleting Booklayout:', error);
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
        <BooklayoutsContext.Provider
        value={{
            booklayouts,
            setBooklayouts,
            filterData,
            setFilterData,
            name,
            setName,
            fetchBooklayouts,
            createBooklayout,
            updateBooklayout,
            deleteBooklayout
        }}
        >
            {
            children
            }
        </BooklayoutsContext.Provider>
    )
}

export const useBooklayouts = () => useContext(BooklayoutsContext)