<template>
  <a :href="url" target="_blank" rel="noopener noreferrer">
    <div class="container-card">
      <div class="card-image">
        <SkeletonComponent :show="isLoadingImage" />

        <div v-show="!isLoadingImage">
          <IndicatorBadge :label="label" />
          <img :src="image" @load="onImageLoad" :alt="title" />
        </div>
      </div>
      <div class="card-content">
        <h3 :title="title">{{ title }}</h3>

        <p :title="description">
          {{ description }}
        </p>

        <span>Published: {{ publishedAt }}</span>
      </div>
    </div>
  </a>
</template>

<script setup>
import { ref } from 'vue'
import IndicatorBadge from './IndicatorBadge.vue'
import SkeletonComponent from './SkeletonComponent.vue'

defineProps({
  url: String,
  image: String,
  title: String,
  description: String,
  publishedAt: String,
  label: String
})

const isLoadingImage = ref(true)

const onImageLoad = () => {
  isLoadingImage.value = false
}
</script>

<style scoped>
.container-card {
  width: 13rem;
}

.card-content {
  > p,
  span {
    color: var(--color-gray-200);
    margin-top: 1rem;
    display: block;
  }

  > h3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-width: 13rem;
  }

  > p {
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-width: 13rem;
  }
}
.card-image {
  .badge {
    position: absolute;
    margin-left: 0.5rem;
    margin-top: 0.5rem;
  }

  > div {
    position: relative;

    > img {
      width: 210px;
      height: 130px;
      border-radius: 1rem;
    }
  }
}
</style>
