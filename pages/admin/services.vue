<template>
    <div class="services-admin-page">
        <div class="services-admin-page-top">
            <div class="admin-categories">
            <h2>Услуги</h2>
            <div class="admin-categories-menu">
                <div 
                class="admin-category-item cursor-pointer" 
                v-for="(category, index) in categories" 
                :key="index"
                :class="{ active: activeIndex === index }"
                @click="activeIndex = index"
                >
                {{ category }}
                </div>
            </div>
            <div class="add-services">
                <button class="add-service-btn" @click="openAddModal">Добавить услугу</button>
            </div>
        </div> 
        </div>
<!-- Карточки услуг -->
        <div v-if="!isLoading">
            <div class="admin-services-section">
                <div class="admin-services-list">
                    <div v-for="service in otherServices" :key="service.id" class="admin-service-card">
                        <div class="crud-services">
                            <button @click="openEditModal(service)" class="service-btn">Редактировать услугу</button>
                            <button @click="deleteService(service.id)" class="service-btn delete-service">Удалить услугу</button>
                        </div>
                        <h2 v-if="service.subcategory">{{ service.subcategory }}</h2>
                        <h3 v-if="service.title">{{ service.title }}</h3>
                        <h3 v-if="service.subtitle">{{ service.subtitle }}</h3>
                        <p v-if="service.body">{{ service.body }}</p>
                        <div class="admin-price" v-if="service.price">{{ service.price }}</div>
                    </div>
                </div>
            </div>
<!-- Судебное представительство -->
            <div v-if="sudService.length > 0" class="admin-services-section-sud">
                <h2 class="admin-section-title-sud">Судебное представительство</h2>
                <h3 class="admin-sud-title">В суде первой инстанции</h3>
                <div class="admin-services-list-sud">
                    <div v-for="service in sudService" :key="service.id" class="admin-service-sud">
                        <h3 v-if="service.subtitle">{{ service.subtitle }}</h3>
                        <p v-if="service.text">{{ service.text }}</p>
                        <div class="admin-price" v-if="service.price">{{ service.price }}</div>
                        <div class="crud-services">
                            <button @click="openEditModal(service)" class="service-btn">Редактировать услугу</button>
                            <button @click="deleteService(service.id)" class="service-btn delete-service">Удалить услугу</button>
                        </div>
                    </div>
                </div>
                <h3 class="admin-sud-title">В суде апелляционной и кассационной инстанций</h3>
                <div class="admin-services-list-sud">                    
                    <div v-for="service in sudServiceApel" :key="service.id" class="admin-service-sud">
                        <h3 v-if="service.subtitle">{{ service.subtitle }}</h3>
                        <p v-if="service.text">{{ service.text }}</p>
                        <div class="admin-price" v-if="service.price">{{ service.price }}</div>
                        <div class="crud-services">
                            <button @click="openEditModal(service)" class="service-btn">Редактировать услугу</button>
                            <button @click="deleteService(service.id)" class="service-btn delete-service">Удалить услугу</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="loading">Загрузка...</div>

        <!-- Модальное окно -->
        <Transition name="slide">
            <div v-if="isModalOpen" class="side-modal">
                <div class="side-modal-close-icon cursor-pointer" @click="closeModal">
                    <NuxtImg src="/icon/close.svg"/>
                </div>
                <div class="side-modal-content">
                    <h3>{{ editingService ? 'Редактировать' : 'Добавить' }} услугу</h3>
                    <form @submit.prevent="saveService">
                        <select v-model="formData.category" required>
                            <option value="">Выберите категорию</option>
                            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                        </select>
                        <input 
                            v-model="formData.subcategory" 
                            placeholder="Подкатегория"
                        >
                        <input 
                            v-model="formData.title" 
                            placeholder="Заголовок"
                        >
                        <input 
                            v-model="formData.subtitle" 
                            placeholder="Подзаголовок"
                        >
                        <textarea 
                            v-model="formData.body" 
                            placeholder="Описание"
                            rows="4"
                        ></textarea>
                        <input 
                            v-model="formData.price" 
                            placeholder="Цена"
                        >
                        <div class="modal-buttons">
                            <button type="submit">Сохранить</button>
                            <button type="button" @click="closeModal">Отмена</button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>

definePageMeta({
  middleware: ['authenticated'],
  layout:'admin'
})

import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isLoading = ref(true);
const services = ref([]);
const activeIndex = ref(0);
const isModalOpen = ref(false);
const editingService = ref(null);
const formData = ref({
  category: '',
  subcategory: '',
  title: '',
  subtitle: '',
  body: '',
  price: '',
  link: ''
});

watch(editingService, (newVal) => {
  if (newVal) {
    formData.value = { ...newVal };
  } else {
    formData.value = {
      category: '',
      subcategory: '',
      title: '',
      subtitle: '',
      body: '',
      price: '',
      link: ''
    };
  }
});

// Получаем услуги
const { data: apiServices } = await useFetch('/api/services');

// Используем API данные или дефолтные
services.value = apiServices.value;

// Получаем уникальные категории
const categories = computed(() => [...new Set(services.value.map(s => s.category))]);

// Фильтруем услуги по активной категории
const filterServices = computed(() => 
  services.value.filter(s => s.category === categories.value[activeIndex.value])
);
const otherServices = computed(() => 
    filterServices.value.filter(s => s.subcategory != "Судебное представительство")
);
// Фильтруем судебные услуги
const sudService = computed(() => 
    filterServices.value.filter(s => s.title === "В суде первой инстанции")
);
const sudServiceApel = computed(() => 
    filterServices.value.filter(s => s.title === "В суде апелляционной и кассационной инстанций")
);
// Устанавливаем активную категорию из URL
onMounted(() => {
  const category = route.query.category;
  if (category) {
    const index = categories.value.findIndex(c => c === category);
    if (index !== -1) {
      activeIndex.value = index;
    }
  }
  isLoading.value = false;
});

const openAddModal = () => {
  editingService.value = null;
  isModalOpen.value = true;
};

const openEditModal = (service) => {
  editingService.value = { ...service };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  editingService.value = null;
};

const refreshServices = async () => {
  services.value = await $fetch('/api/services');
};

const saveService = async () => {
  try {
    const serviceData = formData.value;
    
    if (editingService.value) {
      await $fetch(`/api/services/${editingService.value.id}`, {
        method: 'PUT',
        body: serviceData
      });
    } else {
      await $fetch('/api/services', {
        method: 'POST',
        body: serviceData
      });
    }
    
    await refreshServices();
    closeModal();
  } catch (error) {
    console.error('Error saving service:', error);
    alert('Ошибка при сохранении услуги');
  }
};

const deleteService = async (id) => {
  if (!confirm('Удалить услугу?')) return;
  
  try {
    await $fetch(`/api/services/${id}`, { method: 'DELETE' });
    refreshServices();
  } catch (error) {
    console.error('Error deleting service:', error);
    alert('Ошибка при удалении услуги');
  }
};
</script>

<style>
.services-admin-page {
padding:3% 5%;
}
.services-admin-page-top {
    padding-bottom: 3%;
}
.admin-categories h2{
    margin: 0;
    padding: 0;
}
.admin-categories {
    display: flex;
    justify-content: space-around;
}
.admin-categories-menu {
    display: flex;
    gap: 1rem;
    font-size: var(--text-base);
}
.add-service-btn{
    border: 1px solid var(--dark-red-color);
    padding: 10px 15px;
}
.admin-services-list, .admin-services-list-sud {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}
.admin-service-card ,.admin-service-sud {
    border: 1px solid var(--transparent-red-5);
    min-width: 300px;
    max-width: 640px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex-basis: 30%;
}
.admin-service-card h2, .admin-service-card h3{
    margin: 0;
    padding: 0;
}
.crud-services {
    display: flex;
    justify-content: space-between;
}
.service-btn{
    border: 1px solid var(--transparent-red-5);
    padding: 15px 10px;
    margin-right: 1rem;
}
.delete-service {
    color: var(--red-color);
    font-weight: 600;
}
.admin-services-section-sud {
    margin: 3rem 0;
}
.admin-section-title-sud {
    text-align: center;
}
.admin-sud-title {
    margin-top: 2rem;
    text-align: center;
}
.modal-buttons{
    display: flex;
    justify-content: space-between;
}
.modal-buttons button{
    border: 1px solid var(--transparent-red-2);
    padding: 10px 15px;
}
.modal-buttons button[type='submit']{
    font-weight: 700;
    border: 1px solid var(--transparent-red-9);
}
/* Модальное окно */
.side-modal {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 640px;
    height: 100vh;
    background: white;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    overflow-y: auto;
}
.side-modal-close-icon{
    margin: 1rem;
}
.side-modal-close-icon img{
    width: 28px;
    height: auto;
}
.side-modal-content {
    padding: 2rem;
}

.side-modal-content form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.side-modal-content input,
.side-modal-content textarea,
.side-modal-content select {
    padding: 8px;
    border: 1px solid var(--transparent-red-2);
    border-radius: 4px;
}

/* Анимация слайда */
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}
</style>