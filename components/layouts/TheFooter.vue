<template>
    <footer>
        <div class="footer-logo"><img src="~/assets/img/icon/logo.svg" alt=""></div>
        <div class="footer-menu">
            <nuxt-link to="/">Главная</nuxt-link>
            <nuxt-link to="/uslugi">Услуги</nuxt-link>
            <nuxt-link to="/about">Обо мне</nuxt-link>
        </div>
        <div class="footer-spec">
            <a href="legal.pdf" target="_blank">Политика конфиденциальности</a>
            <nuxt-link to="/oplata">Реквизиты</nuxt-link>
        </div>
        <div class="footer-copyright">
            <div class="footer-personal">
                <span>
                    регистрационный номер в реестре операторов, осуществляющих обработку персональных данных 77-24-156587
                 </span>
             </div>
            <p>Трудовой юрист Рябова Е.И. © 2024</p>
        </div>
    </footer>
</template>

<style>
footer{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: fit-content;
    padding: 5% 5% 0;
    background: var(--transparent-gray-2);
    box-shadow: 0 0 5px var(--transparent-red-2);
}
.footer-logo {
    margin: auto;
    height: fit-content;
    padding-bottom:5%;
}
.footer-logo img{
    width: 300px;
}
.footer-menu {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5%;
    padding: 2% 0;
    font-size: var(--text-h3);
    transition: all .5s ease;
}
.footer-menu a:hover {
    border-top: 1px solid var(--transparent-red-2);
}
.footer-spec{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5%;
    padding: 2% 0; 
    font-size: var(--text-m);
    font-style: italic;
}
.footer-personal{
    border-top: 1px solid var(--transparent-red-5);
    margin: auto;
    font-size: var(--text-sm);
    text-align: center;
    padding: 2% 1% 1%;
}
.footer-copyright {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1%;
    font-size: var(--text-m);
}
.footer-copyright p{
    max-width: 640px;
    padding: 0;
    margin: 0 0 2%;
    font-weight: 200;
}
</style>