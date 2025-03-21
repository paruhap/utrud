export default class AuthService {
    constructor(baseUrl = process.env.API_URL || 'http://localhost:3000/api') {
        this.baseUrl = baseUrl;
    }

    isClient() {
        return typeof window !== 'undefined';
    }

    async login(email, password) {
        const response = await fetch(`${this.baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error(response.status === 401 ? 'Неверные учетные данные' : 'Ошибка входа');
        }

        const data = await response.json();
        this.setToken(data.access_token);
        return data;
    }

    setToken(token) {
        if (this.isClient()) {
            localStorage.setItem('admin_token', token);
        }
    }

    getToken() {
        if (this.isClient()) {
            const token = localStorage.getItem('admin_token');
            return token;
        }
        return null;
    }

    removeToken() {
        if (this.isClient()) {
            localStorage.removeItem('admin_token');
        }
    }

    async makeAuthRequest(url, options = {}) {
        const token = this.getToken();
        if (!token) {
            console.error('No token found!'); // добавляем отладку
            throw new Error('No token found');
        }

        const finalOptions = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...(options.headers || {})
            }
        };

        try {
            const response = await fetch(url, finalOptions);

            if (response.status === 401) {
                this.removeToken();
                throw new Error('AUTH_ERROR');
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response;
        } catch (error) {
            if (error.message === 'AUTH_ERROR') {
                this.removeToken();
            }
            throw error;
        }
    }

    isAuthenticated() {
        return !!this.getToken();
    }
}
