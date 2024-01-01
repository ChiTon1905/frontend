import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseISO } from 'date-fns';


const PromotionsContext = createContext()

const url1 = 'http://127.0.0.1:8000/api/promotions'
const url2 = 'https://bookstore2001.000webhostapp.com/api/promotions'

export const PromotionsContextProvider = ({ children }) => {
    const [promotions, setPromotions] = useState([])
    const [filterData, setFilterData] = useState([])
    const [discount, setDiscount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate()


    const [isValidName, setIsValidName] = useState(true);

    const [isValidDiscount, setIsValidDiscount] = useState(true);

    const fetchPromotions = async () => {
        try {
            const respone = await axios.get(url1)
                .then(response => {
                    console.log(response.data)
                    setPromotions(response.data.data)
                    setFilterData(response.data.data)
                })
        } catch (error) {
            console.error('error fetching', error)
        }
    }

    useEffect(() => {
        fetchPromotions()
    }, [])


    const handleDiscountChange = (e) => {
        const inputValue = e.target.value;

        // Kiểm tra xem giá trị nhập vào có phải là số, không chứa ký tự % và nằm trong khoảng từ 1 đến 100
        if (/^(?:[1-9][0-9]?|100)?$/.test(inputValue) || inputValue === '') {
            setDiscount(inputValue);
            setIsValidDiscount(true);
        } else {
            // Nếu không hợp lệ, cập nhật trạng thái lỗi
            setIsValidDiscount(false);

        }
    }
    const createPromotion = async () => {
        const formData = new FormData();
        const formattedStartDate = new Date(startDate).toISOString().split('T')[0];

        const formattedEndDate = new Date(endDate).toISOString().split('T')[0];

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/promotions/store', {
                name: name,
                start_date: formattedStartDate,
                end_date: formattedEndDate,
                discount: (discount / 100) ,
                description: description
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
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
            fetchPromotions()

            setName('')
            setStartDate('')
            setEndDate('')
            setDescription('')
            setDiscount('')
            navigate('/admin/Promotion')
        } catch (error) {
            console.error('Error creating Promotion:', error);
        }
    };

    const updatePromotion = async (id) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/promotions/${id}`, {
                name: name,
                start_date: startDate,
                end_date: endDate,
                description: description
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
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
            fetchPromotions();
            navigate('/admin/Promotion')
        } catch (error) {
            console.error('Error updating Promotion:', error);
        }
    };

    const deletePromotion = async (id) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/promotions/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.status === 204) {
                setPromotions(prevPromotions => prevPromotions.filter(Promotion => Promotion.id !== id));
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
            fetchPromotions()
        } catch (error) {
            console.error('Error deleting Promotion:', error);
            toast.error('Đã có sách ', {
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



    return (
        <PromotionsContext.Provider
            value={{
                promotions,
                setPromotions,
                filterData,
                setFilterData,
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
                fetchPromotions,
                createPromotion,
                updatePromotion,
                deletePromotion,
                isValidName,
                setIsValidName,
                isValidDiscount,
                setIsValidDiscount,
                handleDiscountChange

            }}
        >
            {
                children
            }
        </PromotionsContext.Provider>
    )
}

export const usePromotions = () => useContext(PromotionsContext)