<!-- components/ScrollProgress.vue -->
<template>
    <div class="scroll-progress">
      <div class="progress-bar" :style="progressStyle"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, computed } from 'vue'
  
  const scrollPercentage = ref(0)
  
  const updateScroll = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    scrollPercentage.value = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0
  }
  
  // Динамические стили для полосы прогресса
  const progressStyle = computed(() => ({
    background: `linear-gradient(to right, #f3f0ea33 ${scrollPercentage.value}%, #e6e6e6 ${scrollPercentage.value}%)`
  }))
  
  onMounted(() => {
    window.addEventListener('scroll', updateScroll)
    updateScroll() // Начальное значение
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll)
  })
  </script>
  
  <style scoped>
  .scroll-progress {
    position: fixed;
    top: 0; /* или под высоту вашего хедера, например top: 64px */
    width: 100%;
    height: 1px; /* Высота полосы */
    z-index: 1000;
    background:var(--transparent-red-9);
  }
  
  .progress-bar {
    height: 100%;
    transition: background 0.3s ease; /* Плавное изменение цвета */
  }
  </style>