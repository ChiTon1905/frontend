import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const FormUserRole = () => {
    const [user, setUser] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams()

    const fetchRole = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/roles')
            const roles = response.data.data
            setRoles(roles)
            console.log('roles', roles)

        } catch (error) {
            console.log(error.response.data)
        }
    }

    const fetchUserShow = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/users/${id}`)
            const user = response.data.data
            console.log('user', user)
            setUser(user)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchRole()
        fetchUserShow()
        document.title = 'Vai trò của user'
    }, [])
    
    const handleRoleChange = (roleName) => {
        setSelectedRoles((prevRoles) => {
            // If the user already has the role, remove it; otherwise, add it
            if (prevRoles.includes(roleName)) {
                // Using for loop to filter out the role
                const updatedRoles = [];
                for (let i = 0; i < prevRoles.length; i++) {
                    if (prevRoles[i] !== roleName) {
                        updatedRoles.push(prevRoles[i]);
                    }
                }
                return updatedRoles;
            } else {
                // Using spread operator to add the role
                return [...prevRoles, roleName];
            }
        });
    };

    useEffect(() => {
        // If user.roles is available, set the initial selectedRoles
        if (user && user.roles) {
            setSelectedRoles(user.roles);
        }
    }, [user]);


    const handleManageUserRoles = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/manage-role-to-user/${id}`, {
                roles: selectedRoles,
            });

            console.log(response.data.message);
            toast.success(response.data.message);
            navigate('/admin/employees')
        } catch (error) {
            console.error('Error managing user roles:', error.response.data.message);
        }
    };

    console.log('selected', selectedRoles)

    if (roles.length <= 0) return <div>Loading</div>

    return (
        <div className='mt-5 mr-5 ml-5'>
            <div className='containter border rounded-lg mr-5 ml-5 mt-5 mb-5 justify-center bg-white'>
                <h1 className="block mb-2 ml-5 mt-5 items-center justify-center text-xl font-medium text-gray-900 dark:text-white uppercase">
                    Vai trò người dùng
                </h1>
                <hr className='w-11/12 items-center justify-center ml-5'>
                </hr>
                <div className='mb-5'>
                    {roles.map((role) => (
                        <div className="flex items-center mt-4 ml-5" key={role.id}>
                             <input
                                id={`role-checkbox-${role.id}`}
                                type="checkbox"
                                value={role.name}
                                checked={selectedRoles.includes(role.name)}
                                onChange={() => handleRoleChange(role.name)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded 
                            focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
                            focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                                htmlFor={`role-checkbox-${role.id}`}
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {role.name}
                            </label>
                        </div>
                    ))}
                    <div className='mt-5 ml-5 '>
                        <button
                            type="button"
                            onClick={handleManageUserRoles}
                            className=" text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none 
                                    focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 
                                        text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 uppercase">
                            Lưu thay đổi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormUserRole