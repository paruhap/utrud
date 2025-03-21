<template>
    <form class="login-form" @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required>
        <input v-model="password" type="password" placeholder="Пароль" required>
        <button type="submit" :disabled="loading">
            {{ loading ? 'Вход...' : 'Войти' }}
        </button>
        <p v-if="error" class="error">{{ errorMessage }}</p>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '../../composables/useAuth';

const { login } = useAuth();
const email = ref('');
const password = ref('');
const error = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
    loading.value = true
    error.value = false
    errorMessage.value = ''
    
    try {
        await login(email.value, password.value);
    } catch (error) {
        alert(error.message);
        error.value = true
        errorMessage.value = 'Ошибка при попытке входа'
    } finally {
        loading.value = false
    }
}
</script>

<script>
export default {
    layout: 'default',
}
</script>

<style scoped>
.login-form {
    max-width: 300px;
    margin: 50px auto;
}
.login-form input {
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
}
.error {
    color: red;
}
</style>