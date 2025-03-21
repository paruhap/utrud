<script setup>
import { useRouter } from 'vue-router';
import { useAuth } from '../../composables/useAuth';

const router = useRouter();
const { logout } = useAuth();
</script>

<template>
    <header class="admin-header">
        <div class="menu-admin">
            <nuxt-link to="/admin/users">Пользователи</nuxt-link>
            <nuxt-link to="/admin/services">Услуги</nuxt-link>
            <nuxt-link to="/admin/content">Контент</nuxt-link>
        </div>
        <button class="logout-btn" @click="logout">Выйти</button>
    </header>
</template>

<style scoped>
.admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid var(--transparent-red-2);
    box-shadow: 0 0 10px var(--transparent-red-2);
}

.menu-admin {
    display: flex;
    gap: 1rem;
}

.logout-btn {
    padding: 0.5rem 1rem;
    background-color: var(--transparent-red-5);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.logout-btn:hover {
    background-color: var(--transparent-red-9);
}
</style>