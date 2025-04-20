<template>
    <div class="bank-grid">
        <h2 class="oplata-title">Реквизиты для оплаты</h2>
        <div class="bank-grid-qr">
            <span class="bank-qr-title">Перевод на карту</span>
            <img src="~/assets/img/qr-code.png" alt="" srcset="">
        </div>
        <div class="bank-grid-bp">
            <div class="bank-grid-bp-logo">
                <NuxtImg src="sbp.png"></NuxtImg>
            </div>
            <span class="bank-grid-bp-tel">По номеру телефона: <b>+7(978)704-5157</b></span>
            <p class="bank-grid-bp-name">Получатель платежа: <b>РЯБОВА ЕВГЕНИЯ ИГОРЕВНА</b></p>
            <div class="bank-grid-bp-text">СБЕР, Т-банк(Тинькофф), РНКБ, ВТБ</div>
        </div>
        <p class="bank-grid-bottom">
            Возможна оплата в рассрочку, кредитными картами, по реквизитам и пр.
        </p>
    </div>
</template>

<style>
.bank-grid {
    display: flex;
    flex-wrap: wrap;
    padding: 5%;
}
.oplata-title {
    font-size: var(--text-h3);
    padding: 2rem;
    text-align: center;
    flex-basis: 100%;
}
.bank-grid-qr {
    display: flex;
    flex-direction: column;
    flex-basis: 50%;
    padding: 1rem;
}
.bank-grid-qr img{
    max-height: 320px;
    object-fit: contain;
}
.bank-qr-title {
    font-size: var(--text-h3);
    text-align: center;
    padding: 1rem;
}
.bank-grid-bp {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    flex-basis: 50%;
    padding: 1rem;
    font-size: var(--text-m);
}
.bank-grid-bp-logo img{
    max-height: 128px;
    object-fit: contain;
}
.bank-grid-bottom {
    font-size: var(--text-base);
    text-align: center;
    flex-basis: 100%;
}

@media (max-width:720px) {
    .bank-grid{
        flex-direction: column;
        align-items: center;
    }
}
</style>