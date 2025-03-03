import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const axiosInstance = axios.create({});

export const apiConnector = async (
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    bodyData?: never,
    headers?: Record<string, string>,
    params?: Record<string, never>
): Promise<AxiosResponse<never>> => {
    // @ts-expect-error
    const config: AxiosRequestConfig = {
        method,
        url,
        data: bodyData || null,
        headers: headers || null,
        params: params || null,
    };

    return axiosInstance(config);
};