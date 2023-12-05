import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { usePublishers } from '../../../Contexts/PublishersContext'

const FormPublisherUpdate = () => {
    const { id } = useParams()

    const { publishers, setPublishers, name, setName,updatePublisher } = usePublishers();
    console.log(id, 'id', publishers)

    useEffect(() => {
        const fetchPublishers = async (e) => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/publishers/${id}`);
                const PublisherData = response.data;

                console.log('axios', PublisherData)
    
                setPublishers(PublisherData);
                setName(prevName => PublisherData.data.attributes.name || prevName);
               
            } catch (error) {
                console.error('Error fetching Publishers:', error);
            }
        };

        document.title = 'Publishers Update';

        fetchPublishers();
    }, [id]);

    const handleUpdatePublisherSubmit = async (e) => {
        e.preventDefault()
        await updatePublisher(id)
        
    }

    console.log('name', name)
    console.log('Publisher', publishers)
    return (
        <div>
            <form className='mt-5 mr-5 ml-5'>
                <div className='mb-6'>
                    <label htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Name
                    </label>
                    <input type="name" id="Name" onChange={ (e) => setName(e.target.value)} value={name}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập tên" required />
                </div>
                <div className='mb-4 mr-5 '>
                    <button
                        type="submit"
                        onClick={handleUpdatePublisherSubmit}
                        className=" text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none 
                    focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 
                    text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 uppercase">
                        Lưu thay đổi
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormPublisherUpdate