import React from 'react'
import axios from 'axios'

const API_URL = 'https://reqres.in/api/'

export const loginUser = async (email,password) => {
    try {
        const response = await axios.post(`${API_URL}login`,{
            email,
            password
        })
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Login Failed!!, Try Again";
    }
}

export const fetchUsers = async(page) => {
    try {
        const response = await axios.get(`${API_URL}users?page=${page}`)
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Failed to fetch users!";
    }
} 

export const deleteUser = async(id) => {
    try {
        const response = await axios.delete(`${API_URL}users/${id}`)
    } catch (error) {
        throw error.response?.data?.error || `Failed to delete user ${id} !`;
    }
}
export const updateUser = async(id,userData) => {
    try {
        const response = await axios.put(`${API_URL}users/${id}`,userData)
        return response.data;
    } catch (error) {
        console.error("Error updating user",error)
        throw error
    }
}

