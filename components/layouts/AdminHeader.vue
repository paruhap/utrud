<template>
    <header>
        <div class="admin-site-link">
            <span>Привет {{ user.name }}</span>
            <button @click="logout">Выйти</button>
            <NuxtLink href="/">Открыть сайт</NuxtLink>
        </div>
        <NuxtLink href="/">
            <img src="~/assets/img/icon/logo.svg"/>
        </NuxtLink>
        <nav class="admin-nav">
            <NuxtLink href="/admin/services">Услуги /</NuxtLink>
            <NuxtLink href="/admin/contents">Контент /</NuxtLink>
            <NuxtLink href="/admin/leads">Заявки /</NuxtLink>
            <NuxtLink href="/admin/users">Пользователи</NuxtLink>
        </nav>
    </header>
</template>

<script setup>
const { user, clear: clearSession } = useUserSession()

async function logout() {
  await clearSession()
  await navigateTo('/')
}
</script>

<style scoped>
header{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border-bottom: 1px solid var(--transparent-red-2);
}
.admin-site-link{
    flex-basis: 40%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
}
.admin-site-link button{
    border: 1px solid var(--transparent-red-5);
}
header img{
    flex-basis: 30%;
    min-width: 120px;
}
header nav{
    flex-basis: 40%;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}
</style>