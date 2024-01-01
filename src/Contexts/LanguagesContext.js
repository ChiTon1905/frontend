import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LanguagesContext = createContext()

const url1='http://127.0.0.1:8000/api/languages'
const url2='https://bookstore2001.000webhostapp.com/api/languages'

export const LanguagesContextProvider = ({ children }) => {
    const [languages, setLanguages] = useState([])
    const [filterData, setFilterData] = useState([])
    const [name, setName] = useState('');
    const navigate = useNavigate()

    const fetchLanguages = async () => {
        try {
            const respone = await axios.get(url1)
                .then(response => {
                    console.log(response.data)
                    setLanguages(response.data.data)
                    setFilterData(response.data.data)
                })
        } catch (error) {
            console.error('error fetching', error)
        }
    }

    useEffect(() => {
            fetchLanguages()
        }, [])

        const createLanguage = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/languages/store', {
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
                fetchLanguages()
                navigate('/admin/Language')
            } catch (error) {
                console.error('Error creating Language:', error);
            }
        };
    
        const updateLanguage = async (id) => {
            try {
                const response = await axios.post(`http://127.0.0.1:8000/api/languages/${id}`, {
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
                fetchLanguages();
                navigate('/admin/Language')
            } catch (error) {
                console.error('Error updating Language:', error);
            }
        };
    
        const deleteLanguage = async (id) => {
            try {
                const response = await axios.post(`http://127.0.0.1:8000/api/languages/delete/${id}`, {}
                , {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.status === 204) {
                    setLanguages(prevLanguages => prevLanguages.filter(Language => Language.id !== id));
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
                console.error('Error deleting Language:', error);
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
        <LanguagesContext.Provider
        value={{
            languages,
            setLanguages,
            filterData,
            setFilterData,
            name,
            setName,
            fetchLanguages,
            createLanguage,
            updateLanguage,
            deleteLanguage
        }}
        >
            {
            children
            }
        </LanguagesContext.Provider>
    )
}

export const useLanguages = () => useContext(LanguagesContext)