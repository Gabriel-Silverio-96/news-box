<template>
  <button @click="onClick">
    <slot></slot>
  </button>
</template>

<script setup>
const emit = defineEmits(['click'])

const onClick = (event) => emit('click', event)
</script>

<style scoped>
button {
  background-color: var(--color-primary-base);
  color: var(--color-gray-100);
  border: 1px solid var(--color-primary-base);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  border-radius: 3rem;
  min-width: 6rem;

  &:hover {
    background-color: transparent;
    color: var(--color-primary-base);
  }
}
</style>
