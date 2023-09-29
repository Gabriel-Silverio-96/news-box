<template>
  <div class="loading" v-show="isLoading">
    <img src="@/assets/icons/IconLoading.svg" :width="width" :height="height" />
    {{ message }}
  </div>
</template>

<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    default: true
  },

  message: {
    type: String,
    default: 'Loading'
  },

  width: {
    type: [String, Number],
    default: '25'
  },

  height: {
    type: [String, Number],
    default: '25'
  }
})
</script>

<style scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  > img {
    animation: rotate 1s linear infinite;
  }
}
</style>
