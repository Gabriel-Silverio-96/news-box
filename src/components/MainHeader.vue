<template>
  <header>
    <button @click="onClickMenu" :aria-pressed="isOpenAside" aria-label="toogle menu">
      <img src="@/assets/icons/IconMenu.svg" aria-hidden="true" />
    </button>
  </header>
  <aside v-show="isOpenAside">
    <RouterLink to="/">Home</RouterLink>
    <h3>Terms searched</h3>

    <div v-show="!state.querys.length" data-test="message-no-queries-searched">
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

  > button {
    cursor: pointer;
  }
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

  > a {
    display: block;
    margin-bottom: 1rem;
  }
}
</style>
