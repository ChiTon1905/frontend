import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const BooklayoutsContext = createContext()

const url1='http://127.0.0.1:8000/api/booklayouts'
const url2='https://bookstore2001.000webhostapp.com/api/booklayouts'

export const BooklayoutsContextProvider = ({ children }) => {
    const [booklayouts, setBooklayouts] = useState([])

    useEffect(() => {
        const fetchBooklayouts = async () => {
                try {
                    const respone = await axios.get(url1)
                        .then(response => {
                            console.log(response.data)
                            setBooklayouts(response.data.data)
                        })
                } catch (error) {
                    console.error('error fetching', error)
                }
            }
            fetchBooklayouts()
        }, [])
    return (
        <BooklayoutsContext.Provider
        value={{
            booklayouts,
            setBooklayouts
        }}
        >
            {
            children
            }
        </BooklayoutsContext.Provider>
    )
}

export const useBooklayouts = () => useContext(BooklayoutsContext)