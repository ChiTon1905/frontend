import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthorContext = createContext()

const url1='http://127.0.0.1:8000/api/authors'
const url2='https://bookstore2001.000webhostapp.com/api/authors'

export const AuthorContextProvider = ({ children }) => {
    const [authors, setAuthors] = useState([])

    useEffect(() => {
        const fetchAuthors = async () => {
                try {
                    const respone = await axios.get(url1)
                        .then(response => {
                            console.log(response.data)
                            setAuthors(response.data.data)
                        })
                } catch (error) {
                    console.error('error fetching', error)
                }
            }
            fetchAuthors()
        }, [])
    return (
        <AuthorContext.Provider
        value={{
            authors,
            setAuthors
        }}
        >
            {
            children
            }
        </AuthorContext.Provider>
    )
}

export const useAuthor = () => useContext(AuthorContext)