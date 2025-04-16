import axiosInstance from "../axios/axiosInstance";

type ApiResponse<T> = {
    meta: {
        code: number;
        status: string;
        message: string;
    };
    data: T
}


const apiService = {
    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        const response = await axiosInstance.get<ApiResponse<T>>('/api' + endpoint);
        return response.data;
    },

    async post<T>(endpoint: string, payload: Record<string, unknown>): Promise<ApiResponse<T>> {
        const response = await axiosInstance.post<ApiResponse<T>>('/api' + endpoint, payload);
        return response.data;
    },

};

export default apiService;