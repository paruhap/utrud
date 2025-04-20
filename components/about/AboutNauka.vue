<template>
    <div class="about-nauka">
        <div class="about-text">
            <h3 class="about-text-title">{{ aboutNauka.subtitle }}</h3>
            <p class="about-text-text">{{ aboutNauka.body }}</p>
        </div>
        <div class="about-icon">
            <a href="https://elibrary.ru/author_counter_click.asp?id=802579" target="_blank">
                <img src="https://elibrary.ru/author_counter.aspx?id=802579" alt="Публикации Рябова Е.И.">
                <span> РИНЦ - профиль автора</span>
            </a>
        </div>
    </div>
</template>
<script setup> 
const { data: contents } = await useFetch('/api/contents');
const aboutNauka = contents.value.find(item => item.title === "Наука ?!");
</script>
<style>
.about-nauka {
    display: flex;
    align-items: center;
    padding: 5%;
}
.about-text h3{
    font-size: var(--text-h3);
}
.about-text-title {
    font-style: var(--text-h3);
}
.about-text-text {
    font-size: var(--text-base);
}
.about-icon a{
    width: 160px;
    display: flex;
    flex-direction: column;
}
.about-icon a span{
    font-size: var(--text-sm);
}
/* Адаптивность */
@media (max-width: 900px) {
    .about-nauka{
        flex-direction: column;
        gap: 2rem;
    }
}
</style>