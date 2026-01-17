import axios from 'axios';

import { API_URL } from '../config';

export const analyzeImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_URL}/analyze`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const checkHealth = async () => {
    const response = await axios.get(`${API_URL}/health`);
    return response.data;
}
