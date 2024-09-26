import React, { createContext, useContext } from 'react';
import useApi from '../hooks/useApi';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const api = useApi();

    return (
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    );
};


export const useApiContext = () => {
    return useContext(ApiContext);
};