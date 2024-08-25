import { apiEndpoints, apiMethod } from "../constants/apiConstants";
import { apiClient } from "../utils/apiClient";

export const createUser = async (payload) => {
    try {
        const response = await apiClient(`${apiEndpoints.USERS}`, {
            method: apiMethod.POST,
            body: {...payload}
        });
        return { data: response, message: 'Sign up successful' };
    } catch (error) {
        throw new Error(error.message);
    }
}