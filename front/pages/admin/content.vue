<template>
    <div class="content-page">
        <h1>Контент</h1>
        <button @click="showAddModal = true" class="add-btn">Добавить блок контента</button>
        <div v-for="content in contents" :key="content.id" class="content-card">
            <div class="content-content">
                <h3 v-if="content.block">Блок: {{ content.block }}</h3>
                <h3 v-if="content.title">Заголовок: {{ content.title }}</h3>
                <div v-if="content.subtitle">Подзаголовок: {{ content.subtitle }}</div>
                <p v-if="content.text">Текст: {{ content.text }}</p>
                <p v-if="content.subtext">Подтекст: {{ content.subtext }}</p>
                <div v-if="content.link">Ссылка 1: {{ content.link }}</div>
                <div v-if="content.link2">Ссылка 2: {{ content.link2 }}</div>
            </div>
            <div class="content-actions">
                <button @click="editContent(content)" class="edit-btn">Редактировать</button>
                <button @click="deleteContent(content.id)" class="delete-btn">Удалить</button>
            </div>
        </div>

        <!-- Модальное окно добавления контента -->
        <teleport to="body">
            <div v-if="showAddModal" class="modal">
                <div class="modal-content">
                    <h2>Добавить блок контента</h2>
                    <form @submit.prevent="addContent" class="content-form">
                        <input v-model="newContent.block" required placeholder="Блок">
                        <input v-model="newContent.title" placeholder="Заголовок">
                        <input v-model="newContent.subtitle" placeholder="Подзаголовок">
                        <textarea v-model="newContent.text" placeholder="Текст"></textarea>
                        <input v-model="newContent.subtext" placeholder="Подтекст">
                        <input v-model="newContent.link" placeholder="Ссылка 1">
                        <input v-model="newContent.link2" placeholder="Ссылка 2">
                        <div class="modal-actions">
                            <button type="submit" class="submit-btn">Сохранить</button>
                            <button type="button" @click="showAddModal = false" class="cancel-btn">Отмена</button>
                        </div>
                    </form>
                </div>
            </div>
        </teleport>

        <!-- Модальное окно редактирования контента -->
        <teleport to="body">
            <div v-if="editingContent" class="modal">
                <div class="modal-content">
                    <h2>Редактировать блок контента</h2>
                    <form @submit.prevent="updateContent" class="content-form">
                        <input v-model="editingContent.block" required placeholder="Блок">
                        <input v-model="editingContent.title" placeholder="Заголовок">
                        <input v-model="editingContent.subtitle" placeholder="Подзаголовок">
                        <textarea v-model="editingContent.text" placeholder="Текст"></textarea>
                        <input v-model="editingContent.subtext" placeholder="Подтекст">
                        <input v-model="editingContent.link" placeholder="Ссылка 1">
                        <input v-model="editingContent.link2" placeholder="Ссылка 2">
                        <div class="modal-actions">
                            <button type="submit" class="submit-btn">Сохранить</button>
                            <button type="button" @click="editingContent = null" class="cancel-btn">Отмена</button>
                        </div>
                    </form>
                </div>
            </div>
        </teleport>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from '~/composables/useAuth';

const API_URL = process.env.API_URL || 'http://localhost:3000/api';
const contents = ref([]);
const showAddModal = ref(false);
const editingContent = ref(null);
const { authService } = useAuth();

const newContent = ref({
    block: '',
    title: '',
    subtitle: '',
    text: '',
    subtext: '',
    link: '',
    link2: ''
});

const fetchContents = async () => {
    try {
        const response = await authService.makeAuthRequest(`${API_URL}/content`);
        contents.value = await response.json();
    } catch (error) {
        console.error('Error fetching contents:', error);
    }
};

const addContent = async () => {
    try {
        const response = await authService.makeAuthRequest(`${API_URL}/content`, {
            method: 'POST',
            body: JSON.stringify(newContent.value)
        });
        if (response.ok) {
            await fetchContents();
            showAddModal.value = false;
            Object.keys(newContent.value).forEach(key => newContent.value[key] = '');
        }
    } catch (error) {
        console.error('Error adding content:', error);
    }
};

const editContent = (content) => {
    editingContent.value = { ...content };
};

const updateContent = async () => {
    try {
        const response = await authService.makeAuthRequest(
            `${API_URL}/content/${editingContent.value.id}`,
            {
                method: 'PATCH',
                body: JSON.stringify(editingContent.value)
            }
        );
        
        if (response.ok) {
            await fetchContents();
            // При успешном обновлении очищаем localStorage
            if (editingContent.value.block === "Преимущества") {
                localStorage.removeItem('lastPreims');
            }
            editingContent.value = null;
        }
    } catch (error) {
        console.error('Error updating content:', error);
    }
};

const deleteContent = async (id) => {
    if (confirm('Вы уверены, что хотите удалить этот блок контента?')) {
        try {
            const response = await authService.makeAuthRequest(
                `${API_URL}/content/${id}`,
                { method: 'DELETE' }
            );
            if (response.ok) {
                contents.value = contents.value.filter(content => content.id !== id);
            }
        } catch (error) {
            console.error('Error deleting content:', error);
        }
    }
};

onMounted(fetchContents);

definePageMeta({
    layout: 'admin'
});
</script>

<style scoped>
.content-page {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
}

.content-page h1 {
    font-size: var(--text-h3);
    margin: 2rem auto;
    flex-basis: 100%;
}

.add-btn {
    flex-basis: 100%;
    width: 320px;
    background: var(--transparent-red-5);
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 1rem;
}

.content-card {
    border: 1px solid var(--transparent-red-2);
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    max-width: 640px;
    min-width: 280px;
    backdrop-filter: blur(5px);
}

.content-actions {
    display: flex;
    gap: 0.5rem;
    padding: 1rem 0;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

.modal-content {
    background: var(--grey-color);
    padding: 2rem;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
}

.content-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.content-form input,
.content-form textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.modal-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 1rem;
}

.edit-btn {
    background: var(--transparent-red-2);
}

.delete-btn {
    background: var(--transparent-red-5);
}

.submit-btn {
    background: var(--submit);
}

.cancel-btn {
    background: var(--transparent-red-2);
}

button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: white;
}
</style>