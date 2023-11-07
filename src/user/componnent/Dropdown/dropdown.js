import React, { useState } from 'react';
import { FiAlignJustify } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Dropdown = ({ cats = [] }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    onClick={toggleDropdown}
                    className="inline-flex justify-center w-full px-4 py-2 "
                >
                    <FiAlignJustify className="mr-1 mt-1" />
                    Danh mục
                </button>
            </div>
            {isOpen && (
                <div className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        {
                            cats.map((category, index) => {
                                return (
                                    <Link
                                        key={category.attributes.id}
                                        to="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        
                                    >
                                        {category.attributes.name}
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;