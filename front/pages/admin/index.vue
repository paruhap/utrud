<template>
    <nuxt-link to="/admin/users">Пользователи</nuxt-link>
    <nuxt-link to="/admin/services">Услуги</nuxt-link>
    <nuxt-link to="/admin/media">Контент</nuxt-link>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'admin'
})
</script>