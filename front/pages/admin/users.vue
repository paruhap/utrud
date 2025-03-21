<template>
    <div>
        <h3>Управление пользователями</h3>
        
        <client-only>
            <div v-if="isAuthenticated">
                <button @click="showRegisterModal = true" class="add-user-btn">Добавить нового пользователя</button>

                <!-- Список пользователей -->
                <div class="users-list">
                    <div v-for="user in users" :key="user.id" class="user-card">
                        <div class="user-info">
                            <h3>{{ user.name || 'No name' }}</h3>
                            <p><strong>Email:</strong> {{ user.email }}</p>
                            <p><strong>Phone:</strong> {{ user.phone || 'Not specified' }}</p>
                            <p><strong>Alt. Phone:</strong> {{ user.phone2 || 'Not specified' }}</p>
                            <p><strong>Address:</strong> {{ user.address || 'Not specified' }}</p>
                            <p><strong>Telegram:</strong> {{ user.telegram || 'Not specified' }}</p>
                        </div>
                        <div class="user-actions">
                            <button @click="openEditForm(user)">Редактировать</button>
                            <button @click="deleteUser(user.id)" class="delete-btn">Удалить</button>
                        </div>
                    </div>
                </div>

                <!-- Модальное окно редактирования с полными данными -->
                <div v-if="editingUser" class="modal">
                    <div class="modal-content">
                        <h2>Редактировать пользователя</h2>
                        <div class="form-grid">
                            <input v-model="editingUser.name" type="text" placeholder="Name">
                            <input v-model="editingUser.phone" type="tel" placeholder="Phone">
                            <input v-model="editingUser.phone2" type="tel" placeholder="Alternative Phone">
                            <input v-model="editingUser.address" type="text" placeholder="Address">
                            <input v-model="editingUser.telegram" type="text" placeholder="Telegram">
                        </div>
                        <div class="modal-actions">
                            <button @click="saveEdit">Сохранить</button>
                            <button @click="cancelEdit" class="cancel-btn">Отмена</button>
                        </div>
                    </div>
                </div>

                <!-- Телепорт для формы регистрации -->
                <teleport to="body">
                    <div v-if="showRegisterModal" class="modal">
                        <div class="modal-content">
                            <h2>Новый Пользователь</h2>
                            <div class="register-grid">
                                <input v-model="newUser.email" type="email" placeholder="Email *" required>
                                <input v-model="newUser.password" type="password" placeholder="Password *" required>
                            </div>
                            <div class="modal-actions">
                                <button @click="registerUser" class="submit-btn">Зарегестрировать</button>
                                <button @click="closeRegisterModal" class="cancel-btn">Отмена</button>
                            </div>
                        </div>
                    </div>
                </teleport>
            </div>
            <div v-else>
                <p>Loading...</p>
            </div>
        </client-only>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';

// Initialize with default values to prevent hydration mismatch
const users = ref([]);
const editingUser = ref(null);
const newUser = ref({
    email: '',
    password: ''
});
const isLoading = ref(true);
const showRegisterModal = ref(false);

const router = useRouter();
const { isAuthenticated, checkAuth, authService } = useAuth();
const API_URL = process.env.API_URL || 'http://localhost:3000/api';

const redirectToLogin = () => {
    isAuthenticated.value = false;
    router.push('/admin/login');
};

const handleAuthError = () => {
    isAuthenticated.value = false;
    authService.removeToken();
    users.value = [];
    redirectToLogin();
};

const fetchUsers = async () => {
    try {
        const response = await authService.makeAuthRequest(`${API_URL}/users`);
        users.value = await response.json();
    } catch (error) {
        if (error.message === 'AUTH_ERROR') {
            handleAuthError();
        } else {
            console.error('Error fetching users:', error);
        }
    }
};

const registerUser = async () => {
    if (!newUser.value.email || !newUser.value.password) {
        alert('Email и пароль обязательны');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authService.getToken()}`
            },
            body: JSON.stringify({
                email: newUser.value.email,
                password: newUser.value.password,
                role: 'user',
                name: '', // Добавляем пустую строку для name
                phone: '',
                phone2: '',
                address: '',
                telegram: ''
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Ошибка при регистрации пользователя');
        }

        await fetchUsers();
        resetNewUser();
        showRegisterModal.value = false;
    } catch (error) {
        console.error('Registration error:', error);
        alert(error.message);
    }
};

const deleteUser = async (userId) => {
    try {
        await authService.makeAuthRequest(
            `${API_URL}/users/${userId}`,
            { method: 'DELETE' }
        );
        users.value = users.value.filter(user => user.id !== userId);
    } catch (error) {
        if (error.message === 'AUTH_ERROR') {
            handleAuthError();
        } else {
            alert('Ошибка при удалении пользователя: ' + error.message);
        }
    }
};

const openEditForm = (user) => {
    editingUser.value = { ...user };
};

const saveEdit = async () => {
    try {
        const response = await authService.makeAuthRequest(
            `${API_URL}/users/${editingUser.value.id}`,
            {
                method: 'PATCH',
                body: JSON.stringify(editingUser.value)
            }
        );
        const updatedUser = await response.json();
        const index = users.value.findIndex(u => u.id === updatedUser.id);
        users.value[index] = updatedUser;
        editingUser.value = null;
    } catch (error) {
        if (error.message === 'AUTH_ERROR') {
            handleAuthError();
        } else {
            alert('Failed to update user: ' + error.message);
        }
    }
};

const cancelEdit = () => {
    editingUser.value = null;
};

const resetNewUser = () => {
    newUser.value = {
        email: '',
        password: ''
    };
};

const closeRegisterModal = () => {
    showRegisterModal.value = false;
    resetNewUser();
};

onMounted(async () => {
    try {
        const isAuth = await checkAuth();
        if (!isAuth) {
            router.push('/admin/login');
            return;
        }
        await fetchUsers();
    } finally {
        isLoading.value = false;
    }
});

definePageMeta({
    middleware: 'admin-auth',
    layout: 'admin'
});
</script>

<style scoped>
.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
    margin-bottom: 20px;
}

.user-card {
    border-top: 1px solid var(--transparent-red-5);
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
}
.user-actions{
    display: flex;
    gap: 1rem;
}
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 4px;
    min-width: 300px;
}

.delete-btn {
    background-color: var(--transparent-red-5);
}

.cancel-btn {
    background-color: var(--transparent-gray-5);
}

.user-form {
    margin: 20px 0;
    display: flex;
    gap: 10px;
}

.user-form input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    padding: 8px 16px;
    background-color: var(--transparent-red-2);
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: var(--transparent-red-9);
}

ul {
    list-style: none;
    padding: 0;
}

li {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.register-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
    margin-bottom: 20px;
    max-width: 600px;
}

.add-user-btn {
    margin-bottom: 20px;
    background-color:var(--transparent-red-5);
}

.add-user-btn:hover {
    background-color:var(--transparent-red-9);
}

.modal-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 20px;
}

.submit-btn {
    background-color: var(--submit);
}

.submit-btn:hover {
    background-color: var(--transparent-red-9);
}
</style>