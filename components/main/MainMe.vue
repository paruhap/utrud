<template>
    <section class="about-blok">
        <h2>{{ content?.blok || 'О СЕБЕ' }}</h2>
        <h3>{{ content.title }}</h3>
        <h4>{{ content.subtitle }}</h4>
        <p >{{ content.body }}</p>
        <p v-if="content.description">{{ content.description }}</p>
        <nuxt-link to="/about">Подробнее</nuxt-link>
    </section>
</template>

<script setup>
import {reactive } from 'vue';



const defaultAbout = {
    block: "О СЕБЕ",
    title: "РЯБОВА ЕВГЕНИЯ ИГОРЕВНА",
    subtitle: "КАНДИДАТ НАУК",
    body: "кандидат наук, специалист в отрасли трудового права. Юридический стаж более 20 лет, 2000 судебных заседаний в «топовых» судах Москвы и ЮФО (Краснодар, Симферополь, Севастополь).",
    description: "",
    anchor: "/about",
    anchor2: ""
};

const content = reactive({...defaultAbout});

const { data: contents } = await useFetch('/api/contents');
const baner = contents.value.find(item => item.block === "О СЕБЕ");
if (baner) {
    Object.assign(content, {
        title: baner.title ?? defaultBaner.title,
        subtitle: baner.subtitle ?? defaultBaner.subtitle,
        description: baner.description ?? defaultBaner.description,
        body: baner.body ?? defaultBaner.body,
        anchor: baner.anchor ?? defaultBaner.anchor,
        anchor2: baner.anchor2 ?? defaultBaner.anchor2
    });
}

</script>

<style scoped>
.about-blok {
    height: 100vh;
    min-height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 5%;
    color: var(--red-color);
    box-sizing: border-box;
}
.about-blok h2 {
    font-size: var(--text-h2);
    border-bottom: 1px solid var(--transparent-red-9);
}
.about-blok h3 {
    font-size: var(--text-h1);
    margin-bottom: 1rem;
    text-align: center;
}
.about-blok h4 {
    font-size: var(--text-h3);
    padding-top: 0;
    margin-top: 0;
}
.about-blok p {
    color: var(--dark-red-color);
    font-size: var(--text-base);
    max-width: 960px;
    text-align: center;
    margin-bottom: 3rem;
}
.about-blok a {
    padding: 1rem 2rem;
    border: 1px solid var(--transparent-red-5);
    font-size: var(--text-btn);
    transition: background-color .5s ease-in-out;
    font-family: var(--font-title);
}
.about-blok a:hover{
    background-color:var(--transparent-red-9);
    color: var(--light-color);
    box-shadow: 0 0 5px var(--transparent-red-5);
}
</style>