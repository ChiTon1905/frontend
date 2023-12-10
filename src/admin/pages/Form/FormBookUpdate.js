import React, { useEffect, useState } from 'react'
import { useCategory } from '../../../Contexts/CategoriesContext';
import { useAuthor } from '../../../Contexts/AuthorsContext';
import { useBooklayouts } from '../../../Contexts/BooklayoutsContext';
import { useLanguages } from '../../../Contexts/LanguagesContext';
import { usePublishers } from '../../../Contexts/PublishersContext';
import { usePromotions } from '../../../Contexts/PromotionContext'
import { useProduct } from '../../../Contexts/ProductContext';
import axios from 'axios';
import { useParams } from 'react-router-dom'

import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';

const FormBookUpdate = () => {

    const { id } = useParams()

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
        handleFileChange,
        handleRemoveFile,
        handleUpdateBook
    } = useProduct()
    const { category, setCategory } = useCategory()
    const { authors, setAuhors } = useAuthor()
    const { booklayouts, setBooklayouts } = useBooklayouts()
    const { languages, setLanguages } = useLanguages()
    const { publishers, setPublishers } = usePublishers()
    const { promotions, setPromotions } = usePromotions()

    const [productsData, setProductsData] = useState(null);
    const fetchProducts = async (e) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/books/${id}`);
            const bookData = response.data;


            console.log('axios', bookData)

            setProductsData(bookData.data);

            setName(bookData.data.attributes.name)
            setCategorySelected(String(bookData.data.attributes.category.id))
            setPublisherSelected(String(bookData.data.attributes.publisher.id))
            setLanguageSelected(String(bookData.data.attributes.language.id))
            setBooklayoutSelected(String(bookData.data.attributes.booklayout.id))
            setPromotionSelected(String(bookData.data.attributes.promotion.id))
            setDescription(bookData.data.attributes.description)
            setQuantity(bookData.data.attributes.quantity.toString())
            setPrice(bookData.data.attributes.price.toString())
            setAuthorSelected(bookData.data.attributes.authors.map(author => String(author.id)));
            // Assuming bookData.data.attributes.publication_day is in the format "yyyy-MM-ddTHH:mm:ss.000000Z"
            const defaultDate = bookData.data.attributes.publication_day;

            // Extract only the date part (yyyy-MM-dd)
            const formattedDefaultDate = new Date(defaultDate).toISOString().split('T')[0];

            setDate(formattedDefaultDate);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };



    useEffect(() => {
        document.title = 'Book Update';

        fetchProducts();
    }, [id]);

    const handleDateChange = (e) => {
        console.log('New date value:', e.target.value);
        setDate(e.target.value);
    };

    const handleUpdateBookSubmit = async (e) => {
        e.preventDefault()
        await handleUpdateBook(id)
    }

    const handleUploadImage = async () => {
        try {
            const formData = new FormData();
            selectedFiles.forEach((file) => {
                formData.append('image_path[]', file);
            });

            const response = await axios.post(`http://127.0.0.1:8000/api/books/uploadimage/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchProducts()

            console.log('Upload Image Response:', response.data);

            // Clear selected files after successful upload
            setSelectedFiles([]);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    const columns = [
        {
            name: 'id',
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: 'Image',
            selector: 'image',
            sortable: false,
            cell: (row) =>
                <img src={`http://127.0.0.1:8000/images/${row.image_path}`}
                    alt={row.id}
                    className="object-contain object-center w-64 h-64 block" />,
        },
        {
            name: 'action',
            customButton: true,
            cell: (row) => {
                const handleDeleteClick = async (row) => {
                    try {
                        const imageId = row.id; // Replace 'imageId' with the actual property name in your data

                        // Send a post request to the Laravel backend
                        const response = await axios.post(`http://127.0.0.1:8000/api/books/${id}/images/${imageId}`);

                        fetchProducts()
                        toast.success('Xóa hình ảnh thành công');

                    } catch (error) {
                        // Handle errors and display an error message
                        console.error('Error:', error.response ? error.response.data : error.message);
                        toast.error('Xóa không thành công')
                    }

                }
                return (
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={() => handleDeleteClick(row)}
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none 
                  focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 
                  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 
                  uppercase whitespace-nowrap ml-2"
                        >
                            Delete
                        </button>
                    </div>
                )

            },
        },
    ];



    console.log('name', name)
    console.log('category selected', categorySelected)
    console.log('date', date)
    console.log('mutiple author', authorSelected)
    console.log('book data', productsData)

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
                        <option value='' disabled >Chọn </option>
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
                    <label htmlFor="Author" className="block mb-2 text-sm font-medium text-gray-900 
                    dark:text-white">
                        Tác giả</label>
                    <select
                        id="multiSelection"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => {
                            const selectedValue = e.target.value;
                            if (authorSelected.includes(selectedValue)) {
                                // Remove the author if already selected
                                setAuthorSelected(prevAuthors => prevAuthors.filter(author => author !== selectedValue));
                            } else {
                                // Add the author if not selected
                                setAuthorSelected(prevAuthors => [...prevAuthors, selectedValue]);
                            }
                        }}
                        value={authorSelected}
                        data-te-select-init
                        multiple>
                        {
                            authors.map((cat) => (
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
                        onChange={handleDateChange}
                        value={date}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className='mb-6'>
                    <label htmlFor="quantity"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Số lượng
                    </label>
                    <input
                        type="quantity"  // This should be type="number" if quantity is a number
                        id="quantity"
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                         rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập số lượng"
                        required
                    />
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
                <div className='mb-4 mr-5 justify-center items-center'>
                    <button
                        type="submit"
                        onClick={handleUpdateBookSubmit}
                        className=" text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none 
                    focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 
                    text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 uppercase">
                        Lưu
                    </button>
                </div>
            </form>
            <div className="flex flex-col justify-start w-full ml-5">
                <h2 className="text-xl text-blue-500 tracking-widest font-medium title-font uppercase mb-1">
                    Quản lý hình ảnh của sản phẩm</h2>
                <hr className='mt-5 text-gray-600 w-auto '>
                </hr>
            </div>
            <div className="mt-5 mb-6 ml-5">
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
                {selectedFiles.length > 0 && (
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
                        <button
                            onClick={handleUploadImage}
                            className="mt-3 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
                        >
                            Upload
                        </button>
                    </div>
                )}
            </div>

            {productsData && (
                <div className='flex flex-wrap justify-center items-center mr-5 ml-5' >
                    <DataTable
                        columns={columns}
                        data={productsData.attributes.image}
                        pagination
                        responsive
                        striped
                        highlightOnHover
                        sortActive
                    />
                </div>
            )}
        </div>
    )
}

export default FormBookUpdate