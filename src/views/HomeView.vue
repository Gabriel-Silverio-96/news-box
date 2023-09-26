<template>
  <div>
    <div class="search">
      <img src="@/assets/logo.svg" width="100" height="50" />

      <h1>
        What's the new <br />
        you're looking for?
      </h1>

      <TextField
        id="query"
        type="text"
        v-model="query"
        :value="query"
        placeholder="Ex: Technology Trends"
      />
      <CustomButton>Search</CustomButton>
    </div>
  </div>
</template>

<script setup>
import CustomButton from '../components/CustomButton.vue'
import TextField from '../components/TextField.vue'
import { ref } from 'vue'

const query = ref('')
</script>

<style scoped>
.search {
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
</style>
