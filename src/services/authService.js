import { apiEndpoints, apiMethod } from "../constants/apiConstants";
import { apiClient } from "../utils/apiClient";

export const authService  =  {
    isAuthenticated:  false,

    async login(email, password) {
        debugger
        try {
            const response = await apiClient(`${apiEndpoints.USERS}/login`, {
                method: apiMethod.POST,
                body: {email, password}
            });

            this.isAuthenticated = true;
            return { data: response, message: 'Login Successful'};
        } catch (error) {
            throw new Error(error.message || 'Invalid username or password');
        }
    },

    logout() {
        this.isAuthenticated = false;
    },

    isLoggedIn() {
        return this.isAuthenticated;
    }
}