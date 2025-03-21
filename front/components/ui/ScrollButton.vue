<template>
    <button @click="scrollDown" class="scroll-button">
        <span class="arrow"></span>
    </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const currentScrollPosition = ref(0);

const scrollDown = () => {
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const startPosition = window.scrollY;
    const targetPosition = Math.min(startPosition + viewportHeight, documentHeight - viewportHeight);
    
    const duration = 1000; // длительность анимации в миллисекундах
    const startTime = performance.now();

    function animation(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // функция плавности
        const easeInOutCubic = t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        
        const currentPosition = startPosition + (targetPosition - startPosition) * easeInOutCubic(progress);
        
        window.scrollTo(0, currentPosition);

        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
};

const handleScroll = () => {
    currentScrollPosition.value = window.scrollY;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.scroll-button {
    position: fixed;
    bottom: 2rem;
    left: 5%;
    transform: translateX(-50%);
    background: none;
    border: none;
    cursor: pointer;
    opacity: .3;
    transition: opacity 0.3s ease;
}
.scroll-button:hover{
    opacity: 1;
}
.arrow {
    display: block;
    width: 20px;
    height: 20px;
    border-right: 2px solid var(--red-color);
    border-bottom: 2px solid var(--red-color);
    transform: rotate(45deg);
    animation: bounce 5s infinite;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: rotate(45deg) translateY(0);
    }
    40% {
        transform: rotate(45deg) translateY(-10px);
    }
    60% {
        transform: rotate(45deg) translateY(-5px);
    }
}
</style>
