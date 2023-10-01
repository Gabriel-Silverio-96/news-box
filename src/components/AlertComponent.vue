<template>
  <div :class="['alert', severityClass]" v-show="show">
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    validator: (value) => ['error', 'warning', 'info', 'success'].includes(value),
    required: true
  },
  show: {
    type: [String, Boolean]
  }
})

const severityClass = `alert-${props.severity}`
</script>

<style scoped>
.alert {
  width: auto;
  max-width: 30rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: var(--color-common-white);
}
.alert-error {
  background-color: var(--color-error-base);
}

.alert-warning {
  background-color: var(--color-warning-base);
}

.alert-info {
  background-color: var(--color-info-base);
}

.alert-success {
  background-color: var(--color-success-base);
}
</style>
