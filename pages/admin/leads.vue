<script setup>
definePageMeta({
  middleware: ['authenticated'],
  layout:'admin'
})

const form = ref({
  name: '',
  phone: '',
  status: '',
  service_id: null
});

const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);

const openAddModal = () => {
  form.value = {
    name: '',
    phone: '',
    status: 'Новая',
    service_id: null
  };
  isAddModalOpen.value = true;
};

async function submitLead() {
  try {
    await $fetch('/api/leads', {
      method: 'POST',
      body: form.value
    });
    isAddModalOpen.value = false;
    await refresh();
    alert('Лид успешно создан!');
  } catch (error) {
    alert('Ошибка: ' + error.data.message);
  }
}

const editingLead = ref(null);
const isModalOpen = ref(false);

const openEditModal = (lead) => {
  editingLead.value = { ...lead };
  isModalOpen.value = true;
};

const updateLead = async () => {
  try {
    await $fetch(`/api/leads/${editingLead.value.id}`, {
      method: 'PUT',
      body: editingLead.value
    });
    isModalOpen.value = false;
    // Обновляем список
    await refresh();
    alert('Запись обновлена!');
  } catch (error) {
    alert('Ошибка: ' + error.message);
  }
};

const deleteLead = async (id) => {
  if (!confirm('Удалить запись?')) return;
  
  try {
    await $fetch(`/api/leads/${id}`, {
      method: 'DELETE'
    });
    // Обновляем список
    await refresh();
    alert('Запись удалена!');
  } catch (error) {
    alert('Ошибка: ' + error.message);
  }
};

const { data: leads, pending, error, refresh } = useFetch('/api/leads')

const sortKey = ref('created_at');
const sortOrder = ref('desc');

const sortedLeads = computed(() => {
  if (!leads.value) return [];
  
  return [...leads.value].sort((a, b) => {
    let aValue = a[sortKey.value];
    let bValue = b[sortKey.value];
    
    if (sortKey.value === 'created_at') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1;
    return 0;
  });
});

const sort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};

</script>

<template>
  <div>
    <div class="leads-header">
      <h2>Заявки с сайта</h2>
      <button @click="openAddModal" class="add-button">Добавить заявку</button>
    </div>
    
    <!-- Состояние загрузки -->
    <div v-if="pending">Загрузка...</div>
    
    <!-- Ошибка -->
    <div v-if="error" class="error">{{ error.message }}</div>
    
    <!-- Таблица с лидами -->
    <div class="table-wrap">
      <table v-if="leads" class="leads-table">
      <thead>
        <tr>
          <th>Имя</th>
          <th>Телефон</th>
          <th @click="sort('status')" class="sortable">
            Статус
            <span v-if="sortKey === 'status'" class="sort-icon">
              {{ sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th @click="sort('created_at')" class="sortable">
            Дата создания
            <span v-if="sortKey === 'created_at'" class="sort-icon">
              {{ sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th>Редактировать</th>
          <th>Удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lead in sortedLeads" :key="lead.id">
          <td>{{ lead.name }}</td>
          <td>{{ lead.phone }}</td>
          <td :class="['status', `status-${lead.status}`]">{{ lead.status || '-' }}</td>
          <td>{{ new Date(lead.created_at).toLocaleDateString() }}</td>
          <td><button @click="openEditModal(lead)" class="table-btn">Редактировать</button></td>
          <td><button @click="deleteLead(lead.id)" class="table-btn">Удалить</button></td>
        </tr>
      </tbody>
    </table>
    </div>
    
    <!-- Если лидов нет -->
    <div v-if="leads && leads.length === 0">Лидів поки немає</div>

    <!-- Модальное окно добавления -->
    <Transition name="slide">
      <div v-if="isAddModalOpen" class="side-modal">
        <div class="side-modal-close-icon cursor-pointer" @click="isAddModalOpen = false">
          <NuxtImg src="/icon/close.svg"/>
        </div>
        <div class="side-modal-content">
          <h3>Добавить лид</h3>
          <form @submit.prevent="submitLead">
            <input v-model="form.name" placeholder="Имя" required>
            <input v-model="form.phone" placeholder="Телефон">
            <select v-model="form.status">
              <option value="Новая">Новая</option>
              <option value="В работе">В работе</option>
              <option value="Завершено">Завершено</option>
            </select>
            <div class="modal-buttons">
              <button class="modal-buttons-btn" type="submit">Сохранить</button>
              <button class="modal-buttons-btn" type="button" @click="isAddModalOpen = false">Отмена</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Модальное окно редактирования -->
    <Transition name="slide">
      <div v-if="isModalOpen" class="side-modal">
        <div class="side-modal-close-icon cursor-pointer" @click="isModalOpen = false">
          <NuxtImg src="/icon/close.svg"/>
        </div>
        <div class="side-modal-content">
          <h3>Редактировать запись</h3>
          <form @submit.prevent="updateLead">
            <input v-model="editingLead.name" placeholder="Имя">
            <input v-model="editingLead.email" type="email" placeholder="Email">
            <input v-model="editingLead.phone" placeholder="Телефон">
            <select v-model="editingLead.status">
              <option value="Новая">Новая</option>
              <option value="В работе">В работе</option>
              <option value="Завершено">Завершено</option>
            </select>
            <div class="modal-buttons">
              <button type="submit">Сохранить</button>
              <button type="button" @click="isModalOpen = false">Отмена</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.table-wrap{
  width: 100%;
  margin-bottom: 5%;
}
.leads-table{  
  max-width: 1200px;
  min-width: 480px;
  width: 100%;
  margin: auto;
  border-collapse: collapse;
  border: 1px solid grey;
  font-size: var(--text-m);
}
 .leads-table td, .leads-table th{
  border-collapse: collapse;
  border: 1px solid var(--transparent-red-2);
  padding:10px;
}
.leads-table th{  
  padding: 10px;
  border: 1px solid var(--transparent-red-5);
  font-weight: 500;
}
td button{
  border: 1px solid var(--transparent-red-2);
}
td button:hover{
  border: 1px solid var(--transparent-red-9);
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
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  min-width: 300px;
}

.modal-content form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}
.modal-buttons-btn{
  border: 1px solid var(--transparent-red-2);
}
.modal-buttons-btn:hover{
  border: 1px solid var(--transparent-red-9);
}
.leads-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5%;
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

/* Модальное окно */
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

.side-modal-close-icon {
  margin: 1rem;
}

.side-modal-close-icon img {
  width: 28px;
  height: auto;
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
.side-modal-content select {
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

.sortable {
  cursor: pointer;
  user-select: none;
  position: relative;
}

.sortable:hover {
  background-color: var(--transparent-red-1);
}

.sort-icon {
  margin-left: 4px;
  display: inline-block;
}

/* Стили для статусов */
.status {
  font-weight: 500;
}

.status-Новая {
  color: #856404;
  background-color: rgba(255, 243, 205, 0.5);
}

.status-В.работе {
  color: #155724;
  background-color: rgba(212, 237, 218, 0.5);
}

.status-Завершено {
  color: #383d41;
  background-color: rgba(230, 230, 230, 0.5);
}
</style>