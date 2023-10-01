<template>
  <article class="container-card" data-component="card">
    <div class="card-image">
      <SkeletonComponent :show="isLoadingImage" />

      <div v-show="!isLoadingImage">
        <IndicatorBadge :label="label" />
        <img :src="image" @load="onImageLoad" :alt="title" @error="onImageError" />
      </div>
    </div>
    <div class="card-content">
      <h3 :title="title">
        <a :href="url" class="anchor" target="_blank" rel="noopener noreferrer">
          {{ title }}
        </a>
      </h3>

      <p :title="description">
        {{ description }}
      </p>

      <span>
        Published: <time :datetime="publishedAt">{{ formattedPublishedAt }}</time>
      </span>
    </div>
  </article>
</template>

<script setup>
import { computed, ref } from 'vue'
import errorImage from '@/assets/images/error-image.png'
import IndicatorBadge from '@/components/IndicatorBadge.vue'
import SkeletonComponent from '@/components/SkeletonComponent.vue'
import { formatDate } from '@/helps/format-date'

const { publishedAt, image } = defineProps({
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

const onImageError = (event) => {
  // Handle error image https://dev.to/zahidjabbar/image-binding-error-handling-in-vue-js-1pdp
  event.target.src = errorImage
}

const formattedPublishedAt = computed(() => formatDate(publishedAt))
</script>

<style scoped>
.container-card {
  width: 13rem;
  position: relative;
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
      width: 13.125rem;
      height: 8.125rem;
      border-radius: 1rem;
      object-fit: cover;
    }
  }
}

.anchor::before {
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.anchor:hover {
  color: var(--color-primary-base);
}
</style>
