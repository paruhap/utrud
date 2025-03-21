import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '../services/auth.service';

export const useAuth = () => {
    const router = useRouter();
    const authService = new AuthService();
    const isAuthenticated = ref(false);

    const checkAuth = () => {
        const token = authService.getToken();
        isAuthenticated.value = !!token;
        return !!token;
    };

    const login = async (email, password) => {
        try {
            await authService.login(email, password);
            isAuthenticated.value = true;
            
            // Проверяем сохраненный путь для редиректа
            const redirectPath = localStorage.getItem('redirect_after_login');
            localStorage.removeItem('redirect_after_login');
            
            if (redirectPath) {
                router.push(redirectPath);
            } else {
                router.push('/admin/users');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = () => {
        authService.removeToken();
        isAuthenticated.value = false;
        router.push('/admin/login');
    };

    const makeAuthRequest = async (url, options = {}) => {
        const token = authService.getToken();
        if (!token) {
            throw new Error('AUTH_ERROR');
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...(options.headers || {})
        };

        const response = await fetch(url, {
            ...options,
            headers
        });

        if (response.status === 401) {
            authService.removeToken();
            throw new Error('AUTH_ERROR');
        }

        return response;
    };

    // Проверяем авторизацию при создании
    if (process.client) {
        checkAuth();
    }

    return {
        isAuthenticated,
        checkAuth,
        login,
        logout,
        authService,
        makeAuthRequest
    };
};
