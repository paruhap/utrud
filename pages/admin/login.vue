<script setup lang="ts">
const { loggedIn, user, fetch: refreshSession } = useUserSession()
const credentials = reactive({
  email: '',
  password: '',
})
async function login() {
  $fetch('/api/login', {
    method: 'POST',
    body: credentials
  })
  .then(async () => {
    // Refresh the session on client-side and redirect to the home page
    await refreshSession()
    await navigateTo('/admin')
  })
  .catch(() => alert('Bad credentials'))
}
</script>

<template>
  <div class="login-form-wrap">
    <form @submit.prevent="login">
    <input v-model="credentials.email" type="email" placeholder="Email" />
    <input v-model="credentials.password" type="password" placeholder="Password" />
    <button type="submit">Войти</button>
  </form>
  </div>
</template>

<style scoped>
  .login-form-wrap{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5%;
    min-height: 50vh;
  }
  .login-form-wrap form{
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .login-form-wrap form input{
    height: 2rem;
    background-color: transparent;
    outline: none;
    border:1px solid var(--transparent-red-5);
  }
  .login-form-wrap form input{
    height: 2rem;
    background-color: transparent;
    outline: none;
    border:1px solid var(--transparent-red-5);
  }
  .login-form-wrap form input{
    height: 2rem;
    background-color: transparent;
    outline: none;
    border:1px solid var(--transparent-red-5);
  }
  .login-form-wrap form button{
    height: 2rem;
    background-color: var(--transparent-red-2);
    outline: none;
    border:1px solid var(--transparent-red-9);
  }
  .login-form-wrap form button:hover{
    background-color: var(--transparent-red-5);
  }
</style>