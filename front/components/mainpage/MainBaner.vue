<template>
    <section class="main-baner">
        <div class="main-baner__content">
            <div class="main-baner__text">
                <h1 class="main-baner__title">{{ content.title }} <br> {{ content.subtitle }}</h1>
                <p class="main-baner__text-text">{{ content.text }}</p>
            </div>
            <div class="main-baner__btn" @click="isModalOpen = true">
                <button class="main-baner__btn-btn">{{ content.subtext }}</button>
                <span class="main-baner__btn-text">{{ content.link }}</span>
            </div>
        </div>
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
    </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

const isModalOpen = ref(false);
const isLoading = ref(false);

const defaultBaner = {
    title: 'Трудовой',
    subtitle: "юрист",
    text: "консультация, сопровождение увольнения, переговоры, судебное представительство, составление документов",
    subtext: "Получить консультацию",
    link: "Онлайн-консультация по вопросам трудового права",
    link2: ""
};

const content = reactive({...defaultBaner});

const loadBanerData = async () => {
    const { getBaners } = useBaners();
    isLoading.value = true;
    
    try {
        const banerData = await getBaners();
        const baner = banerData.find(item => item.block === "Банер");
        if (baner) {
            Object.assign(content, {
                title: baner.title ?? defaultBaner.title,
                subtitle: baner.subtitle ?? defaultBaner.subtitle,
                text: baner.text ?? defaultBaner.text,
                subtext: baner.subtext ?? defaultBaner.subtext,
                link: baner.link ?? defaultBaner.link,
                link2: baner.link2 ?? defaultBaner.link2
            });
        }
    } catch (error) {
        console.error('Ошибка при получении данных банера:', error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    loadBanerData();
});
</script>

<style>
.main-baner {
    padding: 0 5%;
    height: 85vh;
    min-height: fit-content;
    background: url(~/assets/img/rab-kol.png) no-repeat;
    background-position: right 30px;
    background-size: auto 90%; 
    box-sizing: border-box;
}
.main-baner__content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.main-baner__text-text {
    font-size: var(--text-h3);
    line-height: 1;
    max-width: 720px;
}
.main-baner__title {
    line-height: 1;
    margin: 5% 0 0;
    text-transform: uppercase;
}
.main-baner__btn {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 360px;
    align-self: flex-end;
    justify-content: center;
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
.baner-form{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.baner-form input::placeholder, .baner-form textarea::placeholder{
    font-family: 'IBM Plex mono', monospace;
    font-size: 1rem;
    font-weight: 300;
}
.baner-form input, .baner-form textarea{
    padding: 10px;
    background: transparent;
    box-shadow: 0 0 1px var(--dark-red-color);
    border: none;
}
.baner-form input:focus-visible, .baner-form textarea:focus-visible{
    box-shadow: 0 0 10px var(--transparent-red-2);
    border: none;
    outline: none;
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

/* 560px */
@media screen and (max-width: 560px){
    .main-baner__content{
        padding: 5% 0;
        justify-content: space-around;
        gap: 2rem;
    }
    .main-baner__text{
        text-align: center;
    }
    .main-baner__btn{
        align-self: center;
    }
}
/* 400px */
@media screen and (max-width: 400px){
   .main-baner__title{
    font-size: var(--text-l);
   } 
}
</style>