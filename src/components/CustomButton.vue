<template>
  <button :disabled="disabled" @click="onClick" :class="{ 'button-disabled': disabled }">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  disabled: Boolean
})

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

.button-disabled {
  pointer-events: none;
  background-color: var(--color-gray-200);
  color: var(--color-common-black);
  border-color: transparent;
  opacity: 0.5;
}
</style>
