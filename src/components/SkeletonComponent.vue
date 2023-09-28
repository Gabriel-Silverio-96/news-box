<template>
  <div v-if="show" class="skeleton" :style="{ ...style }"></div>
</template>

<script setup>
const { show, height } = defineProps({
  height: {
    type: String,
    default: '8'
  },
  show: {
    type: Boolean,
    default: true
  }
})

const style = {
  height: `${height}rem`
}
</script>

<style scoped>
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.skeleton {
  width: 100%;
  background-color: var(--color-gray-100);
  animation: blink 1.5s infinite;
}
</style>
