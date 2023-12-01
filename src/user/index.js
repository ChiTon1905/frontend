import React from 'react'
import Header from './componnent/Header'
import Footer from './componnent/Footer'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IndexUser = ({ children }) => {
    
    return (
        <div>
            <Header />
            {children}
            <Footer />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default IndexUser