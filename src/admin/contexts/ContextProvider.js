//Viet API vao day

import React, { useState, createContext, useContext } from "react";

const StateContext = createContext();

const initialState = {
    userProfile: false,
    chat: false,
    notification: false,
    cart: false,
    
}

export const ContextProvider = ({ children }) => {

    const [activeMenu, setActiveMenu] = useState(false)

    const [isClicked, setIsClicked] = useState(initialState)

    const [screenSize, setScreenSize] = useState(undefined)

    const handleClick = (clicked) => {
        setIsClicked({...initialState, [clicked]: true})
    }
    
    return (
        <StateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                isClicked,
                setIsClicked,
                handleClick,
                screenSize,
                setScreenSize
            }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)