<template>
  <div class="otziv-block">
    <h2 class="blok-title">ОТЗЫВЫ</h2>
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="30"
      :loop="false"
      :autoplay="false"
      :pagination="{ clickable: true }"
      :navigation="true"
      class="mySwiper"
    >
      <SwiperSlide v-for="review in reviews" :key="review.id">
        <div class="otziv-slide">
          <img v-if="review.link2" :src="'img/icon/' + review.link2" alt="icon">
          <div class="otziv-author">{{ review.title }}</div>
          <div class="otziv-content">{{ review.body }}</div>
          <div class="otziv-platforma">{{ review.description }}</div>
          <a :href="review.anchor" class="otziv-link" target="_blank">Перейти к источнику</a>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

const modules = [Navigation, Pagination, Autoplay]

const defaultReviews = [
  { block: "Отзывы",
    title: "Группа Ю.",
    subtitle: "",
    body: "Евгения Игоревна, позвольте выразить благодарность за оказанную качественную своевременную юридическую помощь! Желаю Вам исполнения всего задуманного и желаемого! Рекомендую обращаться за правовой защитой именно к Вам! С уважением, Валентина П.",
    description: "Отзыв на платформе Яндекс.Услуги",
    anchor: "https://uslugi.yandex.ru/profile/EvgeniyaRyabova-335776?msp=no&occupationId=%2Furisty&specId=%2Furisty%2Ftrudovye-spory",
    anchor2: "/img/icon/ya.svg" 
  },
  { block: "Отзывы",
    title: "Александр Андреевич Захарчев",
    subtitle: "",
    body: "Прекрасная профессионал своей области! Помогла решить нестандартную проблему со сложным упёртым работодателем. Специалист готов был подолгу консультировать по вопросам, доходчиво и понятно объяснял ситуацию, законодательство, правоприменительную практику и возможные ...",
    description: "Отзыв на платформе Яндекс.Услуги",
    anchor: "https://uslugi.yandex.ru/profile/EvgeniyaRyabova-335776?msp=no&occupationId=%2Furisty&specId=%2Furisty%2Ftrudovye-spory",
    anchor2: "/img/icon/ya.svg"  },
]
const reviews = ref([...defaultReviews]);
const { data: reviewsItems } = await useFetch('/api/contents');
reviews.value = reviewsItems.value.filter(item => item.block === "Отзывы").map(item => ({
  block: item.block ?? defaultReviews.block,
  title: item.title ?? defaultReviews.title,
  subtitle: item.subtitle ?? defaultReviews.subtitle,
  body: item.body ?? defaultReviews.body,
  description: item.description ?? defaultReviews.description,
  anchor: item.anchor ?? defaultReviews.anchor,
  anchor2: item.anchor2 ?? defaultReviews.anchor2,
}));

</script>

<style>
/* Глобальные стили для Swiper */
.swiper-button-prev::after,
.swiper-button-next::after {
  font-size: 20px !important;
  font-weight: bold;
  color: var(--red-color);
}

.swiper-pagination-bullet-active{
  background:var(--red-color)
}

.swiper-button-prev,
.swiper-button-next {
  width: 30px !important;
  height: 30px !important;
}
/* 720px */
@media screen and (max-width: 720px){
  .swiper-button-prev, .swiper-button-next{
    display: none;
  }
}
</style>

<style scoped>
.mySwiper {
  width: 100%;
  padding: 20px 0;
}

.otziv-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding:0 7%;
  height: 100vh;
}

.otziv-slide {
  text-align: center;
  padding: 20px;
  width: 80%;
  margin: auto;
}

.review-icon {
  width: 82px;
  margin-bottom: 2%;
}

.otziv-content {
  margin-bottom: 20px;
  font-style: italic; 
  font-size: var(--text-base);
}

.otziv-author {
  font-weight: 300;
  font-size: var(--text-h3);
  margin-bottom: 2rem;
}

.otziv-link{
  font-style: italic;
}
/* 720px */
@media screen and (max-width: 720px){
  .otziv-block {
    padding: 5%;
  }
  .mySwiper {
  height: 90%;
  padding: 20px 0;
}
  .otziv-slide{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
  }
  .otziv-slide img{
    width: 96px;
    margin: 0 auto;
  }
}
</style>
