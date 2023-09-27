<template>
  <a :href="url" target="_blank" rel="noopener noreferrer">
    <div class="container-card">
      <div class="card-image">
        <IndicatorBadge :label="label" />
        <img :src="image" />
      </div>
      <div class="card-content">
        <h3>{{ title }}</h3>

        <p>
          {{ description }}
        </p>

        <span>Published: {{ publishedAt }}</span>
      </div>
    </div>
  </a>
</template>

<script setup>
import IndicatorBadge from './IndicatorBadge.vue'

defineProps({
  url: String,
  image: String,
  title: String,
  description: String,
  publishedAt: String,
  label: String
})
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
}
.card-image {
  position: relative;

  .badge {
    position: absolute;
    margin-left: 0.5rem;
    margin-top: 0.5rem;
  }

  > img {
    width: 210px;
    height: 130px;
    border-radius: 1rem;
  }
}
</style>
