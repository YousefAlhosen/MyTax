import { useState } from "react";
import axios from 'axios';

const useApi = (initialState) => {
    const [data, setData] = useState(initialState);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Set the base URL for backend API
    const BASE_URL = 'http://localhost:5000';

    const apiCall = async (url, method = 'GET', payload = null) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios ({
                url: `${BASE_URL}${url}`,
                method,
                data: payload,
            });
            setData(response.data);
            return response.data;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, apiCall};

};

export default useApi;