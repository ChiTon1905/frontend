import React from 'react'
import { Link } from 'react-router-dom'

const FeatureCard = ({cards = []}) => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h2 className="text-xs text-yellow-500 tracking-widest font-medium title-font mb-1">ROOF PARTY POLAROID</h2>
                    <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Master Cleanse Reliac Heirloom</h1>
                </div>
                <div className="flex flex-wrap -m-4">
                    {
                        cards.map((card) => {
                            return (
                                <Link to={`/categories/${card.attributes.name}`} className="p-4 md:w-1/3 cursor-pointer">
                                    <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-yellow-500 text-white flex-shrink-0">
                                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                                </svg>
                                            </div>
                                            <h2 className="text-gray-900 text-lg title-font font-medium capitalize">{ card.attributes.name || "Example card"}</h2>
                                        </div>
                                    </div>
                                </Link >
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default FeatureCard