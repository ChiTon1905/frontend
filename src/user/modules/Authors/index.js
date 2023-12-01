import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import axios from 'axios'
{/*https://bookstore2001.000webhostapp.com/ */}
const Authors = () => {

    const { id } = useParams()

    const [Authors, setAuthors] = useState([])
    console.log(id, 'id', Authors)

    useEffect(() => {
        const fetchAuthors = async (e) => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/authors/${id}`)
                    .then(respone => {
                        setAuthors(respone.data);
                    })
                console.log('axios', Authors)
            } catch (error) {
                console.error('Error fetching:', error);
            }
        };

        fetchAuthors();
        document.title = 'Author';
    }, [id]);

    console.log('Authors', Authors)

    if (Authors.length === 0) {
        return <div>Loading...</div>
    } else
        return (
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col justify-start w-full mb-20">
                        <h2 className="text-xl text-yellow-500 tracking-widest font-medium title-font uppercase mb-1">
                            {Authors.data.attributes.name}</h2>
                        <hr className='mt-5 text-gray-600 w-auto '>
                        </hr>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {Authors.data.attributes.books.map((product) => (
                            <div className="lg:w-1/4 md:w-1/2 p-4 w-full mb-4 cursor-pointer"
                             key={product.id} >
                                <Link to={`/books/${product.id}`} className="block relative h-48 rounded overflow-hidden">
                                    <img
                                        alt={ product.attributes.name }
                                        className="object-contain object-center w-full h-full block"
                                        src={`http://127.0.0.1:8000/images/${product.attributes.image[0].image_path}`} />
                                </Link>
                                <div className="mt-4">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">{ Authors.data.attributes.name }</h3>
                                    <h2 className="text-gray-900 title-font text-xl font-medium">{ product.attributes.name }</h2>
                                    <p className="mt-1 text-ellipsis font-semibold">{ product.attributes.price - (product.attributes.price * product.attributes.promotion.discount ) }đ</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
}

export default Authors