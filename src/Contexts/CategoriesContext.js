import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const CategoryContext = createContext()

const url1='http://127.0.0.1:8000/api/categories'
const url2='https://bookstore2001.000webhostapp.com/api/categories'

export const CategoryContextProvider = ({ children }) => {
    const [category, setCategory] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
                try {
                    const respone = await axios.get(url1)
                        .then(response => {
                            console.log(response.data)
                            setCategory(response.data.data)
                        })
                } catch (error) {
                    console.error('error fetching', error)
                }
            }
            fetchCategories()
        }, [])
    return (
        <CategoryContext.Provider
        value={{
            category,
            setCategory
        }}
        >
            {
            children
            }
        </CategoryContext.Provider>
    )
}

export const useCategory = () => useContext(CategoryContext)