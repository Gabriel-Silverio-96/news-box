<template>
  <div class="container-card">
    <div class="card-image">
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
</template>

<script setup>
defineProps({
  image: String,
  title: String,
  description: String,
  publishedAt: String
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
  > img {
    width: 210px;
    height: 130px;
    border-radius: 1rem;
  }
}
</style>
