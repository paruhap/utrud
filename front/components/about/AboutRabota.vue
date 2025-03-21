<template>
    <div class="about-rabota">
        <div class="about-rabota-top">
            <div class="about-rabota-top-text">
                <h3>Более 20 лет в судах</h3>
                <p>2000 судебных заседаний в «топовых» судах г. Москвы в качестве гособвинителя (прокурора) и судебного представителя: с 2002 по 2011 преимущественно в Москве (суды общей юрисдикции, арбитраж, уголовные и гражданские процессы); с 2011 по настоящее время в Москве, Севастополе, Крыму, Краснодаре (суды общей юрисдикции, реже арбитраж);</p>
            </div>
            <div class="about-rabota-top-photo">
                <img src="~/assets/img/photo_prokuror.jpg" alt="Прокурор трудовое право" srcset="">
            </div>
        </div>
        <div class="about-rabota-bottom">
            <h3 class="about-rabota-bottom-title">Опыт преподавательской деятельности более 6 лет</h3>
            <p class="about-rabota-bottom-text">Доцент кафедры трудового права Академии труда и социальных отношений (Севастополь). Преподаваемые дисциплины: трудовое право, трудовые споры, актуальные проблемы трудового права, трудовое право зарубежных стран.Доцент кафедры гражданского права и процесса Севастопольского государственного университета. Преподаваемые дисциплины: трудовое право. Доцент кафедры правоведения Крымского федерального университета (Севастополь). Преподаваемые дисциплины: трудовое право. Разработчик, преподаватель курсов повышения квалификации и профессиональной переподготовки (разработано и реализовано более 30 образовательных программ):</p>
        </div>
        <ul class="about-rabota-bottom-list">
            <li>«Инспектор по кадрам» (РЭУ им. Г.В. Плеханова);</li>
            <li>«Управление персоналом в соответствии с требованиями законодательства РФ» (РЭУ им. Г.В. Плеханова, АТиСО);</li>
            <li>«Кадровое делопроизводство» (РЭУ им. Г. В. Плеханова, АТиСО);</li>
            <li>«Кадровое делопроизводство на государственной гражданской службе» (РЭУ им. Г.В. Плеханова);</li>
            <li>«Основы государственной гражданской службы, профилактики и противодействия коррупции на государственной гражданской службе» и др.</li>
        </ul>
    </div>
</template>

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