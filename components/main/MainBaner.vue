<template>
    <section class="main-baner">
        <div class="main-baner__content" :class="{ 'content-visible': isVisible }">
            <div class="main-baner__text" key="text">
                <h1 class="main-baner__title">{{ content.title }} <br> {{ content.subtitle }}</h1>
                <ul class="main-baner__text-list">
                    <li v-for="(item, index) in bodyItems" :key="index">{{ item }}</li>
                </ul>
            </div>
            <div class="main-baner__btn" @click="modalWatch" key="button">
                <button class="main-baner__btn-btn">Получить консультацию</button>
                <span class="main-baner__btn-text">Онлайн-консультация по вопросам трудового права</span>
            </div>
        </div>
        <Teleport to="body">
            <transition name="baner-form">
                <div v-if="isModalOpen" class="modal">
                    <div class="cursor-pointer" @click="modalWatch"><img src="~/assets/img/icon/close.svg" alt=""></div>
                    <div class="modal-content">
                        <MainForm/>
                    </div>
                </div>
            </transition>
        </Teleport>
    </section>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';

const isModalOpen = ref(false);
const modalWatch = ()=>{
    isModalOpen.value=!isModalOpen.value
    document.body.classList.toggle('overflow')
}

const defaultBaner = {
    block: "Банер",
    title: 'Трудовой',
    subtitle: "юрист",
    body: "консультация, сопровождение увольнения, переговоры, судебное представительство, составление документов"
};

const content = reactive({...defaultBaner});
const bodyItems = ref([]);
const { data: contents } = await useFetch('/api/contents')

// Следим за изменениями в contents
watch(contents, (newContents) => {
    if (newContents) {
        const baner = newContents.find(item => item.block === "Банер");
        if (baner) {
            Object.assign(content, {
                block: baner.block ?? defaultBaner.block,
                title: baner.title ?? defaultBaner.title,
                subtitle: baner.subtitle ?? defaultBaner.subtitle,
                body: baner.body ?? defaultBaner.body,
            });
            // Разбиваем строку body на массив по запятым и удаляем лишние пробелы
            bodyItems.value = content.body.split(',').map(item => item.trim());
        }
    }
}, { immediate: true });

const isVisible = ref(false);

onMounted(() => {
    // Небольшая задержка для гарантированной анимации
    setTimeout(() => {
        isVisible.value = true;
    }, 50);
});
</script>

<style>
.main-baner {
    padding: 0 5%;
    height: 75vh;
    min-height: fit-content; 
    box-sizing: border-box;
}
.main-baner__content {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 100%;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
}
.main-baner__content.content-visible {
    opacity: 1;
    transform: translateY(0);
}
.main-baner__text-list {
    display: flex;
    flex-wrap: wrap;
    font-size: var(--text-btn);
    line-height: 1;
    max-width: 1000px;
    list-style: circle;
}
.main-baner__text-list li {
    font-size: var(--text-btn);
    position: relative;
    padding:5px 0;
    word-wrap: none;
    word-spacing: -3px;
    line-height: 1.2;
    margin:0 4rem 0 0;
}
.main-baner__title {
    line-height: 1;
    margin: 5% 0 0;
    text-transform: uppercase;
}

/* Кнопка */
.main-baner__btn {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 360px;
    align-self: flex-end;
    justify-content: center;
    transition-delay: 0.3s;
    transition: opacity 0.5s ease-out 0.6s, transform 0.5s ease-out 0.6s;
}
.main-baner__btn-btn {
    padding: 15px 25px;
    font-size: var(--text-btn);
    font-family: 'Oranienbaum', serif;
    text-transform: uppercase;
    background: var(--transparent-gray-5);
    box-shadow: 0 0 1px var(--dark-red-color);
    transition: box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out;
}
.main-baner__btn-btn:hover {
    background: var(--red-color);
    color: var(--light-color);
    box-shadow: 1px 1px 5px var(--dark-red-color);
}
.main-baner__btn-text {
    text-align: right;
    font-size: var(--text-sm);
}
.modal .cursor-pointer{
    margin-top:2rem;
}

/* Анимация появления */
.baner-form-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
.baner-form-enter-active {
  transition: opacity 0.3s ease-out , transform .3s ease-out;
}
.baner-form-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Анимация исчезновения */
.baner-form-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.baner-form-leave-active {
    transition: opacity 0.3s ease-out , transform .3s ease-out;
}
.baner-form-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

/* Анимация появления контента */
.baner-content-enter-active,
.baner-content-appear-active {
    transition: all 0.3s ease-out;
}

.baner-content-enter-from,
.baner-content-appear-from {
    opacity: 0;
    transform: translateY(20px);
}

.baner-content-enter-to,
.baner-content-appear-to {
    opacity: 1;
    transform: translateY(0);
}

.main-baner__text {
    transition: opacity 0.5s ease-out 0.3s, transform 0.5s ease-out 0.3s;
}

@media (max-width: 720px) {
    .main-baner__content{
        min-height: fit-content;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
    }
    .main-baner__content h1{
        font-size: var(--text-l);
    }
    .main-baner__btn{
        align-self: center;
    }
    .main-baner__text-list{
        text-align: left;
    }
}
</style>