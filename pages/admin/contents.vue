<!-- pages/contact.vue -->
<script setup>
definePageMeta({
  middleware: ['authenticated'],
  layout:'admin'
})

const form = ref({
    block: '',
    title: '',
    subtitle: '',
    description: '',
    body: '',
    image: '',
    image2: '', // исправлено с imag2
    anchor: '',
    anchor2: '',
});

async function submitLead() {
  try {
    await $fetch('/api/contents', {
      method: 'POST',
      body: form.value
    });
    alert('Контент успешно создан!');
  } catch (error) {
    alert('Ошибка: ' + error.data.message);
  }
}

const { data: contents, pending, error, refresh } = useFetch('/api/contents')

const uniqueBlocks = computed(() => {
  if (!contents.value) return [];
  return [...new Set(contents.value.map(item => item.block))];
});

const selectedBlock = ref('all');

const filteredContents = computed(() => {
  if (!contents.value) return [];
  if (selectedBlock.value === 'all') return contents.value;
  return contents.value.filter(item => item.block === selectedBlock.value);
});

const editingContent = ref(null);
const isEditModalOpen = ref(false);

const openEditModal = (content) => {
  editingContent.value = { ...content };
  isEditModalOpen.value = true;
};

const updateContent = async () => {
  try {
    await $fetch(`/api/contents/${editingContent.value.id}`, {
      method: 'PUT',
      body: editingContent.value
    });
    isEditModalOpen.value = false;
    await refresh();
    alert('Контент обновлен!');
  } catch (error) {
    alert('Ошибка: ' + error.message);
  }
};

const deleteContent = async (id) => {
  if (!confirm('Удалить запись?')) return;
  try {
    await $fetch(`/api/contents/${id}`, { method: 'DELETE' });
    await refresh();
    alert('Запись удалена!');
  } catch (error) {
    alert('Ошибка: ' + error.message);
  }
};

const truncateText = (text, length = 128) => {
  if (!text) return '—';
  return text.length > length ? text.slice(0, length) + '...' : text;
};

const isAddModalOpen = ref(false);

const openAddModal = () => {
  form.value = {
    block: '',
    title: '',
    subtitle: '',
    description: '',
    body: '',
    image: '',
    image2: '',
    anchor: '',
    anchor2: ''
  };
  isAddModalOpen.value = true;
};

</script>

<template>
    <div>
      <div class="leads-header">
      <h2>Управление контентом</h2>
      <button @click="openAddModal" class="add-button">Добавить контент</button>
    </div>
    
    <!-- Состояние загрузки -->
    <div v-if="pending">Загрузка...</div>
    
    <!-- Ошибка -->
    <div v-if="error" class="error">{{ error.message }}</div>
    
    <div class="filter-section">
      <label for="block-filter">Фильтр по блокам:</label>
      <select v-model="selectedBlock" id="block-filter">
        <option value="all">Все блоки</option>
        <option v-for="block in uniqueBlocks" :key="block" :value="block">
          {{ block }}
        </option>
      </select>
    </div>

    <!-- Таблица с лидами -->
    <div class="contents-table-wrap">
      <h3>Внимание !!! При редактировании записи НЕ меняй название поля Блок и поля с ?!</h3>
      <table v-if="filteredContents.length" class="contents-table">
      <thead>
        <tr>
          <th>Блок</th>
          <th>Заголовок</th>
          <th>Подзаголовок</th>
          <th>Описание</th>
          <th class="th-text">Текст</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="content in filteredContents" :key="content.id">
            <td>{{ content.block }}</td>
            <td>{{ truncateText(content.title, 64) }}</td>
            <td>{{ truncateText(content.subtitle, 64) }}</td>
            <td>{{ truncateText(content.description) }}</td>
            <td class="th-text">{{ truncateText(content.body) }}</td>
            <td><button @click="openEditModal(content)" class="edit-btn">Редактировать</button></td>
            <td><button @click="deleteContent(content.id)" class="delete-btn">Удалить</button></td>
        </tr>
      </tbody>
    </table>
    </div>
    
    <!-- Если лидов нет -->
    <div v-if="contents && contents.length === 0">Контента немає</div>

    <!-- Модальное окно добавления -->
    <Transition name="slide">
      <div v-if="isAddModalOpen" class="side-modal">
        <div class="side-modal-content">
          <h3>Добавить контент</h3>
          <form @submit.prevent="submitLead">
            <input v-model="form.block" placeholder="Блок" required>
            <input v-model="form.title" type="text" placeholder="Заголовок">
            <input v-model="form.subtitle" type="text" placeholder="Подзаголовок">
            <input v-model="form.description" type="text" placeholder="Описание">
            <textarea v-model="form.body" placeholder="Текст" rows="4"></textarea>
            <input v-model="form.image" type="text" placeholder="Изображение">
            <input v-model="form.image2" type="text" placeholder="Изображение 2">
            <input v-model="form.anchor" type="text" placeholder="Якорь">
            <input v-model="form.anchor2" type="text" placeholder="Якорь 2">
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
        <div class="side-modal-close-icon cursor-pointer" @click="isEditModalOpen = false">
          <NuxtImg src="/icon/close.svg"/>
        </div>
        <div class="side-modal-content">
          <h3>Редактировать контент</h3>
          <h3 style="color:red">Внимание !!! Не меняй название поля Блок и поля с ?!</h3>
          <form @submit.prevent="updateContent">
            <input v-model="editingContent.block" placeholder="Блок" required>
            <input v-model="editingContent.title" type="text" placeholder="Заголовок">
            <input v-model="editingContent.subtitle" type="text" placeholder="Подзаголовок">
            <input v-model="editingContent.description" type="text" placeholder="Описание">
            <textarea v-model="editingContent.body" placeholder="Текст" rows="4"></textarea>
            <input v-model="editingContent.image" type="text" placeholder="Изображение">
            <input v-model="editingContent.image2" type="text" placeholder="Изображение 2">
            <input v-model="editingContent.anchor" type="text" placeholder="Якорь">
            <input v-model="editingContent.anchor2" type="text" placeholder="Якорь 2">
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
.filter-section {
  margin: 1rem 0;
  padding: 1rem;
  background: var(--transparent-gray-2);
  border-radius: 4px;
}

.filter-section select {
  margin-left: 1rem;
  padding: 0.5rem;
  border: 1px solid var(--transparent-red-2);
  border-radius: 4px;
}

.edit-btn, .delete-btn {
  padding: 0.3rem 0.8rem;
  margin: 0 0.2rem;
  border: 1px solid var(--transparent-red-2);
  border-radius: 4px;
}

.delete-btn:hover {
  border-color: red;
  color: red;
}

.contents-table-wrap{
  width: 100%;
  padding: 3%;
}

.contents-table-wrap h3{
  text-align: center;
}

.contents-table{
  border-collapse: collapse;
  border: 1px solid var(--transparent-red-9);
  margin: auto;
}

.contents-table td,  .contents-table tr, .contents-table th{
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-collapse: collapse;
  border: 1px solid var(--transparent-red-5);
  padding: 10px;
}
.th-text{
  width: 70%;
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
.side-modal-close-icon{
    margin: 1rem 0 0 1rem;
}
.side-modal-close-icon img{
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

.leads-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
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
</style>