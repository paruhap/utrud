<template>
    <div>
        <TheAdminHeader/>
        <main class="admin-content">
            <slot/>
        </main>
    </div>
</template>
  
<script setup>

</script>

<style scoped>
.admin-content {
    padding: 1rem;
}
</style>