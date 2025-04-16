import apiService from "../common/response/apiResponse";

type AuthResponse = {
    access_token: string;
};


export const loginAction = async (
    username: string,
    password: string
): Promise<{
    meta: {
        code: number;
        status: string;
        message: string;
    };
    data: AuthResponse;
}> => {
    try {
        const res = await apiService.post<AuthResponse>('/auth/login', { username, password });
        return res;
    } catch (err: any) {
        const errorMessage = err.response?.data?.meta?.message || 'Login failed. Please try again.';
        throw new Error(errorMessage);
    }
};


export const registerAction = async (
    username: string,
    password: string
): Promise<{
    meta: {
        code: number;
        status: string;
        message: string;
    };
    data: AuthResponse;
}> => {
    try {
        const res = await apiService.post<AuthResponse>('/auth/register', { username, password });
        return res;
    } catch (err: any) {
        const errorMessage = err.response?.data?.meta?.message || 'Regsiter failed. Please try again.';
        throw new Error(errorMessage);
    }
};
