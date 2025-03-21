import AuthService from '../services/auth.service';

export default defineNuxtRouteMiddleware(async (to) => {
    if (process.client) {
        if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
            const token = localStorage.getItem('admin_token');
            if (!token) {
                return navigateTo('/admin/login');
            }
        }
    }
});
