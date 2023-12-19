import React, { useContext, useState, useEffect, createContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ProductContext = createContext();

const url = 'http://127.0.0.1:8000/api/books'
const urladmin = 'http://127.0.0.1:8000/api/books/index'


export const ProductContextProvider = ({ children }) => {


  const [amount, setAmount] = useState(1)
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categorySelected, setCategorySelected] = useState('');
  const [authorSelected, setAuthorSelected] = useState([]);
  const [publisherSelected, setPublisherSelected] = useState('');
  const [languageSelected, setLanguageSelected] = useState('');
  const [booklayoutSelected, setBooklayoutSelected] = useState('');
  const [promotionSelected, setPromotionSelected] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filterPublisherSelected, setFilterPublisherSelected] = useState('');


  const [products, setProducts] = useState([])
  const [productsData, setProductsData] = useState([])
  const [filterData, setFilterData] = useState([])
  const navigate = useNavigate()

  const fetchProducts = async () => {
    try {
      const respone = await axios.get(url)
        .then(response => {
          console.log(response.data)
          setProducts(response.data.data)
        })
    } catch (error) {
      console.error('error fetching', error)
    }
  }

  const fetchProductsTable = async () => {
    try {
      const params = {};

      if (filterPublisherSelected.length > 0) {
        params.publishers = filterPublisherSelected.join(',');
      }

      const response = await axios.get(urladmin, { params });

      // Update state variables with the received data
      setProductsData(response.data.data);
      setFilterData(response.data.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    fetchProductsTable()
  }, [filterPublisherSelected])

  const handleFileChange = (e) => {
    e.preventDefault()
    const files = e.target.files;
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleCreateBook = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData();
      const formattedDate = new Date(date).toISOString().split('T')[0];

      // Append individual form fields to FormData
      formData.append('name', name);
      formData.append('publication_day', formattedDate);
      formData.append('quantity', quantity);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('categories_id', categorySelected);
      formData.append('publisher_id', publisherSelected);
      formData.append('language_id', languageSelected);
      formData.append('booklayout_id', booklayoutSelected);
      formData.append('promotion_id', promotionSelected);

      // Append each author to FormData
      authorSelected.forEach((author, index) => {
        formData.append(`author_id[${index}]`, author.value); // Use author.value instead of author
      });

      // Append each selected file to FormData
      selectedFiles.forEach((file, index) => {
        formData.append(`image_path[${index}]`, file);
      });

      const response = await axios.post('http://127.0.0.1:8000/api/books/store', formData);

      toast.success("Thêm sách thành công")

      fetchProductsTable()
      setName('')
      setAuthorSelected([])
      setCategorySelected('')
      setBooklayoutSelected('')
      setPublisherSelected('')
      setLanguageSelected('')
      setPromotionSelected('')
      setDate('')
      setQuantity('')
      setPrice('')
      setSelectedFiles([])
      navigate('/admin/book')

      console.log(response.data); // Handle the response from the server as needed
    } catch (error) {
      console.error('Error creating book:', error);
      toast.error("Thêm sách thất bại")
    }
  };

  const handleUpdateBook = async (id) => {
    try {
      const updatedBookData = {
        name,
        description,
        publication_day: date, // Make sure 'date' is set in your component state
        quantity: parseInt(quantity),
        price: parseFloat(price),
        categories_id: parseInt(categorySelected),
        promotion_id: parseInt(promotionSelected),
        booklayout_id: parseInt(booklayoutSelected),
        publisher_id: parseInt(publisherSelected),
        language_id: parseInt(languageSelected),
        author_id: authorSelected.map((author) => parseInt(author.value)),
      };

      // Assuming 'id' is available in your component
      const response = await axios.post(`http://127.0.0.1:8000/api/books/${id}`, updatedBookData);

      console.log('Updated book data:', response.data);
      fetchProductsTable()
      setName('')
      setAuthorSelected([])
      setCategorySelected('')
      setBooklayoutSelected('')
      setPublisherSelected('')
      setLanguageSelected('')
      setPromotionSelected('')
      setDate('')
      setQuantity('')
      setPrice('')
      setSelectedFiles([])
      navigate('/admin/book')

      toast.success("Cập nhật sách thành công")

      // Handle success, show a message, redirect, etc.
    } catch (error) {
      console.error('Error updating book:', error);
      toast.error("Cập nhật sách thất bại")
      // Handle error, display a message, etc.
    }
  };

  const deleteBook = async (id) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/books/delete/${id}`);
      if (response.status === 204) {
        setProductsData(prev => prev.filter(productsData => productsData.id !== id));
        toast.success('Thành công !!!!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      fetchProductsTable()
    } catch (error) {
      console.error('Error deleting :', error);
      toast.error('Đã có sách trong đơn hàng', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleCheckboxChange = (publisher) => {
    setFilterPublisherSelected((prevPublishers) => {
      if (prevPublishers.includes(publisher)) {
        // If already selected, remove it
        return prevPublishers.filter((p) => p !== publisher);
      } else {
        // If not selected, add it
        return [...prevPublishers, publisher];
      }
    });
  };


  const bookState = {
    products,
    filterData,
    amount,
    name,
    date,
    quantity,
    price,
    description,
    categorySelected,
    authorSelected,
    publisherSelected,
    languageSelected,
    booklayoutSelected,
    promotionSelected,
    selectedFiles,
    productsData,
    filterPublisherSelected,
  };

  const bookActions = {
    setProducts,
    setFilterData,
    setAmount,
    setName,
    setDate,
    setQuantity,
    setPrice,
    setDescription,
    setCategorySelected,
    setAuthorSelected,
    setPublisherSelected,
    setLanguageSelected,
    setBooklayoutSelected,
    setPromotionSelected,
    setSelectedFiles,
    handleFileChange,
    handleRemoveFile,
    handleCreateBook,
    setProductsData,
    handleUpdateBook,
    deleteBook,
    handleCheckboxChange, 
    setFilterPublisherSelected,
  };



  const deleteProduct = () => { }

  return (
    <ProductContext.Provider
      value={{ ...bookState, ...bookActions }}

    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => useContext(ProductContext)