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
                        <p v-if="service.text">{{ service.text }}</p>
                        <div class="service-card-bottom">
                            <div class="price" v-if="service.price">{{ service.price }}</div>
                            <button class="service-card-btn" @click="isModalOpen = true">Заказать услугу</button>
                        </div>
                    </div>
                </div>
            </div>
<!-- Судебное представительство -->
            <div v-if="courtServices.length" class="services-section-sud">
                <h2 class="section-title-sud">Судебное представительство</h2>
                <div class="services-list-sud">
                    <h3 class="sud-title">В суде первой инстанции</h3>
                    <div v-for="service in sudServices" :key="service.id" class="service-sud">
                        <h3 v-if="service.subtitle">{{ service.subtitle }}</h3>
                        <p v-if="service.text">{{ service.text }}</p>
                        <div class="price" v-if="service.price">{{ service.price }}</div>
                    </div>
                </div>
                <div class="services-list-sud">
                    <h3 class="sud-title">В суде апелляционной и кассационной инстанций</h3>
                    <div v-for="service in sudServices2" :key="service.id" class="service-sud">
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
                    <div class="close-icon cursor-pointer" @click="isModalOpen = false"><img src="~/assets/img/icon/close.svg" alt=""></div>
                    <div class="modal-content">
                        <form class="baner-form">
                            <h2>Отправить заявку на консультацию</h2>
                            <input type="text" placeholder="Ваше имя">
                            <input type="tel" placeholder="Ваш телефон">
                            <textarea name="" id="" cols="30" rows="10" placeholder="Ваш вопрос"></textarea>
                            <button class="main-baner__btn-btn">Отправить</button>
                        </form>
                    </div>
                </div>
            </transition>
        </Teleport>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useServices } from '~/composables/useServices';

const categoryDesc = ["Трудовые договоры Договоры ГПХ Должностные инструкции Увольнения, споры Судебное представительство","Консультация по трудовому праву. Составление исков жалоб, заявлений. Судебное представительство.","Консультация по правовым аспектам. Проверка и составление гражданско-правовых (ГПХ) договоров."];
const { getServices } = useServices();
const isLoading = ref(false);
const isModalOpen = ref(false);
const services = ref([]);
const categories = ref([]);
const activeIndex = ref(0);

const loadServicesData = async () => {
    isLoading.value = true;
    try {
        const api_services = await getServices();
        services.value = api_services;
        categories.value = [...new Set(api_services.map(service => service.category))];
    } catch (error) {
        console.error('Ошибка при получении услуг:', error);
    } finally {
        isLoading.value = false;
    }
};

const filteredServices = computed(() => {
    if (!services.value.length || !categories.value.length) return [];
    
    return services.value.filter(service => 
        service.category === categories.value[activeIndex.value]
    );
});

const courtServices = computed(() => {
    return filteredServices.value.filter(service => 
        service.subcategory === "Судебное представительство"
    );
});

const otherServices = computed(() => {
    return filteredServices.value.filter(service => 
        service.subcategory !== "Судебное представительство"
    );
});

const sortServices = (services) => {
    const order = ["Севастополь, Крым", "Москва, Краснодарский край", "Другие регионы"];
    return services.sort((a, b) => {
        return order.indexOf(a.subtitle) - order.indexOf(b.subtitle);
    });
};

const sudServices = computed(() => {
    return sortServices(filteredServices.value.filter(service => 
        service.title == "В суде первой инстанции"
    ));
});

const sudServices2 = computed(() => {
    return sortServices(filteredServices.value.filter(service => 
        service.title == "В суде апелляционной и кассационной инстанций"
    ));
});

onMounted(() => {
    loadServicesData();
});
</script>

<style scoped>
.services-page {
    padding: 5%;
    margin: 0 auto;
}

.services-page-top {
    background: url(~/assets/img/rab-kol.png) no-repeat right bottom;
    background-size: contain;
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