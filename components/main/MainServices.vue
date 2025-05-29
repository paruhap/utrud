<template>
    <section class="services-block">
        <h2 class="blok-title">УСЛУГИ</h2>
        <div class="services-card">
            <div 
                v-for="(category, index) in categories" 
                :key="index"
                :class="['category-card', { active: activeIndex === index }]"
                @click="activeIndex = index"
            >
                <h3>{{ category }}</h3>
                <p>{{ categoryDesc[index] }}</p>
                <button @click.stop="navigateToServices(category)">Перейти</button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const categoryDesc = ["Трудовые договоры Договоры ГПХ Должностные инструкции Увольнения, споры Судебное представительство","Консультация по трудовому праву. Составление исков жалоб, заявлений. Судебное представительство.","Консультация по правовым аспектам. Проверка и составление гражданско-правовых (ГПХ) договоров."];
const isLoading = ref(false);
const services = ref([]);
const categories = ref([]);
const activeIndex = ref(0);
import { useRouter } from 'vue-router';

const router = useRouter();

const { data: api_services } = await useFetch('/api/services');
services.value = api_services;

// Добавляем обработку категорий после получения данных
watch(api_services, (newServices) => {
    if (newServices && newServices.length > 0) {
        // Получаем уникальные категории из services
        categories.value = [...new Set(newServices.map(service => service.category))];
    }
}, { immediate: true });

const navigateToServices = (category) => {
    router.push({
        path: '/uslugi',
        query: { category }
    });
};

</script>

<style scoped>
.services-block {
    height: 100vh;
    min-height: fit-content;
    padding: 5%;
    box-sizing: border-box;
}

.services-block h2{
    transition: all 0.3s ease;
    font-size: var(--text-h2);
    margin-bottom: 5%;
    width: fit-content;
    margin: 0 auto 5%;
}

.services-card {
    display: flex;
    justify-content: space-around;
    align-items: start;
    gap: 2rem;
    flex-wrap: wrap;
}

.category-card {
    min-height: fit-content;
    height: 380px;
    max-width: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border: 1px solid var(--transparent-red-2);
    padding: 1rem;
    box-shadow: 0 0 1px inset var(--transparent-red-2);
    backdrop-filter: blur(5px);
    border-radius: 3px;
    transition: all 1s ease-in-out;
    gap: 2rem;
    flex-basis: 30%;
}

.category-card:hover{
    box-shadow: 0 0 7px inset var( --transparent-gray);
    background: var(--transparent-gray-2);
}

.category-card h3{
    font-size: var(--text-h3);
    font-family: var(--font-title);
    padding: 0;
    margin: 0;
}

.category-card p{
    transition: all 0.3s ease;
    font-size: var(--text-m);
    text-align: left;
}

.category-card button{
    border: 1px solid var(--transparent-red-5);
    text-align: center;
    padding: 1rem 1.5rem;
    font-size: var(--text-btn);
    font-family: var(--font-title);
    transition: background-color .3s ease-in-out;
    width: 80%;
}
.category-card button:hover{
    cursor: pointer;
    background: var(--transparent-red-9);
    color: var(--light-color);
}
/* 720px */
@media screen and (max-width: 720px){
    .services-card {
        flex-direction: column;
    }
    .category-card {
        width: 100%;
        max-width: 700px;
        height: fit-content;
        gap: 1rem;
    }
    .category-card p{
        font-size: var(--text-base);
        padding: 0 1rem 0 2rem;
    }
}
/* 560px */
@media screen and (max-width: 560px){
    .category-card {
        width: 100%;
        max-width: 500px;
        height: fit-content;
        gap: 1rem;
    }
    .category-card p{
        font-size: var(--text-base);
        padding: 0 1rem 0 2rem;
    }
}
</style>
