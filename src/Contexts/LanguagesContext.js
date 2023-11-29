import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const LanguagesContext = createContext()

const url1='http://127.0.0.1:8000/api/languages'
const url2='https://bookstore2001.000webhostapp.com/api/languages'

export const LanguagesContextProvider = ({ children }) => {
    const [languages, setLanguages] = useState([])

    useEffect(() => {
        const fetchLanguages = async () => {
                try {
                    const respone = await axios.get(url1)
                        .then(response => {
                            console.log(response.data)
                            setLanguages(response.data.data)
                        })
                } catch (error) {
                    console.error('error fetching', error)
                }
            }
            fetchLanguages()
        }, [])
    return (
        <LanguagesContext.Provider
        value={{
            languages,
            setLanguages
        }}
        >
            {
            children
            }
        </LanguagesContext.Provider>
    )
}

export const useLanguages = () => useContext(LanguagesContext)