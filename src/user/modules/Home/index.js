import React, { useEffect, useState } from 'react'
import Hero from '../../componnent/Hero/index'
import ProductsCard from '../../componnent/ProductsCard/'
import Slide from '../../componnent/Banner/banner'

import { useProduct } from '../../../Contexts/ProductContext'

const Home = () => {

    const { products, setProducts } = useProduct()

    return (
        <>
            <Slide />
            <div className="flex flex-col text-center w-full mb-20">
                <h2 className="text-sm text-yellow-500 tracking-widest font-medium title-font mb-1">Sản Phẩm</h2>
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Sách mới</h1>
            </div>
            {
                products.length > 0 ?
                <ProductsCard products = {products}/> : <div>Loading....</div>
            }
            <ProductsCard />
        </>
    )
}

export default Home