import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PromotionsContext = createContext()

const url1='http://127.0.0.1:8000/api/promotions'
const url2='https://bookstore2001.000webhostapp.com/api/promotions'

export const PromotionsContextProvider = ({ children }) => {
    const [promotions, setPromotions] = useState([])
    const [filterData, setFilterData] = useState([])
    const [name, setName] = useState('');
    const navigate = useNavigate()

    const fetchPromotions = async () => {
        try {
            const respone = await axios.get(url1)
                .then(response => {
                    console.log(response.data)
                    setPromotions(response.data.data)
                    setFilterData(response.data.data)
                })
        } catch (error) {
            console.error('error fetching', error)
        }
    }

    useEffect(() => {
            fetchPromotions()
        }, [])

       
    return (
        <PromotionsContext.Provider
        value={{
            promotions,
            setPromotions,
            filterData,
            setFilterData,
            name,
            setName,
            fetchPromotions,
        }}
        >
            {
            children
            }
        </PromotionsContext.Provider>
    )
}

export const usePromotions = () => useContext(PromotionsContext)