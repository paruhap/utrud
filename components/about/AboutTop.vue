<template>
    <div class="about-top">
        <div class="about-top-top">
            <div class="about-top-photo">
                <img src="~/assets/img/eir.png" alt="">
            </div>
            <div class="about-top-text">
                <h2 class="about-top-text__title">{{ aboutTop.subtitle }}</h2>
                <h3 class="about-top-text__subtitle">{{ aboutTop.description }}</h3>
            </div>
        </div>
        <div class="about-top-bottom">
            <div class="about-bottom-platform">
                <nuxt-link to="https://uslugi.yandex.ru/profile/EvgeniyaRyabova"><img src="~/assets/img/icon/yandexUslugi.svg" alt="" srcset=""></nuxt-link>
                <nuxt-link to="https://youdo.com/u10127547"><img src="~/assets/img/icon/youdoLogo.svg" alt="" srcset=""></nuxt-link>
                <nuxt-link to=""><img src="~/assets/img/icon/profi.svg" alt="" srcset=""></nuxt-link>
            </div>
            <div class="about-bottom-text">
                <p>{{ aboutTop.body }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const { data: contents } = await useFetch('/api/contents');
const aboutTop = contents.value.find(item => item.title === "Топ ?!");

</script>

<style>
.about-top {
    padding:0;
    display: flex;
    flex-direction: column;
}

.about-top-top{
    display: flex;
    justify-content: space-between;
    height: 300px;
    box-shadow: 0 15px 15px var(--transparent-gray);
}
.about-top-photo {
    padding: 0 5%;
}
.about-top-photo img{
    height: 280px;
    width: 280px;
    border-radius: 50%;
    transform: translatey(20%);
    filter:saturate(90%);
}
.about-top-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60%;
    min-width: 320px;
}
.about-top-text__title {
    font-size: var(--text-h1);
    padding: 0;
    margin: 0;
}
.about-top-text__subtitle {
    font-size: var(--text-h3);
    padding: 0;
    margin: 0;
}

.about-top-bottom {
    padding: 30px 5%;
    height: 400px;
    min-height: fit-content;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    flex-direction: column;
    width: calc(100% - 320px);
    min-width: 320px;
    align-self: flex-end;
}
.about-bottom-platform {
    display: flex;
    gap: 2rem;
}
.about-bottom-text {
    font-size: var(--text-base);
    text-align: justify;
}
/* 900px */
@media screen and (max-width: 900px) {
    .about-top-top {
        flex-direction: column;
        gap: 2rem;
        padding: 5%;
        min-height: fit-content;
    }
    .about-top-photo {
        padding: 0;
        text-align: center;
    }
    .about-top-photo img {
        width: 200px;
        height: 200px;
        transform: translatey(0);
    }
    .about-top-text {
        width: 100%;
        text-align: center;
    }
    .about-top-text__title {
        font-size: var(--text-h2);
    }
    .about-top-text__subtitle {
        font-size: var(--text-h3);
    }
    .about-top-bottom {
        align-items: center;
        width: 100%;
    }
    .about-bottom-platform {
        justify-content: center;
    }
}
/* 480px */
@media screen and (max-width: 480px) {
    .about-bottom-platform a > img {
        width: 70px;
    }
}
</style>