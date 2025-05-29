<template>
    <div class="services-page">
        <div class="services-page-top">
            <div class="categories">
            <h2>Услуги</h2>
            <div class="categories-menu">
                <div 
                class="category-item" 
                v-for="(category, index) in categories" 
                :key="index"
                :class="{ active: activeIndex === index }"
                @click="activeIndex = index"
                >
                {{ category }}
                </div>
            </div>
        </div> 
        <div class="category-description" v-if="categories[activeIndex]">
            <h3>Услуги {{ categories[activeIndex] }}</h3>
            <p>{{ categoryDesc[activeIndex] }}</p>
        </div>
        </div>
<!-- Карточки услуг -->
        <div v-if="!isLoading">
            <div class="services-section">
                <div class="services-list">
                    <div v-for="service in otherServices" :key="service.id" class="service-card">
                        <h2 v-if="service.subcategory">{{ service.subcategory }}</h2>
                        <h3 v-if="service.title">{{ service.title }}</h3>
                        <h3 v-if="service.subtitle">{{ service.subtitle }}</h3>
                        <p v-if="service.body">{{ service.body }}</p>
                        <div class="service-card-bottom">
                            <div class="price" v-if="service.price">{{ service.price }}</div>
                            <button class="service-card-btn" @click="modalWatch(service.body)">Заказать услугу</button>
                        </div>
                    </div>
                </div>
            </div>
<!-- Судебное представительство -->
            <div v-if="sudService.length > 0" class="services-section-sud">
                <h2 class="section-title-sud">Судебное представительство</h2>
                <div class="services-list-sud">
                    <h3 class="sud-title">В суде первой инстанции</h3>
                    <div v-for="service in sudService" :key="service.id" class="service-sud">
                        <h3 v-if="service.subtitle">{{ service.subtitle }}</h3>
                        <p v-if="service.text">{{ service.text }}</p>
                        <div class="price" v-if="service.price">{{ service.price }}</div>
                    </div>
                </div>
                <div class="services-list-sud">
                    <h3 class="sud-title">В суде апелляционной и кассационной инстанций</h3>
                    <div v-for="service in sudServiceApel" :key="service.id" class="service-sud">
                        <h3 v-if="service.subtitle">{{ service.subtitle }}</h3>
                        <p v-if="service.text">{{ service.text }}</p>
                        <div class="price" v-if="service.price">{{ service.price }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="loading">Загрузка...</div>
        <Teleport to="body">
            <transition name="baner-form">
                <div v-if="isModalOpen" class="modal">
                    <div class="close-icon cursor-pointer" @click="modalClose"><img src="~/assets/img/icon/close.svg" alt=""></div>
                    <div class="modal-content">
                        <MainForm :serviceText="selectedServiceText" />
                    </div>
                </div>
            </transition>
        </Teleport>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isLoading = ref(true);
const isModalOpen = ref(false);
const services = ref([]);
const activeIndex = ref(0);
const selectedServiceText = ref('');

const modalWatch = (serviceBody) => {
  const firstThreeWords = serviceBody?.split(' ').slice(0, 3).join(' ') || '';
  selectedServiceText.value = firstThreeWords;
  isModalOpen.value = !isModalOpen.value;
  document.body.classList.toggle('overflow');
};
const modalClose = ()=>{    
  isModalOpen.value = !isModalOpen.value;
  document.body.classList.toggle('overflow');
}
const categoryDesc = ["Трудовые договоры Договоры ГПХ Должностные инструкции Увольнения, споры Судебное представительство", "Консультация по трудовому праву. Составление исков жалоб, заявлений. Судебное представительство.", "Консультация по правовым аспектам. Проверка и составление гражданско-правовых (ГПХ) договоров."];

// Получаем услуги
const { data: apiServices, error } = await useFetch('/api/services');

// Используем API данные или дефолтные
services.value = apiServices.value || [];

// Если есть ошибка, можно её обработать
if (error.value) {
  console.error('Ошибка при загрузке услуг:', error.value);
}

// Получаем уникальные категории
const categories = computed(() => 
  [...new Set(services.value?.map(s => s.category).filter(Boolean))] || []
);

// Фильтруем услуги по активной категории
const filterServices = computed(() => 
  services.value?.filter(s => s.category === categories.value[activeIndex.value]) || []
);

const otherServices = computed(() => 
  filterServices.value?.filter(s => s.subcategory != "Судебное представительство") || []
);

// Фильтруем судебные услуги
const sudService = computed(() => 
  filterServices.value?.filter(s => s.title === "В суде первой инстанции") || []
);

const sudServiceApel = computed(() => 
  filterServices.value?.filter(s => s.title === "В суде апелляционной и кассационной инстанций") || []
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
</script>

<style scoped>
.close-icon.cursor-pointer{
    display: block;
}
.services-page {
    padding:0 5% 5%;
    margin: 0 auto;
}

.categories {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
}

.categories h2 {
    font-size: var(--text-l);
    text-transform: uppercase;
    color: var(--red-color);
    margin-bottom: 2% ;
}

.categories-menu {
    flex-basis: 70%;
    display: flex;
    justify-content: flex-end;
    font-size: var(--text-btn);
    gap: 5%;
    border-bottom: 1px solid var(--transparent-red-5);
    padding-bottom: 3rem;
}

.category-item {
    cursor: pointer;
    transition: all 0.3s;
}

.category-item:hover {
    transform: scale(1.1);
}

.category-item.active {
    color: var(--red-color);
    font-weight: 500;
}

.category-description {
    padding: 0 1rem 5% 20%;
    text-align: right;
    font-size: var(--text-base);
}

.services-list {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
}

.service-card {
    border: 1px solid var(--transparent-red-2);
    border-radius: 10px;
    padding: 1rem;
    background-color: var(--transparent-gray-2);
    box-shadow: 0 0 10px var(--transparent-red-2);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    min-height: fit-content;
    width: calc(33.33% - 2rem);
    min-width: 300px;
    max-width: 640px;
    flex-grow: 1;
}

.service-card h3 {
    color: var(--transparent-red-9);
}

.service-card .price {
    font-weight: bold;
}

.service-card-btn {
    padding: 10px 15px;
    border: 1px solid var(--transparent-red-2);
}

.service-card-btn:hover {
    background-color: var(--transparent-red-9);
    color: var(--transparent-gray);
}

.service-card-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.services-section-sud {
    display: flex;
    flex-wrap: wrap;
    gap: 10%;
    border-bottom: 1px solid var(--transparent-red-2);
    padding: 2.5% 0;
}

.services-section-sud h2 {
    flex-basis: 100%;
}

.services-list-sud {
    flex-basis: 45%;
    display: flex;
    flex-direction: column;
}

.service-sud {
    padding: 10px 0;
    align-items: flex-start;
}

.sud-title {
    font-size: var(--text-btn);
    padding: 1rem 0;
    border-bottom: 1px solid var(--transparent-red-2);
}

.loading {
    text-align: center;
    padding: 40px;
    font-size: 1.2em;
    color: #666;
}

.section-title-sud {
    font-size: var(--text-h2);
    margin-top: 10%;
    padding: 2% 0;
    border-top: 1px solid var(--transparent-red-5);
}

@media (max-width: 1200px) {
    .service-card {
        width: calc(50% - 2rem);
    }
}

@media (max-width: 768px) {
    .service-card {
        width: 100%;
    }
    
    .categories {
        flex-direction: column;
        text-align: center;
    }
    
    .categories-menu {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding-bottom: 1rem;
    }
    
    .category-description {
        padding: 2rem 1rem;
        text-align: center;
    }
    .category-description h3 {
        font-size: var(--text-h3);
    }
    .services-list-sud{
        flex-basis: 100%;
    }
    .service-sud{
        font-size: var(--text-base);
    }
}
</style>