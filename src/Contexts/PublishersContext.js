import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const PublishersContext = createContext()

const url1='http://127.0.0.1:8000/api/publishers'
const url2='https://bookstore2001.000webhostapp.com/api/publishers'

export const PublishersContextProvider = ({ children }) => {
    const [publishers, setPublishers] = useState([])

    useEffect(() => {
        const fetchPublishers = async () => {
                try {
                    const respone = await axios.get(url1)
                        .then(response => {
                            console.log(response.data)
                            setPublishers(response.data.data)
                        })
                } catch (error) {
                    console.error('error fetching', error)
                }
            }
            fetchPublishers()
        }, [])
    return (
        <PublishersContext.Provider
        value={{
            publishers,
            setPublishers
        }}
        >
            {
            children
            }
        </PublishersContext.Provider>
    )
}

export const usePublishers = () => useContext(PublishersContext)