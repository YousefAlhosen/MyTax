import { useState } from "react";
import axios from 'axios';

// This caching approach stores the API responses in a local variable cache, 
// which is reused if the same request is made again.
const cache ={};

const useApi = (initialState) => {
    const [data, setData] = useState(initialState);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Set the base URL for backend API
    const BASE_URL = 'http://localhost:5000';

    const apiCall = async (url, method = 'GET', payload = null) => {
        setLoading(true);
        setError(null);

        // Check if data is already cached
        if (cache[url]) {
            setData(cache[url]);
            setLoading(false);
            return cache[url];
        }

        try {
            const response = await axios ({
                url: `${BASE_URL}${url}`,
                method,
                data: payload,
            });
            setData(response.data);
            cache[url] = response.data;
            return response.data;
        } catch (err) {
            if (err.response && err.response.data){
                setError(err.response.data);
            } else {
                setError(err.message || 'An error occurred');

            }
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, apiCall};

};

export default useApi;