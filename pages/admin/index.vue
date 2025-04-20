<script setup lang="ts">
interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
}

interface Content {
  id: number;
  block: string;
  title: string;
  created_at: string;
}

interface DashboardData {
  newLeads: Lead[];
  recentContents: Content[];
}

definePageMeta({
  middleware: ['authenticated'],
  layout:'admin'
})

const { data: dashboard } = await useFetch<DashboardData>('/api/admin/dashboard')
</script>

<template>
  <div class="admin-dashboard">
    <div class="dashboard-section">
      <h3>Новые заявки</h3>
      <div v-if="dashboard?.newLeads?.length" class="leads-list">
        <div v-for="lead in dashboard.newLeads" :key="lead.id" class="lead-card">
          <h4>{{ lead.name }}</h4>
          <p>Email: {{ lead.email }}</p>
          <p>Телефон: {{ lead.phone }}</p>
          <p class="date">{{ new Date(lead.created_at).toLocaleString() }}</p>
        </div>
      </div>
      <p v-else>Новых заявок нет</p>
    </div>

    <div class="dashboard-section">
      <h3>Последние изменения контента</h3>
      <div v-if="dashboard?.recentContents?.length" class="contents-list">
        <div v-for="content in dashboard.recentContents" :key="content.id" class="content-card">
          <h4>{{ content.block }}</h4>
          <p>{{ content.title }}</p>
          <p class="date">{{ new Date(content.created_at).toLocaleString() }}</p>
        </div>
      </div>
      <p v-else>Изменений контента нет</p>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
h3{
  font-size: var(--text-h3);
  padding: 2rem;
  text-align: center;
}
.dashboard-section {
  background: var(--transparent-gray-2);
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.leads-list, .contents-list{
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
}

.lead-card, .content-card {
  padding: 1rem;
  margin: 0.5rem 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px var(--transparent-gray-5);
  min-height: fit-content;
  min-width: 30%;
}

.date {
  font-size: 0.8em;
  color: gray;
}

h3 {
  margin-bottom: 1rem;
  color: var(--red-color);
}

@media (max-width: 768px) {
  .admin-dashboard {
    grid-template-columns: 1fr;
  }
}
</style>