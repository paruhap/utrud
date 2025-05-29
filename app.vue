<template>
    <div class="app-wrap">
      <img class="fon-img" :style="{ filter: 'blur(' + blur + 'px)' }" src="~/assets/img/rabkol.png" alt="">
      <video class="background-video" :style="{ filter: 'blur(' + blur + 'px)' }" src="~/assets/img/fon.mp4" autoplay muted></video>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const blur = ref(0);

const updateBlur = () => {
  const scrollPercentage = Math.min(window.scrollY / (window.innerHeight / 2), 1);
  blur.value = scrollPercentage * 4;
};

const bodyBlurBacckground = () =>{
  document.body.style.backdropFilter=`blur(${blur}px)`
}

onMounted(() => {
  window.addEventListener('scroll', updateBlur);
  updateBlur(); // Set initial blur in case the page loads with some scroll
  bodyBlurBacckground ()
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateBlur);
});
</script>

<style>

.fon-img{
    position: fixed;
    bottom: -50px;
    right: 0;
    width: auto;
    height: 100%;
    object-fit: cover;
    z-index: -9;
    opacity: .7;
}
.background-video {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -10;
    opacity: .2;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.05s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(3px);
}
</style>