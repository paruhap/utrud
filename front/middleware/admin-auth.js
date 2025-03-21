export default defineNuxtRouteMiddleware((to) => {
    // Пропускаем проверку для страницы логина
    if (to.path === '/admin/login') {
        return;
    }

    // Проверяем только на клиенте
    if (process.client) {
        const token = localStorage.getItem('admin_token');
        
        // Если нет токена и путь начинается с /admin
        if (!token && to.path.startsWith('/admin')) {
            // Сохраняем путь для редиректа после логина
            localStorage.setItem('redirect_after_login', to.fullPath);
            return navigateTo('/admin/login');
        }
    }
});
