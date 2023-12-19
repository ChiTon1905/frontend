import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const FormUserPermissions = () => {
    const [user, setUser] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams()

    const fetchPermissions = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/permissions')
            const Permissions = response.data.data
            setPermissions(Permissions)
            console.log('Permissionss', Permissions)

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
        fetchPermissions()
        fetchUserShow()
        document.title = 'Quyền hạn của user'
    }, [])
    
    const handlePermissionsChange = (PermissionsName) => {
        setSelectedPermissions((prevPermissions) => {
            // If the user already has the Permissions, remove it; otherwise, add it
            if (prevPermissions.includes(PermissionsName)) {
                // Using for loop to filter out the Permissions
                const updatedPermissions = [];
                for (let i = 0; i < prevPermissions.length; i++) {
                    if (prevPermissions[i] !== PermissionsName) {
                        updatedPermissions.push(prevPermissions[i]);
                    }
                }
                return updatedPermissions;
            } else {
                // Using spread operator to add the Permissions
                return [...prevPermissions, PermissionsName];
            }
        });
    };

    useEffect(() => {
        // If user.permissionss is available, set the initial selectedPermissionss
        if (user && user.permission) {
            setSelectedPermissions(user.permission);
        }
    }, [user]);


    const handleManageUserPermissions = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/manage-permissions-to-user/${id}`, {
                permissions: selectedPermissions,
            });

            console.log(response.data.message);
            toast.success(response.data.message);
            navigate('/admin/employees')
        } catch (error) {
            console.error('Error managing user Permissionss:', error.response.data.message);
        }
    };

    console.log('selected', selectedPermissions)

    if (permissions.length <= 0) return <div>Loading</div>

    return (
        <div className='mt-5 mr-5 ml-5'>
            <div className='containter border rounded-lg mr-5 ml-5 mt-5 mb-5 justify-center bg-white'>
                <h1 className="block mb-2 ml-5 mt-5 items-center justify-center text-xl font-medium text-gray-900 dark:text-white uppercase">
                    Quyền hạn người dùng
                </h1>
                <hr className='w-11/12 items-center justify-center ml-5'>
                </hr>
                <div className='mb-5'>
                    {permissions.map((permissions) => (
                        <div className="flex items-center mt-4 ml-5" key={permissions.id}>
                             <input
                                id={`Permissions-checkbox-${permissions.id}`}
                                type="checkbox"
                                value={permissions.name}
                                checked={selectedPermissions.includes(permissions.name)}
                                onChange={() => handlePermissionsChange(permissions.name)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded 
                            focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
                            focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                                htmlFor={`Permissions-checkbox-${permissions.id}`}
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {permissions.name}
                            </label>
                        </div>
                    ))}
                    <div className='mt-5 ml-5 '>
                        <button
                            type="button"
                            onClick={handleManageUserPermissions}
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

export default FormUserPermissions