<template>
  <form class="baner-form" @submit.prevent="submitForm">
    <h2>Отправить заявку на консультацию</h2>
    <input 
      v-model="form.name" 
      type="text" 
      placeholder="Ваше имя" 
      required
    >
    <input 
      v-model="form.phone" 
      type="tel" 
      placeholder="Ваш телефон" 
      required
    >
    <div v-if="message" :class="['form-message', { error: message.includes('Ошибка') }]">
      {{ message }}
    </div>
    <button 
      class="main-baner__btn-btn" 
      :disabled="!soglChek || isLoading"
    >
      {{ isLoading ? 'Отправка...' : 'Отправить' }}
    </button>
    <div class="soglasie-wrap">
      <input type="checkbox" name="sogl" id="sogl" v-model="soglChek">
      <span>Согласен c политикой конфиденциальности</span>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
  serviceText: {
    type: String,
    default: ''
  }
});
const form = ref({
  name: '',
  phone: '',
  service:props.serviceText
});

const soglChek = ref(false);
const isLoading = ref(false);
const message = ref('');

const submitForm = async () => {
  if (!form.value.name || !form.value.phone || !soglChek.value) {
    message.value = 'Пожалуйста, заполните все поля и примите условия';
    return;
  }
  
  isLoading.value = true;
  message.value = '';
  
  try {
    const response = await $fetch('/api/telegram', {
      method: 'POST',
      body: {
        name: form.value.name,
        phone: form.value.phone,
        service: form.value.service || '' // Убедимся что service всегда определен
      }
    });

    if (response.success) {
      message.value = 'Заявка успешно отправлена!';
      form.value = { 
        name: '', 
        phone: '', 
        service: props.serviceText 
      };
      soglChek.value = false;
    }
  } catch (error) {
    console.error('Form submission error:', error);
    message.value = 'Ошибка при отправке. Попробуйте позже.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Форма */
.baner-form{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.baner-form h2{
    text-align: center;
}
.baner-form input::placeholder, .baner-form textarea::placeholder{
    font-family: 'IBM Plex mono', monospace;
    font-size: 1rem;
    font-weight: 300;
}
.baner-form input, .baner-form textarea{
    padding: 10px;
    background: transparent;
    box-shadow: 0 0 1px var(--dark-red-color);
    border: none;
}
.baner-form input:focus-visible, .baner-form textarea:focus-visible{
    box-shadow: 0 0 10px var(--transparent-red-2);
    border: none;
    outline: none;
}
.main-baner__btn-btn:disabled{
    opacity: .3;
}
.soglasie-wrap{
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: var(--text-sm);
    font-style: italic;
}
/* 560px */
@media screen and (max-width: 800px){
    .main-baner__content{
        padding: 5% 0;
        flex-wrap: wrap;
        justify-content: space-around;
        gap: 2rem;
    }
    .main-baner__text{
        text-align: center;
    }
    .main-baner__btn{
        align-self: center;
    }
}
/* 400px */
@media screen and (max-width: 400px){
   .main-baner__title{
    font-size: var(--text-l);
   } 
}

.form-message {
  text-align: center;
  padding: 0.5rem;
  border-radius: 4px;
  background: var(--submit);
}

.form-message.error {
  background: var(--transparent-red-2);
}
</style>