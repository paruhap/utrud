<template>
    <div class="services-page">
        <h1>Услуги</h1>
        <button @click="showAddModal = true" class="add-btn">Добавить услугу</button>
        <h2>Работодателю</h2>
            <div v-for="service in services" :key="service.id" class="services-category" v-show="service.category == 'Работодателю'" >
                <div class="services-card services-rabdat" >
            <div class="service-content">
                <h3 v-if="service.subcategory">Подкатегория: {{ service.subcategory }}</h3>
                <h3 v-if="service.title">Заголовок: {{ service.title }}</h3>
                <div v-if="service.subtitle">Подзаголовок: {{ service.subtitle }}</div>
                <p v-if="service.text">Текст: {{ service.text }}</p>
                <p v-if="service.price">Цена: {{ service.price }}</p> 
                <div v-if="service.link">Ссылка: {{ service.link }}</div>
            </div>
            <div class="service-actions">
                <button @click="editService(service)" class="edit-btn">Редактировать</button>
                <button @click="deleteService(service.id)" class="delete-btn">Удалить</button>
            </div>
                </div>
            </div>
        <h2>Работнику</h2>
            <div v-for="service in services" :key="service.id" class="services-category" v-show="service.category == 'Работнику'" >
                <div  class="services-card services-rabdat" >
                    <div class="service-content">
                        <h3 v-if="service.subcategory">Подкатегория: {{ service.subcategory }}</h3>
                        <h3 v-if="service.title">Заголовок: {{ service.title }}</h3>
                        <div v-if="service.subtitle">Подзаголовок: {{ service.subtitle }}</div>
                        <p v-if="service.text">Текст: {{ service.text }}</p>
                        <p v-if="service.price">Цена: {{ service.price }}</p> 
                        <div v-if="service.link">Ссылка: {{ service.link }}</div>
                    </div>
                    <div class="service-actions">
                        <button @click="editService(service)" class="edit-btn">Редактировать</button>
                        <button @click="deleteService(service.id)" class="delete-btn">Удалить</button>
                    </div>
                </div>
            </div>
        <h2>Самозанятому</h2>
            <div v-for="service in services" :key="service.id" class="services-category" v-show="service.category == 'Самозанятому'" >
                <div class="services-card services-rabdat" >
                    <div class="service-content">
                        <h3 v-if="service.subcategory">Подкатегория: {{ service.subcategory }}</h3>
                        <h3 v-if="service.title">Заголовок: {{ service.title }}</h3>
                        <div v-if="service.subtitle">Подзаголовок: {{ service.subtitle }}</div>
                        <p v-if="service.text">Текст: {{ service.text }}</p>
                        <p v-if="service.price">Цена: {{ service.price }}</p> 
                        <div v-if="service.link">Ссылка: {{ service.link }}</div>
                    </div>
                    <div class="service-actions">
                        <button @click="editService(service)" class="edit-btn">Редактировать</button>
                        <button @click="deleteService(service.id)" class="delete-btn">Удалить</button>
                    </div>
                </div>
            </div>
        <!-- Модальное окно добавления услуги -->
        <teleport to="body">
            <div v-if="showAddModal" class="modal">
                <div class="modal-content">
                    <h2>Добавить услугу</h2>
                    <form @submit.prevent="addService" class="service-form">
                        <input v-model="newService.category" required placeholder="Категория">
                        <input v-model="newService.subcategory" placeholder="Подкатегория">
                        <input v-model="newService.title" placeholder="Название">
                        <input v-model="newService.subtitle" placeholder="Подзаголовок">
                        <textarea v-model="newService.text" placeholder="Описание"></textarea>
                        <input v-model="newService.price" required placeholder="Цена">
                        <input v-model="newService.link" placeholder="Ссылка">
                        <div class="modal-actions">
                            <button type="submit" class="submit-btn">Сохранить</button>
                            <button type="button" @click="showAddModal = false" class="cancel-btn">Отмена</button>
                        </div>
                    </form>
                </div>
            </div>
        </teleport>

        <!-- Модальное окно редактирования услуги -->
        <teleport to="body">
            <div v-if="editingService" class="modal">
                <div class="modal-content">
                    <h2>Редактировать услугу</h2>
                    <form @submit.prevent="updateService" class="service-form">
                        <input v-model="editingService.category" required placeholder="Категория">
                        <input v-model="editingService.subcategory" placeholder="Подкатегория">
                        <input v-model="editingService.title" placeholder="Название">
                        <input v-model="editingService.subtitle" placeholder="Подзаголовок">
                        <textarea v-model="editingService.text" placeholder="Описание"></textarea>
                        <input v-model="editingService.price" required placeholder="Цена">
                        <input v-model="editingService.link" placeholder="Ссылка">
                        <div class="modal-actions">
                            <button type="submit" class="submit-btn">Сохранить</button>
                            <button type="button" @click="editingService = null" class="cancel-btn">Отмена</button>
                        </div>
                    </form>
                </div>
            </div>
        </teleport>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from '~/composables/useAuth';

const API_URL = process.env.API_URL || 'http://localhost:3000/api';
const services = ref([]);
const showAddModal = ref(false);
const editingService = ref(null);
const { authService } = useAuth();

const newService = ref({
    category: '',
    subcategory: '',
    title: '',
    subtitle: '',
    text: '',
    price: '',
    link: ''
});

const fetchServices = async () => {
    try {
        const response = await authService.makeAuthRequest(`${API_URL}/services`);
        services.value = await response.json();
    } catch (error) {
        console.error('Error fetching services:', error);
    }
};

const addService = async () => {
    try {
        const response = await authService.makeAuthRequest(`${API_URL}/services`, {
            method: 'POST',
            body: JSON.stringify(newService.value)
        });
        if (response.ok) {
            await fetchServices();
            showAddModal.value = false;
            Object.keys(newService.value).forEach(key => newService.value[key] = '');
        }
    } catch (error) {
        console.error('Error adding service:', error);
    }
};

const editService = (service) => {
    editingService.value = { ...service };
};

const updateService = async () => {
    try {
        if (!editingService.value || !editingService.value.id) {
            console.error('No service to update');
            return;
        }

        console.log('Trying to update service:', editingService.value.id);

        const response = await authService.makeAuthRequest(
            `${API_URL}/services/${editingService.value.id}`,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    category: editingService.value.category,
                    subcategory: editingService.value.subcategory,
                    title: editingService.value.title,
                    subtitle: editingService.value.subtitle,
                    text: editingService.value.text,
                    price: editingService.value.price,
                    link: editingService.value.link
                })
            }
        );

        const updatedService = await response.json();
        console.log('Received updated service:', updatedService);

        // Обновляем сервис в массиве немедленно
        const index = services.value.findIndex(s => s.id === editingService.value.id);
        if (index !== -1) {
            services.value[index] = updatedService;
            console.log('Service updated in array at index:', index);
        } else {
            console.error('Service not found in array');
        }

        // Принудительно вызываем реактивное обновление
        services.value = [...services.value];
        
        editingService.value = null;
        
        // Дополнительно перезагружаем список для гарантии
        await fetchServices();
        
    } catch (error) {
        console.error('Error updating service:', error);
        alert('Ошибка при обновлении услуги: ' + error.message);
    }
};

const deleteService = async (id) => {
    if (confirm('Вы уверены, что хотите удалить эту услугу?')) {
        try {
            const response = await authService.makeAuthRequest(
                `${API_URL}/services/${id}`,
                { method: 'DELETE' }
            );
            if (response.ok) {
                services.value = services.value.filter(service => service.id !== id);
            }
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    }
};

onMounted(fetchServices);

definePageMeta({
    layout: 'admin'
});
</script>

<style scoped>
.services-page h1 {
    font-size: var(--text-h3);
    margin: 2rem auto;
    flex-basis: 100%;
}

.services-page h2{
    flex-basis: 100%;
    text-align: center;
    font-size: var(--text-h3);
}

.add-btn{
    flex-basis: 100%;
    width: 320px;
}

.services-page {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
}

.services-card {
    border: 1px solid var(--transparent-red-2);
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    max-width: 640px;
    min-width: 280px;
    backdrop-filter: blur(5px);
}

.service-actions {
    display: flex;
    gap: 0.5rem;
    padding: 1rem 0;
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
    background: var(--grey-color);
    padding: 2rem;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
}

.service-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.service-form input,
.service-form textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.modal-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 1rem;
}

.add-btn {
    background: var(--transparent-red-5);
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 1rem;
}

.edit-btn {
    background: var(--transparent-red-2);
}

.delete-btn {
    background: var(--transparent-red-5);
}

.submit-btn {
    background: var(--submit);
}

.cancel-btn {
    background: var(--transparent-red-2);
}

button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: white;
}
</style>
