import React from 'react'
import { Link } from 'react-router-dom'

const ProductsCard = ({ products = []}) => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 pt-24 pb-14 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {
                        products.map((product, index) => {
                            console.log(product, 'product')
                            return (
                                <div key={product.id} className="lg:w-1/4 md:w-1/2 p-4 w-full mb-4 border border-opacity-50 cursor-pointer">
                                    <Link to={`/books/${product.id}`} className="block relative h-48 rounded overflow-hidden">
                                        <img alt={product.attributes.name} className="object-contain object-center w-full h-full block" 
                                        src={`http://127.0.0.1:8000/images/${product.attributes.image[0].image_path}`} />              
                                    </Link>
                                    <div className="mt-4">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">{product.attributes.category?.name}</h3>
                                        <h2 className="text-gray-900 title-font text-xl font-medium">{product.attributes.name}</h2>
                                        <p className="mt-1 text-ellipsis font-semibold">{product.attributes.price - (product.attributes.price * product.attributes.promotion.discount)} đ</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default ProductsCard