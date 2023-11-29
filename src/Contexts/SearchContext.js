import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SearchContext = createContext()

const url1 = 'http://127.0.0.1:8000/api/books'
const url2 = 'https://bookstore2001.000webhostapp.com/api/books'

const initialState = {
    books: [],
    filters: {
        language: '',
        publisher: '',
        booklayout: '',
        author: '',
        categories: '',
    },
    search: '',
    sort_by: 'name',
    sort_order: 'asc',
    per_page: 8,
};

const bookReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BOOKS':
            return { ...state, books: action.payload };
        case 'SET_FILTERS':
            return { ...state, filters: action.payload };
        case 'SET_CATEGORIES':
            return { ...state, categories: action.payload };
        case 'SET_AUTHOR':
            return { ...state, author: action.payload };
        case 'SET_PUBLISHER':
            return { ...state, publisher: action.payload };
        case 'SET_BOOKLAYOUT':
            return { ...state, booklayout: action.payload };
        case 'SET_LANGUAGE':
            return { ...state, language: action.payload };
        case 'SET_SEARCH':
            return { ...state, search: action.payload };
        case 'SET_SORT':
            return {
                ...state,
                sort_by: action.payload.sort_by,
                sort_order: action.payload.sort_order,
            };
        default:
            return state;
    }
};

export const SearchContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const [state, dispatch] = useReducer(bookReducer, initialState);

    return (
        <SearchContext.Provider
            value=
            {{
                state,
                dispatch
            }}
        >
            {
                children
            }
        </SearchContext.Provider>
    )
}

export const useSearch = () => useContext(SearchContext)