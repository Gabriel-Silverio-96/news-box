<template>
  <div class="badge">{{ label }}</div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.badge {
  background-color: var(--color-common-black);
  color: var(--color-common-white);
  font-size: 0.75rem;
  padding: 0.4rem 0.8rem;
  border-radius: 2rem;
  width: fit-content;
}
</style>
