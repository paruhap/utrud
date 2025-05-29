<template>
    <div class="contact-blok" id="contact-blok">
        <h2 class="blok-title">КОНТАКТЫ</h2>
        <div class="contact-icon">
            <a target="_blank" :href="'mailto:' + user.email" class="contact-icon__link"><img src="~/assets/img/icon/email.svg" alt=""></a>
            <a target="_blank" :href="'https://t.me/' + user.telegram" class="contact-icon__link"><img src="~/assets/img/icon/telegram.svg" alt=""></a>
            <a target="_blank" :href="'https://wa.me/' + user.whatsapp" class="contact-icon__link"><img src="~/assets/img/icon/whatsapp.svg" alt=""></a>
        </div>
        <div class="contact-phone">
                <a :href="'tel:' + user.phone.replace(/[\s\(\)\[\]\{\}\-\,\.]/g, '')"><img src="~/assets/img/icon/phone.svg" alt=""></a>
                <a :href="'tel:' + user.phone.replace(/[\s\(\)\[\]\{\}\-\,\.]/g, '')" class="contact-phone__link">{{ user.phone }}</a>
        </div>
        <div class="contact-bottom">
            <div class="contact-adress">
                <div class="contact-adress-text"><img src="~/assets/img/icon/address.svg" alt=""><span>{{ user.address }}</span></div>
                <div class="contact-adress-map">
                    <iframe src="https://yandex.ru/map-widget/v1/?z=12&amp;ol=biz&amp;oid=207799613029" width="100%" height="100%" frameborder="0"></iframe>
                </div>
            </div>
            <div class="contact-form-wrap">
                <MainForm/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';


// Значения по умолчанию
const defaultUser = {
    phone: '+7 (978) 704-51-57',
    whatsapp: '79787045157',
    email: 'havana79@yandex.ru',
    telegram: 'urist_ryabova',
    address:''
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
            telegram: newData[0].telegram ?? defaultUser.telegram,
            address: newData[0].address
        });
    }
}, { immediate: true });
</script>

<style>
.contact-blok{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding:0 5%;
    min-height: fit-content;
}

.contact-icon{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
    padding: 3%;
}
.contact-icon__link{
    transition: transform .3s ease-in-out;
}
.contact-icon__link:hover{
    transform: scale(1.05);
}
.contact-icon__link  img{
    height: 50px;
    width: 50px;
}

.contact-phone{
    padding: 2rem;
    font-size: var(--text-h3);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    transition: transform .3s ease-in-out;
}

.contact-phone a{
    display: flex;
    align-items: center;
    justify-content: center;
}

.contact-phone:hover{
    transform: scale(1.05);
}

.contact-phone img{
    height: var(--text-h3);
    width: var(--text-h3);
}

.contact-bottom{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5%;
    min-height: fit-content;
    padding: 5%;
    width: 100%;
}

.contact-adress {
    position: relative;
    border: 1px solid  var(--transparent-red-2);
    background:var(--transparent-gray-5);
    min-width: 300px;
    width: 40%;
    min-height: 300px;
    margin-bottom: 1rem;
}
.contact-adress-text {
    position: absolute;
    top: 0;
    width: 100%;
    height: fit-content;
    padding: 10px;
    background: var(--transparent-gray-5);
    backdrop-filter:  blur(7px);
    z-index: 5;
    font-size: 1.3rem;
    font-weight: 300;
    display: flex;
    align-items: center;
    color: var(--dark-text-color);
}
.contact-adress-text span{
    font-size: var(--text-m);
    padding: 0 10px;
}
.contact-adress-text img{
    height: 32px;
    margin: 0px;
}
.contact-adress-map {
    height: 100%;
    filter: sepia(50%);
}
.contact-adress-map iframe{
    opacity: .6;
}
.contact-form-wrap {
    border: 1px solid  var(--transparent-red-2);
    padding: 1rem;
    background:var(--transparent-gray-5);
    min-width: 300px;
    width: 40%;
    min-height: 300px;
    margin-bottom: 1rem;
}
.contact-form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
    height: 100%;
}
.contact-form input{
    flex-basis: calc(50% - .5rem);
    box-sizing: border-box;
    background: var(--transparent-gray-5);
    backdrop-filter: blur(5px);
    outline: none;
    border: 1px solid var(--transparent-red-2);
    flex-basis: 15%;
    width: 100%;
}
.contact-form textarea{
    box-sizing: border-box;
    background: var(--transparent-gray-5);
    backdrop-filter: blur(5px);
    outline: none;
    border: 1px solid var(--transparent-red-2);
    flex-basis: 35%;
    width: 100%;
}
.contact-form span{
    flex-basis: 15%;
    font-size: var(--text-sm);
}
.contact-form-btn {
    box-sizing: border-box;
    background: var(--transparent-red-5);
    backdrop-filter: blur(5px);
    outline: none;
    border: 1px solid var(--transparent-red-9);
    font-size: var(--text-m);
    font-weight: 300;
    padding:10px 15px;
    height: fit-content;
    flex-basis: 20%;
    transition: background-color .5s ease-in;
    font-family: var(--font-title);
}
.contact-form-btn:hover{
    background: var(--transparent-red-9);
    color: var(--light-color);
}
/* 720px */
@media (max-width: 800px) {
    .contact-icon{
        padding: 5%;
    }
    .contact-blok{
        padding: 5%;
    }
    .contact-adress, .contact-form-wrap{
        width: 100%;
    }
    .contact-form-btn{
        width: 80%;
    }
}
/* 560px */
@media (max-width: 560px) {
    .contact-phone{
        flex-direction: column;
        gap: 1rem;
    }
    .contact-phone img{
        display: none;
    }
}
</style>