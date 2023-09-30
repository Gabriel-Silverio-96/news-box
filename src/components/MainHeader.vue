<template>
  <header>
    <button @click="onClickMenu">
      <img src="@/assets/icons/IconMenu.svg" />
    </button>
  </header>
  <aside v-show="isOpenAside">
    <h3>Terms searched</h3>

    <div v-show="!state.querys.length">
      <p>no terms were searched</p>
    </div>

    <ul>
      <li v-for="query in state.querys" :key="query">
        {{ query }}
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const { state } = useStore()

const isOpenAside = ref(false)

const toogleOpenAside = () => (isOpenAside.value = !isOpenAside.value)

const onClickMenu = () => toogleOpenAside()
</script>

<style scoped>
header {
  padding: 1rem;
  position: fixed;
  top: 0;
  right: 0;
}

aside {
  background-color: var(--color-gray-100);
  width: 20rem;
  padding: 1rem;
  position: fixed;
  z-index: 1;
  right: 0;
  top: 3rem;
  border-radius: 1rem 0 0 1rem;
}
</style>
