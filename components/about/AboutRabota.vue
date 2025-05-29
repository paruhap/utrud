<template>
    <div class="about-rabota">
        <div class="about-rabota-top">
            <div class="about-rabota-top-text">
                <h3>{{ aboutSud.subtitle }}</h3>
                <p>{{ aboutSud.body }}</p>
            </div>
            <div class="about-rabota-top-photo">
                <img src="~/assets/img/photo_prokuror.jpg" alt="Прокурор трудовое право" srcset="">
            </div>
        </div>
        <div class="about-rabota-bottom">
            <h3 class="about-rabota-bottom-title">{{ aboutPrepod.subtitle }}</h3>
            <p class="about-rabota-bottom-text">{{ aboutPrepod.body }}</p>
        </div>
        <ul class="about-rabota-bottom-list">
            <li v-for="item in aboutSpisok" :key="item">
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<script setup>
const { data: contents } = await useFetch('/api/contents');
const aboutSud = contents.value.find(item => item.title === "Суды ?!");
const aboutPrepod = contents.value.find(item => item.title === "Преподавание ?!");
const aboutSpisok = aboutPrepod ? aboutPrepod.description.split(';') : [];
</script>

<style>
.about-rabota {
    padding: 5%;
}
.about-rabota-top {
    display: flex;
    justify-content: space-between;
    gap: 5%;
}
.about-rabota-top-text {
    font-size: var(--text-base);
    text-align: justify;
}
.about-rabota-top-photo img{
    height: 300px;
}
.about-rabota-bottom{
    display: flex;
    flex-direction: column;
}
.about-rabota-bottom-title {
    font-size: var(--text-h3);
}
.about-rabota-bottom-text{
    font-size: var(--text-base);
    text-align: justify;

}
.about-rabota-bottom-list{
    font-size: var(--text-m);
}
/* 900px */
@media (max-width: 900px) {
    .about-rabota-top {
        flex-direction: column;
    }
    .about-rabota-top-photo img{
        width:100%;
        height: auto;
    }
}
</style>