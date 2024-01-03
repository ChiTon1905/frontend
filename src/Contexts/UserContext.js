import React, { useContext, useState, useEffect, createContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const urlbackend = 'https://bookstore2001.000webhostapp.com/'
const urllocalhost = 'http://127.0.0.1:8000/api/'

axios.defaults.withCredentials = true;


const userContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [genre, setGenre] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidName, setIsValidName] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidPasswordConfirmation, setIsPasswordConfirmation] = useState(true);
    const [isValidPhone, setIsValidPhone] = useState(true);

    const [employee, setEmployee] = useState([])
    const [filterData, setFilterData] = useState([])

    const navigate = useNavigate();
    // Real-time validation
    const validateName = (name) => {
        return name.length >= 3;
    }

    const validatePassword = (password) => {
        return password.length >= 8;
    }

    const validatePasswordConfirmation = (passwordConfirmation, password) => {

        return passwordConfirmation === password;
    };

    const validatePhone = (phone) => {
        return phone.length >= 9;
    }


    const validateEmail = (email) => {
        // Basic email validation using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleNameChange = (event) => {
        const newName = event.target.value;
        const isValidName = validateName(newName);

        setName(newName);
        setIsValidName(isValidName);
    };

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        const isValidEmail = validateEmail(newEmail);

        setEmail(newEmail);
        setIsValidEmail(isValidEmail);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        const isValidPassword = validatePassword(newPassword);

        setPassword(newPassword);
        setIsValidPassword(isValidPassword);
    }

    const handlePasswordConfirmationChange = (event) => {
        const newPasswordConfirmation = event.target.value;
        const isValidPasswordConfirmation = validatePasswordConfirmation(newPasswordConfirmation, password)

        setPasswordConfirmation(newPasswordConfirmation);
        setIsPasswordConfirmation(isValidPasswordConfirmation)
    };

    const handlePhoneChange = (e) => {
        const newPhone = e.target.value;
        const isValidPhone = validatePhone(newPhone);

        setPhone(newPhone);
        setIsValidPhone(isValidPhone);
    }

    const handleAddressChange = (e) => {
        const newAdd = e.target.value;


        setAddress(newAdd);

    }
    const updateUser = (userData) => {
        setUser(userData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie")

        const respone = axios.post('http://127.0.0.1:8000/api/login', {
            email: email,
            password: password
        })
            .then(response => {
                setUser(response.data.data.user);
                const token = response.data.data.token
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
                localStorage.setItem('token', token)
                if (response.data.data.user) {
                    setName(response.data.data.user.name);
                    setAddress(response.data.data.user.address);
                    setPhone(response.data.data.user.phone);
                    setEmail(response.data.data.user.email)
                }

                console.log(response.data.data);
                toast.success('Đăng nhập thành công', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .catch(error => {
                console.error(error.message);
                toast.error(error.response.data.message)
            });



    };


    const handleLogout = async () => {

        await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie")
        setUser(null);
        setName(null);
        setAddress(null);
        setEmail(null);
        setPhone(null);
        try {
            await axios.post('http://127.0.0.1:8000/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Logout failed', error);
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!isValidEmail) {
            alert('Invalid email address');
            return;
        }
        if (!isValidName) {
            alert('Invalid name');
            return;
        }

        if (!isValidPassword) {
            alert('Invalid password');
            return;
        }

        await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie")

        axios.post('http://127.0.0.1:8000/api/register', {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation
        })
            .then(response => {
                console.log(response.data, 'register');
                navigate('/login')
            })
            .catch(error => {
                console.error(error.response.data);
            });
    };

    useEffect(() => {
        console.log("User object:", user);
        console.log("User roles:", user ? user.roles : null);


        if (user && user.roles && user.roles.length > 0) {
            const isAdmin = user.roles.some(role => role.name === 'admin');
            const isEmployee = user.roles.some(role => role.name === 'employee');
            if (isAdmin || isEmployee) {
                console.log("Navigating to /admin");
                navigate('/admin');
            } else {
                console.log("Navigating to /");
                navigate('/');
            }
        } else if (user && (!user.roles || user.roles.length === 0)) {

            console.log("User has no roles");

            navigate('/');
        } else {
            console.log("User or roles information is missing");

        }
    }, [user]);

    useEffect(() => {
        if (!user) {
            const storedUser = localStorage.getItem('user');
            try {
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);

    const fetchEmployee = async () => {
        try {
            const respone = await axios.get('http://127.0.0.1:8000/api/employee')
                .then(response => {
                    console.log(response.data)
                    setEmployee(response.data.users)
                    setFilterData(response.data.users)
                })
        } catch (error) {
            console.error('error fetching', error)
        }
    }


    const handleCreateUser = async (e) => {

        e.preventDefault();
        if (!isValidEmail) {
            toast.error('Invalid email address');
            return;
        }
        if (!isValidName) {
            toast.error('Invalid name');
            return;
        }

        if (!isValidPassword) {
            toast.error('Invalid password');
            return;
        }

        await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie")

        axios.post('http://127.0.0.1:8000/api/users/store', {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation
        })
            .then(response => {
                console.log(response.data, 'create user');
                setName('')
                setEmail('')
                setPassword('')
                setPasswordConfirmation('')
                toast.success('Tạo user thành công')
                navigate('/admin/employees')
            })
            .catch(error => {
                console.error(error.response.data);
            });
    };

    const handleUpdateUser = async (id) => {

        if (!isValidEmail) {
            toast.error('Invalid email address');
            return;
        }
        if (!isValidName) {
            toast.error('Invalid name');
            return;
        }

        if (!isValidPassword) {
            toast.error('Invalid password');
            return;
        }

        await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie")

        axios.post(`http://127.0.0.1:8000/api/users/${id}`, {
            name: name,
            email: email,
            genre: genre,
            address: address,
            phone: phone
        })
            .then(response => {
                console.log(response.data, 'update user');
                setName('')
                setEmail('')
                setPassword('')
                setPasswordConfirmation('')
                setAddress('')
                setGenre('')
                setPhone('')
                toast.success('Cập nhật thành công')
                navigate('/admin/employees')
            })
            .catch(error => {
                console.error(error.response.data);
                toast.error('Lỗi cập nhật')
            });
    };

    const handleDeleteEmployees = async (id) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/users/delete/${id}`);
            if (response.status === 204) {
                setEmployee(prevEmployee => prevEmployee.filter(Employee => Employee.id !== id));
                toast.success('Thành công !!!!');
            }
            fetchEmployee()
        } catch (error) {
            console.error('Error deleting Publisher:', error);
            toast.error('Error ');
        }
    }


    return (
        <userContext.Provider
            value=
            {{
                handleSubmit,
                user,
                setUser,
                email,
                setEmail,
                password,
                setPassword,
                passwordConfirmation,
                setPasswordConfirmation,
                name,
                setName,
                handleLogout,
                handleRegister,
                updateUser,
                handleNameChange,
                handleEmailChange,
                handlePasswordChange,
                handlePasswordConfirmationChange,
                isValidEmail,
                isValidName,
                isValidPassword,
                isValidPasswordConfirmation,
                address,
                setAddress,
                phone,
                setPhone,
                isValidPhone,
                setIsValidPhone,
                handlePhoneChange,
                handleAddressChange,
                genre,
                setGenre,
                handleCreateUser,
                handleUpdateUser,
                fetchEmployee,
                employee,
                setEmployee,
                filterData,
                setFilterData,
                handleDeleteEmployees,


            }}

        >
            {children}
        </userContext.Provider>
    )
}

export const useUser = () => useContext(userContext)