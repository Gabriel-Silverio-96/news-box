<template>
  <div>
    <label :for="id">{{ label }}</label>
    <input :id="id" v-model="modelValue" :placeholder="placeholder" @input="onInput" />
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const { label, id, placeholder, value } = defineProps({
  label: String,
  id: [String, Number],
  placeholder: String,
  value: String
})

const modelValue = ref(value)

const emit = defineEmits(['update:modelValue'])
const onInput = (event) => emit('update:modelValue', event.target.value)
</script>

<style scoped>
input {
  padding: 0.5rem 1rem;
  border-radius: 3rem;
  width: auto;
  border: 1.4px solid var(--color-gray-200);
  outline: none;

  &:focus {
    border-color: var(--color-primary-base);
  }
}
</style>
