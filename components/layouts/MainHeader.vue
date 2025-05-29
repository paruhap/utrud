<template>
    <header>
        <div class="header-top">
            <a class="header-left" :href="'tel:' + user.phone.replace(/[\s\(\)\[\]\{\}\-\,\.]/g, '')">
                <img src="~/assets/img/icon/phone.svg" alt="">
                <span>{{ user.phone }}</span>
            </a>
            <div class="header-right">
                <a target="_blank" :href="'mailto:' + user.email" class="header-top-right__link"><img src="~/assets/img/icon/email.svg" alt=""></a>
                <a target="_blank" :href="'https://t.me/' + user.telegram" class="header-top-right__link"><img src="~/assets/img/icon/telegram.svg" alt=""></a>
                <a target="_blank" :href="'https://wa.me/' + user.whatsapp" class="header-top-right__link"><img src="~/assets/img/icon/whatsapp.svg" alt=""></a>
                <div :class="['top-bar-menu', { show: showMenu }]" @click="isModalOpen = true">
                    <NuxtLink @click.prevent="menuWatch()">
                        <img v-show="!isMenuOpen" src="~/assets/img/icon/menu-icon.svg" />
                        <img v-show="isMenuOpen" src="~/assets/img/icon/close.svg" />
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div class="header-bottom">
            <div class="header-bottom-left">
                <nuxt-link to="/"><img src="~/assets/img/icon/logo.svg" alt=""></nuxt-link>
            </div>
            <div class="header-bottom-right">
                <nav class="header-bottom-nav">
                    <nuxt-link v-show="route.path !== '/'" to="/">Главная</nuxt-link>
                    <nuxt-link v-show="route.path !== '/uslugi'" to="/uslugi">Услуги</nuxt-link>
                    <nuxt-link v-show="route.path !== '/about'" to="/about">Обо мне</nuxt-link>
                    <a href="#contact-blok" @click="smoothScrollToContact">Контакты</a>
                </nav>
                <div class="header-bottom-right-menu">
                    <NuxtLink @click.prevent="menuWatch()">
                        <img v-show="!isMenuOpen" src="~/assets/img/icon/menu-icon.svg" class="header-menu-open"/>
                    </NuxtLink>
                </div>
            </div>
        </div>
        <!-- Teleport menu -->
        <Teleport to="body">
            <transition name="modal" >
                <div v-if="isMenuOpen" class="modal"  @click="menuWatch">
                    <div v-if="showMenu = true" class="modal-close-icon cursor-pointer" @click="menuWatch"><img src="~/assets/img/icon/close.svg" alt=""></div>
                    <div class="modal-content">
                        <nav class="menu-nav">
                            <nuxt-link v-show="route.path !== '/'" to="/">Главная</nuxt-link>
                            <nuxt-link v-show="route.path !== '/uslugi'" to="/uslugi">Услуги</nuxt-link>
                            <nuxt-link v-show="route.path !== '/about'" to="/about">Обо мне</nuxt-link>
                            <nuxt-link to="#contact-blok">Контакты</nuxt-link>
                        </nav>
                        <div class="modal-contact-icon">
                            <a target="_blank" :href="'mailto:' + user.email"><img src="~/assets/img/icon/email.svg" alt=""></a>
                            <a target="_blank" :href="'https://t.me/' + user.telegram"><img src="~/assets/img/icon/telegram.svg" alt=""></a>
                            <a target="_blank" :href="'https://wa.me/' + user.whatsapp"><img src="~/assets/img/icon/whatsapp.svg" alt=""></a>
                        </div>
                        <div class="modal-contact-phone">
                            <a :href="'tel:' + user.phone.replace(/[\s\(\)\[\]\{\}\-\,\.]/g, '')"><img src="~/assets/img/icon/phone.svg" alt=""></a>
                            <a :href="'tel:' + user.phone.replace(/[\s\(\)\[\]\{\}\-\,\.]/g, '')" class="contact-phone__link">{{ user.phone }}</a>
                        </div>
                    </div>
                </div>
            </transition>
        </Teleport>
    </header>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isMenuOpen = ref(false);
const showMenu = ref(false);

const menuWatch = ()=>{
    isMenuOpen.value=!isMenuOpen.value
    document.body.classList.toggle('overflow')
}
// Значения по умолчанию
const defaultUser = {
    phone: '+7 (978) 704-51-56',
    whatsapp: '79787045157',
    email: 'havana79@yandex.ru',
    telegram: 'urist_ryabova'
};

// Используем reactive для реактивного обновления данных
const user = reactive({...defaultUser});

// Получаем данные через API
const { data: userData } = await useFetch('/api/users', {
    initialCache: false,
    default: () => defaultUser
});

// Следим за изменениями данных и обновляем user
watch(userData, (newData) => {
    if (newData && newData.length > 0) {
        Object.assign(user, {
            phone: newData[0].phone ?? defaultUser.phone,
            whatsapp: newData[0].whatsapp ?? defaultUser.whatsapp,
            email: newData[0].email ?? defaultUser.email,
            telegram: newData[0].telegram ?? defaultUser.telegram
        });
    }
}, { immediate: true });

const smoothScrollToContact = (e) => {
    e.preventDefault();
    const element = document.getElementById('contact-blok');
    if (!element) return;

    const startPosition = window.pageYOffset;
    const targetPosition = element.getBoundingClientRect().top + startPosition - 100;
    const distance = targetPosition - startPosition;
    const duration = 300;
    let start = null;

    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(animation);
};
onMounted(() => {
    window.addEventListener('scroll', () => {
        showMenu.value = window.scrollY > 150;
    });
});
onUnmounted(() => {
    window.removeEventListener('scroll', () => {
        showMenu.value = window.scrollY > 150;
    });
});

console.log(showMenu.value)
</script>

<style>
.header-top{
    padding: 5px 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--transparent-red-2);
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    backdrop-filter: blur(30px);
    z-index:11;
    height: 42px;
}
.header-left img{
    height: 24px;
    width: 24px;
}
.header-left {
    color: inherit;
    text-decoration: none;
    margin:0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    transition: transform .3s ease-in-out;
    gap: 1rem;
}
.header-left:hover{
    transform: scale(1.03);
}

.header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.header-right a {
    transition: transform .3s ease-in-out;
    margin-left: 1rem;
}
.header-right a:hover {
    transform: scale(1.2);
}
.header-right a img{
    height: 24px;
    width: 24px;
}
.header-bottom{
    margin-top: 42px;
    padding: 2% 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--red-color);
}
.header-bottom-right nav{
    display: flex;
    gap: 2rem;
    align-items: center;
}
.header-bottom-right a{
    font-size: var(--text-base);
    position: relative;
}
.header-bottom-right a::after{
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: var(--red-color);
    transition: width .3s ease-in-out;
}
.header-bottom-right a:hover::after{
    width: 100%;
}
.header-menu-close{
    z-index: 222;
    position: relative;
    width: 24px;
    height: auto;
}
.header-menu-open{
    width: 32px;
    height: auto;
}
.top-bar-menu {
    width: 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity 1s ease, visibility 1s ease, width 1s ease-in;
}

.top-bar-menu.show {
    width: auto;
    opacity: 1;
    visibility: visible;
}
    
.header-bottom a img,.header-bottom a{
    cursor: pointer;
    transition: transform .5s ease-in-out;
}
.header-bottom a:hover, .header-bottom a:hover img{
    transform: scale(1.05);}
.header-bottom-right-menu{
    display: none;
}
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:var(--background);
    backdrop-filter: blur(30px);
    z-index: 10;
    text-align: center;
    padding: 10% 5%;
}
.modal-content{  
    height: 100%;  
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10%;
}
.close-icon{
    display: none;
    position: absolute;
    top: 4rem;
    right: 2rem;
}
.modal-contact-icon {
    display: flex;
    gap: 2rem;
}
.modal-contact-icon img{
    height: 36px;
    width: auto;
}
.modal-contact-phone {
    display: flex;
    gap: 1rem;
}
.modal-contact-phone img {
    height: 24px;
    width: auto;
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

@media (max-width:720px) {
    .header-top img{
        width: 18px;
        height: auto;
    }
    .header-left{
        gap:10px
    }
    .header-left span{
        font-size: var(--text-m);
    }
    .header-right a img {
    height: 18px;
    width: auto;
}
    .header-bottom-right nav{
        display: none;
    }
    .header-bottom-right-menu{
    display: block;
    }
    .modal-close-icon {
        display: none;
    }
}
</style>