import React, { useContext, useState, useEffect, createContext } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductContext = createContext();

const url = 'http://127.0.0.1:8000/api/books'

export const ProductContextProvider = ({ children }) => {

    const [amount, setAmount] = useState(1)

    const [products, setProducts] = useState([])
    
    useEffect( () => {

        const fetchProducts = async () => {
            try {
                const respone = await axios.get(url)
                    .then(response => {
                        console.log(response.data)
                        setProducts(response.data.data)
                    })
            } catch (error) {
                console.error('error fetching', error)
            }
        }
        fetchProducts()
    },[])

   
    //handlecart

    return (
        <ProductContext.Provider
            value=
            {{
                amount,
                setAmount,
                products,
                setProducts
            }}

        >
            {children}
        </ProductContext.Provider>
    )
}

export const useProduct = () => useContext(ProductContext)