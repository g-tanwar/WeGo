import api from './api';

export const uploadMedia = async (file: File): Promise<{ url: string; public_id: string; resource_type: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};
