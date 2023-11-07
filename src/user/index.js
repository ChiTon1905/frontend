import React from 'react'
import Header from './componnent/Header'
import Footer from './componnent/Footer'

const IndexUser = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default IndexUser