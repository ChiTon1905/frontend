import React, { useState } from 'react'
import { useCategory } from '../../../Contexts/CategoriesContext';
import { useAuthor } from '../../../Contexts/AuthorsContext';
import { useBooklayouts } from '../../../Contexts/BooklayoutsContext';
import { useLanguages } from '../../../Contexts/LanguagesContext';
import { usePublishers } from '../../../Contexts/PublishersContext';
import { usePromotions } from '../../../Contexts/PromotionContext'
import { useProduct } from '../../../Contexts/ProductContext';
import axios from 'axios';
import Select from 'react-select';

const FormBookCreate = () => {

    const {
        name,
        setName,
        quantity,
        setQuantity,
        price,
        setPrice,
        description,
        setDescription,
        date,
        setDate,
        categorySelected,
        setCategorySelected,
        authorSelected,
        setAuthorSelected,
        publisherSelected,
        setPublisherSelected,
        languageSelected,
        setLanguageSelected,
        booklayoutSelected,
        setBooklayoutSelected,
        promotionSelected,
        setPromotionSelected,
        selectedFiles,
        setSelectedFiles,
        handleCreateBook,
        handleFileChange,
        handleRemoveFile

    } = useProduct()
    const { category, setCategory } = useCategory()
    const { authors, setAuhors } = useAuthor()
    const { booklayouts, setBooklayouts } = useBooklayouts()
    const { languages, setLanguages } = useLanguages()
    const { publishers, setPublishers } = usePublishers()
    const { promotions, setPromotions } = usePromotions()

    const handleAuthorChange = (selectedAuthors) => {
        setAuthorSelected(selectedAuthors);
    };

    const authorOptions = authors.map((author) => ({
        value: author.id,
        label: author.attributes.name,
    }));

    console.log('name', name)
    console.log('category selected', categorySelected)
    console.log('mutiple author', authorSelected)
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
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 
                    dark:text-white">
                        Thể loại</label>
                    <select
                        id="category"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setCategorySelected(e.target.value)}
                        value={categorySelected}>
                        <option value='' disabled >Chọn thể loại</option>
                        {
                            category.map((cat) => (
                                <option
                                    key={cat.id}
                                    value={cat.id}
                                >
                                    {cat.attributes.cat_name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='mb-6'>
                    <label htmlFor="publisher" className="block mb-2 text-sm font-medium text-gray-900 
                    dark:text-white">
                        Nhà xuất bản</label>
                    <select
                        id="publisher"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setPublisherSelected(e.target.value)}
                        value={publisherSelected}
                    >
                        <option value='' disabled >Chọn nhà xuất bản</option>
                        {
                            publishers.map((cat) => (
                                <option
                                    key={cat.id}
                                    value={cat.id}
                                >
                                    {cat.attributes.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='mb-6'>
                    <label htmlFor="booklayout" className="block mb-2 text-sm font-medium text-gray-900 
                    dark:text-white">
                        Bìa sách</label>
                    <select
                        id="booklayout"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setBooklayoutSelected(e.target.value)}
                        value={booklayoutSelected}>
                        <option value='' disabled >Chọn bìa sách</option>
                        {
                            booklayouts.map((cat) => (
                                <option
                                    key={cat.id}
                                    value={cat.id}
                                >
                                    {cat.attributes.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='mb-6'>
                    <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900 
                    dark:text-white">
                        Ngôn ngữ</label>
                    <select
                        id="language"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setLanguageSelected(e.target.value)}
                        value={languageSelected}>
                        <option value='' disabled >Chọn bìa sách</option>
                        {
                            languages.map((cat) => (
                                <option
                                    key={cat.id}
                                    value={cat.id}
                                >
                                    {cat.attributes.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='mb-6'>
                    <label htmlFor="Author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Tác giả
                    </label>
                    <Select
                        id="multiSelection"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        isMulti
                        onChange={handleAuthorChange}
                        options={authorOptions}
                        value={authorSelected}
                    />
                </div>
                <div className='mb-6'>
                    <label htmlFor="promotion" className="block mb-2 text-sm font-medium text-gray-900 
                    dark:text-white">
                        Khuyến mãi</label>
                    <select
                        id="promotion"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setPromotionSelected(e.target.value)}
                        value={promotionSelected}>
                        <option value='' disabled >Chọn khuyến mãi</option>
                        {
                            promotions.map((cat) => (
                                <option
                                    key={cat.id}
                                    value={cat.id}
                                >
                                    {cat.attributes.discount * 100}%</option>
                            ))
                        }
                    </select>
                </div>


                <div className='mb-6'>
                    <label htmlFor="date"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Ngày xuất bản
                    </label>
                    <input
                        type="date"
                        id="date"
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className='mb-6'>
                    <label htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Số lượng
                    </label>
                    <input type="quantity" id="quantity" onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập số lượng" required />
                </div>
                <div className='mb-6'>
                    <label htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Giá
                    </label>
                    <input type="price" id="price" onChange={(e) => setPrice(e.target.value)} value={price}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập price" required />
                </div>
                <div className='mb-6'>
                    <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Description</label>
                    <textarea
                        id="message"
                        rows="4"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 
                        focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."></textarea>
                </div>
                <div className="mb-6">
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        id="fileInput"
                    />
                    <label
                        htmlFor="fileInput"
                        className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                    >
                        Select Files
                    </label>
                    {Array.isArray(selectedFiles) && selectedFiles.length > 0 ? (
                        <div className="mt-3">
                            <h4 className="text-lg font-semibold mb-2">Selected Files:</h4>
                            <ul>
                                {selectedFiles.map((file, index) => (
                                    <li key={index} className="mb-1">
                                        {file.name}{' '}
                                        <button
                                            onClick={() => handleRemoveFile(index)}
                                            className="text-red-500 ml-2"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="mt-3">
                            <p>No files selected</p>
                        </div>
                    )}
                </div>
                <div className='mb-4 mr-5 '>
                    <button
                        type="submit"
                        onClick={handleCreateBook}
                        className=" text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none 
                    focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 
                    text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 uppercase">
                        Lưu
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormBookCreate