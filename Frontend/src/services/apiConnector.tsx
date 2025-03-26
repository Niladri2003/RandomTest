import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const axiosInstance = axios.create({});

export const apiConnector = async (
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    bodyData?: Record<string, any>,
    headers?: Record<string, string>,
    params?: Record<string, any>
): Promise<AxiosResponse<never>> => {
    const config: AxiosRequestConfig = {
        method,
        url,
        data: bodyData || null,
        headers: headers || undefined,
        params: params || undefined,
    };

    return axiosInstance(config);
};