<!-- pages/contact.vue -->
<script setup>
definePageMeta({
  middleware: ['authenticated'],
  layout: 'admin'
})

const form = ref({
  login: '',
  name: '',
  secondname: '',
  lastname: '',
  email: '',
  phone: '',
  phone2: '',
  telegram: '',
  whatsapp: '',
  address: '',
  text: ''
});

const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);
const editingUser = ref(null);

const openAddModal = () => {
  form.value = {
    login: '',
    name: '',
    secondname: '',
    lastname: '',
    email: '',
    phone: '',
    phone2: '',
    telegram: '',
    whatsapp: '',
    address: '',
    text: ''
  };
  isAddModalOpen.value = true;
};

const openEditModal = (user) => {
  editingUser.value = { ...user };
  isEditModalOpen.value = true;
};

async function submitUser() {
  try {
    await $fetch('/api/users', {
      method: 'POST',
      body: form.value
    });
    isAddModalOpen.value = false;
    await refresh();
    alert('Пользователь успешно создан!');
  } catch (error) {
    alert('Ошибка: ' + error.data.message);
  }
}

const updateUser = async () => {
  try {
    await $fetch(`/api/users/${editingUser.value.id}`, {
      method: 'PUT',
      body: editingUser.value
    });
    isEditModalOpen.value = false;
    await refresh();
    alert('Запись обновлена!');
  } catch (error) {
    alert('Ошибка: ' + error.message);
  }
};

const deleteUser = async (id) => {
  if (!confirm('Удалить пользователя?')) return;
  try {
    await $fetch(`/api/users/${id}`, { method: 'DELETE' });
    await refresh();
    alert('Пользователь удален!');
  } catch (error) {
    alert('Ошибка: ' + error.message);
  }
};

const { data: users, pending, error, refresh } = useFetch('/api/users')
</script>

<template>
  <div>
    <div class="leads-header">
      <h2>Управление пользователями</h2>
      <button @click="openAddModal" class="add-button">Добавить пользователя</button>
    </div>

    <div v-if="pending">Загрузка...</div>
    <div v-if="error" class="error">{{ error.message }}</div>
    <div class="user-wrap">
      <div class="user-card" v-for="user in users" :key="user.id">
        <span><b>{{ user.lastname || '—' }}</b></span>
        <span>{{ user.name }}</span>
        <span>{{ user.secondname || '—' }}</span>
        <span>Email - {{ user.email }}</span>
        <span>Телефон - {{ user.phone || '—' }}</span>
        <span>Телефон 2 - {{ user.phone2 || '—' }}</span>
        <span>Телеграм - {{ user.telegram || '—' }}</span>
        <span>WhatsApp - {{ user.whatsapp || '—' }}</span>
        <span>Адрес - {{ user.address || '—' }}</span>
        <span> Текст - {{ user.body || '—' }}</span>
        <button @click="openEditModal(user)" class="table-btn">Редактировать</button>
        <button @click="deleteUser(user.id)" class="table-btn">Удалить</button>
      </div>
    </div>

    <!-- Модальное окно добавления -->
    <Transition name="slide">
      <div v-if="isAddModalOpen" class="side-modal">
        <div class="side-modal-content">
          <h3>Добавить пользователя</h3>
          <form @submit.prevent="submitUser">
            <input v-model="form.login" placeholder="Логин" type="text" required>
            <input v-model="form.name" placeholder="Имя" type="text">
            <input v-model="form.secondname" placeholder="Отчество" type="text">
            <input v-model="form.lastname" placeholder="Фамилия" type="text">
            <input v-model="form.email" type="email" placeholder="Email">
            <input v-model="form.phone" placeholder="Телефон" type="tel">
            <input v-model="form.phone2" placeholder="Телефон 2" type="tel">
            <input v-model="form.telegram" placeholder="Telegram" type="text">
            <input v-model="form.whatsapp" placeholder="WhatsApp" type="text">
            <input v-model="form.address" placeholder="Адрес" type="text">
            <textarea v-model="form.text" placeholder="Текст" rows="4"></textarea>
            <div class="modal-buttons">
              <button type="submit">Сохранить</button>
              <button type="button" @click="isAddModalOpen = false">Отмена</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Модальное окно редактирования -->
    <Transition name="slide">
      <div v-if="isEditModalOpen" class="side-modal">
        <div class="side-modal-content">
          <h3>Редактировать пользователя</h3>
          <form @submit.prevent="updateUser">
            <input v-model="editingUser.login" placeholder="Логин" type="text" required>
            <input v-model="editingUser.name" placeholder="Имя" type="text">
            <input v-model="editingUser.secondname" placeholder="Отчество" type="text">
            <input v-model="editingUser.lastname" placeholder="Фамилия" type="text">
            <input v-model="editingUser.email" type="email" placeholder="Email">
            <input v-model="editingUser.phone" placeholder="Телефон" type="tel">
            <input v-model="editingUser.phone2" placeholder="Телефон 2" type="tel">
            <input v-model="editingUser.telegram" placeholder="Telegram" type="text">
            <input v-model="editingUser.whatsapp" placeholder="WhatsApp" type="text">
            <input v-model="editingUser.address" placeholder="Адрес" type="text">
            <textarea v-model="editingUser.text" placeholder="Текст" rows="4"></textarea>
            <div class="modal-buttons">
              <button type="submit">Сохранить</button>
              <button type="button" @click="isEditModalOpen = false">Отмена</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.user-wrap{
  padding: 3%;
  width: 100%;
}
.user-card{
  max-width: 100px;
  min-width: fit-content;
  border: 1px solid var(--transparent-red-2);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: auto;
  gap: 1rem;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  min-width: 300px;
  max-width: 500px;
  width: 100%;
}

.modal-content form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-content input {
  padding: 8px;
  border: 1px solid var(--transparent-red-2);
  border-radius: 4px;
}

.modal-buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.modal-buttons-btn {
  padding: 8px 16px;
  border: 1px solid var(--transparent-red-2);
  border-radius: 4px;
}

.modal-buttons-btn:hover {
  border-color: var(--transparent-red-9);
}

.leads-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1rem;
}

.add-button {
  padding: 0.5rem 1rem;
  background: var(--red-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover {
  background: var(--dark-red-color);
}

@media (max-width: 768px) {
  .leads-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .modal-content {
    margin: 1rem;
    max-height: 90vh;
    overflow-y: auto;
  }
}

.side-modal {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 640px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow-y: auto;
}

.side-modal-content {
  padding: 2rem;
}

.side-modal-content form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.side-modal-content input,
.side-modal-content textarea {
  padding: 8px;
  border: 1px solid var(--transparent-red-2);
  border-radius: 4px;
}

/* Анимация слайда */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>