<template>
    <section class="preim-blok">
        <div class="preim-blok-menu">
            <div 
                v-for="(preim, index) in preimItems" 
                :key="index"
                :class="['preim-item', { active: activeIndex === index }]"
                @click="handleItemClick(index)"
            >
                {{ preim.title }}
            </div>
        </div>
        <transition mode="out-in" name="slide-fade">
            <div class="preim-content" v-if="activePreim" :key="activeIndex">
                <h3>{{ activePreim.title }}</h3>
                <p>{{ activePreim.text }}</p>
            </div>
        </transition>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { defaultPreims } from '~/constants/defaultContent';

const isLoading = ref(false);
const preimItems = ref([]);
const activeIndex = ref(0);
const autoplayInterval = ref(null);
const isAutoplayPaused = ref(false);

const activePreim = computed(() => preimItems.value[activeIndex.value]);

const startAutoplay = () => {
    if (!isAutoplayPaused.value) {
        autoplayInterval.value = setInterval(() => {
            activeIndex.value = (activeIndex.value + 1) % preimItems.value.length;
        }, 3000);
    }
};

const stopAutoplay = () => {
    if (autoplayInterval.value) {
        clearInterval(autoplayInterval.value);
        autoplayInterval.value = null;
    }
};

const handleItemClick = (index) => {
    activeIndex.value = index;
    isAutoplayPaused.value = true;
    stopAutoplay();
};

// Приоритет: 1) API данные 2) localStorage 3) дефолтные значения из файла
const loadPreimData = async () => {
    const { getBaners } = useBaners();
    isLoading.value = true;
    
    try {
        const banerData = await getBaners();
        const preims = banerData.filter(item => item.block === "Преимущества");
        
        if (preims.length > 0) {
            const newPreims = preims.map((preim, index) => ({
                title: preim.title,
                text: preim.text
            }));
            preimItems.value = newPreims;
            localStorage.setItem('lastPreims', JSON.stringify(newPreims));
        } else {
            // Если нет данных с API, пробуем взять из localStorage
            const cachedPreims = localStorage.getItem('lastPreims');
            if (cachedPreims) {
                preimItems.value = JSON.parse(cachedPreims);
            } else {
                // Если нет и в localStorage, используем дефолтные значения из файла
                preimItems.value = defaultPreims;
            }
        }
    } catch (error) {
        console.error('Ошибка при получении данных преимуществ:', error);
        // При ошибке API проверяем localStorage
        const cachedPreims = localStorage.getItem('lastPreims');
        if (cachedPreims) {
            preimItems.value = JSON.parse(cachedPreims);
        } else {
            // Если нет в localStorage, используем дефолтные значения из файла
            preimItems.value = defaultPreims;
        }
    } finally {
        isLoading.value = false;
    }
    startAutoplay(); // Запускаем автопереключение после загрузки данных
};

onMounted(() => {
    loadPreimData();
});

onUnmounted(() => {
    stopAutoplay();
});
</script>

<style scoped>
.preim-blok {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100vh;
    min-height: fit-content;
    padding: 5%;
    box-sizing: border-box;
}

.preim-blok-menu {
    font-family: var(--font-title);
    display: flex;
    flex-direction: column;
    justify-content:flex-start;
    align-items: flex-start;
    gap: 2rem;
}

.preim-item {
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: var(--text-h3);
}

.preim-item.active {
    font-size: var(--text-h2);
    color: var(--red-color);
}

.preim-content {
    align-self: flex-end;
    padding: 2rem;
    border-radius: 8px;
    display: flex;
    justify-content: flex-end;
}

.preim-content h3 {
    color: var(--red-color);
    font-size: var(--text-h3);
    padding: 1rem 2rem;
}

.preim-content p {
    font-size: var(--text-base);
    color: var(--dark-color);
    padding: 0 1rem;
    border-left: 1px solid var(--transparent-red-9);
    max-width: 70%;
}

/* Анимация переключения контента */
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
    transform: translateX(0);
    opacity: 1;
}

/* 720px */
@media (max-width: 720px) {
    .preim-blok {
        justify-content: center;
        gap: 5%;
        height: fit-content;
        padding: 10% 5%;
    }

    .preim-blok-menu {
        gap: 1rem;
    }

    .preim-item {
        font-size: var(--text-h3);
    }

    .preim-item.active {
        font-size: var(--text-h2);
    }

    .preim-content h3 {
        display: none;
    }

    .preim-content{
        flex-direction: column;
        padding: 0;
    }

    .preim-content p {
        border-left: none;
        border-top: 1px solid var(--transparent-red-9);
        padding: 1rem 0;
        max-width: 100%;
    }
}
</style>