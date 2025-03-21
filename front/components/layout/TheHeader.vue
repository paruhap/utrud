<template>
    <header>
        <div class="header-top">
            <div class="header-left">
                <a :href="'tel:' + user.phone.replace(/[\s\(\)\[\]\{\}\-\,\.]/g, '')"><img src="~/assets/img/icon/phone.svg" alt=""></a>
                <a :href="'tel:' + user.phone.replace(/[\s\(\)\[\]\{\}\-\,\.]/g, '')" class="header-top-left__link">{{ user.phone }}</a>
            </div>
            <div class="header-right">
                <a :href="'mailto:' + user.email" class="header-top-right__link"><img src="~/assets/img/icon/email.svg" alt=""></a>
                <a :href="'https://t.me/' + user.telegram" class="header-top-right__link"><img src="~/assets/img/icon/telegram.svg" alt=""></a>
                <a target="_blank" :href="'https://wa.me/' + user.phone2" class="header-top-right__link"><img src="~/assets/img/icon/whatsapp.svg" alt=""></a>
            </div>
        </div>
        <div class="header-bottom">
            <div class="header-bottom-left">
                <nuxt-link to="/"><img src="~/assets/img/icon/logo.svg" alt=""></nuxt-link>
            </div>
            <div class="header-bottom-right cursor-pointer" @click="isModalOpen = true">
                <img src="~/assets/img/icon/menu-icon.svg" alt="">
            </div>
        </div>
        <Teleport to="body">
            <transition name="modal" @click="isModalOpen = false">
                <div v-if="isModalOpen" class="modal">
                    <div class="close-icon cursor-pointer" @click="isModalOpen = false"><img src="~/assets/img/icon/close.svg" alt=""></div>
                    <div class="modal-content">
                        <nav class="menu-nav">
                            <nuxt-link to="/">Главная</nuxt-link>
                            <nuxt-link to="/uslugi">Услуги</nuxt-link>
                            <nuxt-link to="/about">Обо мне</nuxt-link>
                            <nuxt-link to="/#contact-blok">Контакты</nuxt-link>
                        </nav>
                    </div>
                </div>
            </transition>
        </Teleport>
    </header>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

const isModalOpen = ref(false);
const isLoading = ref(false);

// Значения по умолчанию
const defaultUser = {
    phone: '+7 (978) 704-51-57',
    phone2: '79787045157',
    email: 'havana79@ya.ru',
    telegram: 'havanka'
};

// Используем reactive для реактивного обновления данных
const user = reactive({...defaultUser});

// Выносим загрузку данных в отдельную функцию
const loadUserData = async () => {
    const { getUser } = useUsers();
    isLoading.value = true;
    
    try {
        const userData = await getUser(2);
        // Обновляем только если получили данные
        if (userData) {
            Object.assign(user, {
                phone: userData.phone ?? defaultUser.phone,
                phone2: userData.phone2 ?? defaultUser.phone2,
                email: userData.email ?? defaultUser.email,
                telegram: userData.telegram ?? defaultUser.telegram
            });
        }
    } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        // В случае ошибки оставляем значения по умолчанию
    } finally {
        isLoading.value = false;
    }
};

// Загружаем данные при монтировании компонента
onMounted(() => {
    loadUserData();
});
</script>

<style>
.header-top{
    padding: 5px 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--transparent-red-2);
}
.header-left, .header-right {
    display: flex;
    align-items: center;
}
.header-left a{
    display: flex;
    align-items: center;
}
.header-left a img{
    height: 24px;
    width: 24px;
}
.header-top-left__link, .header-top-right__link{
    color: inherit;
    text-decoration: none;
    margin:0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.header-top-right__link img{
    height: 24px;
    width: 24px;
}
.header-bottom{
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:var(--background);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(30px);
    z-index: 10;
}
.close-icon{
    position: absolute;
    top: 2rem;
    right: 2rem;
}
.menu-nav{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}
.menu-nav a{
    color: var(--red-color);
    text-decoration: none;
    font-size: var(--text-h2);
    font-weight: 400;
    font-family: 'Oranienbaum', serif;
    text-transform: uppercase;
}
/* Анимация появления */
.modal-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}
.modal-enter-active {
  transition: opacity 0.3s ease-out , transform .3s ease-out;
}
.modal-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Анимация исчезновения */
.modal-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.modal-leave-active {
    transition: opacity 0.3s ease-out , transform .3s ease-out;
}
.modal-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>