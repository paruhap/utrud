<template>
    <div class="about-obr">
        <h2>Образование</h2>
        <div v-for="item in aboutObr" :key="item">
            <h3 class="about-obr-date">{{ item.subtitle }}</h3>
            <p class="about-obr-p">{{ item.body }}</p>
        </div>
        <div class="about-obr-dok">
            <img :src="diplomBig" alt="Диплом" @click="openModal(diplomBig)">
            <img :src="disertBig" alt="Диссертация" @click="openModal(disertBig)">
            <img :src="diplomknBig" alt="Диплом кандидата наук" @click="openModal(diplomknBig)" class="diplomkn-big">
        </div>

        <div v-if="isModalOpen" class="modal" @click="closeModal">
            <span class="close" @click="closeModal">&times;</span>
            <img class="modal-content" :src="modalImage">
        </div>
    </div>   
</template>

<script setup>
import { ref } from 'vue'
import diplomBig from '~/assets/img/diplom_big.jpg'
import disertBig from '~/assets/img/disert_big.jpg'
import diplomknBig from '~/assets/img/diplomkn_big.jpg'

const { data: contents } = await useFetch('/api/contents');
const aboutObr = contents.value.filter(item => item.title === "Образование ?!");
console.log(aboutObr)
const isModalOpen = ref(false)
const modalImage = ref('')

const openModal = (imagePath) => {
    modalImage.value = imagePath
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
    modalImage.value = ''
}
</script>

<style scoped>
.about-obr {
    padding: 5%;
}

.about-obr-date {
    color: var(--red-color);
    margin: 2rem 0 1rem;
}

.about-obr-p {
    font-size: var(--text-base);
    margin: 0;
}

.about-obr-dok {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 5rem;
    justify-content: center;
}
.about-obr-dok img {
    height: 240px;
    max-width: 300px;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: .5;
}
.diplomkn-big{
    object-fit: cover;
    object-position: right center;
}
.about-obr-dok img:hover {
    transform: scale(1.05);
    opacity: 1;
}

/* Модальное окно */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(254, 253, 247, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    max-width: 90%;
    max-height: 90vh;
    object-fit: contain;
}

.close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: var(--dark-color);
    font-size: 50px;
    font-weight: 300;
    cursor: pointer;
}

/* Адаптивность */
@media (max-width: 768px) {
    .about-obr-dok {
        gap: 1rem;
    }

    .about-obr-dok img {
        max-width: 250px;
    }
}
</style>