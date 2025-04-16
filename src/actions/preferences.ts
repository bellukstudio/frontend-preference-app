import apiService from "../common/response/apiResponse";


export type PreferenceResponse = {
    theme: string;
    language: string;
    notifications: boolean;
};

export const getPreference = async (): Promise<PreferenceResponse> => {
    const response = await apiService.get<PreferenceResponse>('/preferences');
    return response.data;
}

export const updatePreference = async (data: PreferenceResponse): Promise<PreferenceResponse> => {
    const response = await apiService.post<PreferenceResponse>('/preferences', data);
    return response.data;
}