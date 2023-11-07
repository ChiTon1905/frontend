import React, { useState, useEffect } from 'react'
import FeatureCard from '../FeatureCard'
import ProductsCard from '../ProductsCard'

import axios from 'axios'

const Categories = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {

    const fetchCategories = async () => {
            try {
                const respone = await axios.get('http://127.0.0.1:8000/api/categories')
                    .then(response => {
                        console.log(response.data)
                        setCategories(response.data.data)
                    })
            } catch (error) {
                console.error('error fetching', error)
            }
        }
        fetchCategories()
    }, [])

    if (categories.length === 0) {
        return <div>Loading</div>
    }

    return (
        <FeatureCard cards={categories} />
    )
}

export default Categories