import React, { useContext, useState, useEffect, createContext } from 'react'

const userContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [amount, setAmount] = useState(1)

    return (
        <userContext.Provider
            value=
            {{
                amount,
                setAmount
            }}

        >
            {children}
        </userContext.Provider>
    )
}

export const useUser = () => useContext(userContext)