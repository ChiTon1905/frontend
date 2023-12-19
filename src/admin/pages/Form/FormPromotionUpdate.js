import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { usePromotions } from '../../../Contexts/PromotionContext'

const FormPromotionUpdate = () => {
    const { id } = useParams()

    const { 
        promotions, 
        setPromotions,  
        name,
        setName, 
        discount, 
        setDiscount,
        startDate, 
        setStartDate,
        endDate, 
        setEndDate,
        description, 
        setDescription, 
        updatePromotion } = usePromotions();
    console.log(id, 'id', promotions)

    useEffect(() => {
        const fetchPromotion = async (e) => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/promotions/${id}`);
                const PromotionData = response.data;

                console.log('axios', PromotionData)

                setPromotions(PromotionData);
                setName(PromotionData.data.attributes.name)
                setDescription(PromotionData.data.attributes.description)
                setDiscount(String(PromotionData.data.attributes.discount))

                // Assuming bookData.data.attributes.publication_day is in the format "yyyy-MM-ddTHH:mm:ss.000000Z"
                const defaultStartDate = PromotionData.data.attributes.start_date;

                const defaultEndDate = PromotionData.data.attributes.end_date;

                // Extract only the date part (yyyy-MM-dd)
                const formattedDefaultStartDate = new Date(defaultStartDate).toISOString().split('T')[0];

                const formattedDefaultEndDate = new Date(defaultEndDate).toISOString().split('T')[0];

                setStartDate(formattedDefaultStartDate)
                setEndDate(formattedDefaultEndDate)

            } catch (error) {
                console.error('Error fetching Promotion:', error);
            }
        };

        document.title = 'Promotion Update';

        fetchPromotion();
    }, [id]);

    const handleUpdatePromotionubmit = async (e) => {
        e.preventDefault()
        await updatePromotion(id)

    }

    console.log('name', name)
    console.log('Promotion', promotions)
    return (
        <div>
            <form className='mt-5 mr-5 ml-5'>
            <div className='mb-6'>
                    <label htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Name
                    </label>
                    <input type="name" id="Name" onChange={(e) => setName(e.target.value)} value={name}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập tên" required />
                </div>
                <div className='mb-6'>
                    <label htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Discount
                    </label>
                    <input type="name" id="Name"  value={discount * 100}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập" disabled />
                </div>
                <div className='mb-6'>
                    <label htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Description
                    </label>
                    <input type="name" id="Name" onChange={(e) => setDescription(e.target.value)} value={description}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập" required />
                </div>
                <div className='mb-6'>
                    <label htmlFor="date"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Ngày bắt đầu
                    </label>
                    <input
                        type="date"
                        id="date"
                        onChange={(e) => setStartDate(e.target.value)}
                        value={startDate}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className='mb-6'>
                    <label htmlFor="date"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Ngày kết thúc
                    </label>
                    <input
                        type="date"
                        id="date"
                        onChange={(e) => setEndDate(e.target.value)}
                        value={endDate}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className='mb-4 mr-5 '>
                    <button
                        type="submit"
                        onClick={handleUpdatePromotionubmit}
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

export default FormPromotionUpdate