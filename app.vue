<template>
    <video class="background-video" src="~/assets/img/fon.mp4" autoplay muted></video>
    <NuxtLayout>
      <NuxtPage />  
    </NuxtLayout>
</template>

<style>
.background-video {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -10;
    opacity: .15;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(3px);
}
</style>