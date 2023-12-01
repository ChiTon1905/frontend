import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import axios from 'axios'

const Categories = () => {

    const { id } = useParams()

    const [category, setCategory] = useState([])
    console.log(id, 'id', category)

    useEffect(() => {
        const fetchCategories = async (e) => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/categories/${id}`)
                    .then(respone => {
                        setCategory(respone.data);
                    })
                console.log('category_axios', category)
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        document.title = 'Categories';

        fetchCategories();
    }, [id]);

    console.log('category', category)

    if (category.length === 0) {
        return <div>Loading</div>
    } else
        return (
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col justify-start w-full mb-20">
                        <h2 className="text-xl text-yellow-500 tracking-widest font-medium title-font uppercase mb-1">
                            {category.data.attributes.cat_name}</h2>
                        <hr className='mt-5 text-gray-600 w-auto '>
                        </hr>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {category.data.attributes.books.map((book_cat) => (
                            <div className="lg:w-1/4 md:w-1/2 p-4 w-full mb-4 cursor-pointer"
                             key={book_cat.id} >
                                <Link to={`/books/${book_cat.id}`} className="block relative h-48 rounded overflow-hidden">
                                    <img
                                        alt={ book_cat.attributes.name }
                                        className="object-contain object-center w-full h-full block"
                                        src={`http://127.0.0.1:8000/images/${book_cat.attributes.image[0].image_path}`} />
                                </Link>
                                <div className="mt-4">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">{ category.data.attributes.cat_name }</h3>
                                    <h2 className="text-gray-900 title-font text-xl font-medium">{ book_cat.attributes.name }</h2>
                                    <p className="mt-1 text-ellipsis font-semibold">{ book_cat.attributes.price - (book_cat.attributes.price * book_cat.attributes.promotion.discount )  }đ</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
}

export default Categories