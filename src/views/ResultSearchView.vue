<template>
  <div class="container-result-search">
    <form class="search" @submit.prevent="onSubmit">
      <TextField
        id="query"
        type="text"
        v-model="query"
        :value="query"
        placeholder="Ex: Technology Trends"
      />

      <CustomButton>Search</CustomButton>
    </form>
    <div class="result-search">
      <LoadingIcon :isLoading="isLoading" />
      <div class="cards">
        <CardArticle
          v-for="(article, index) in articles"
          :key="index"
          :url="article.url"
          :label="article.source.name"
          :title="article.title"
          :description="article.description"
          :image="article.image"
          :publishedAt="article.publishedAt"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import CustomButton from '../components/CustomButton.vue'
import TextField from '../components/TextField.vue'
import CardArticle from '../components/CardArticle.vue'
import axios from '../service/axios'
import LoadingIcon from '../components/LoadingIcon.vue'

const route = useRoute()
const query = ref(route.query.query ?? '')
const isLoading = ref(false)
const articles = ref([])

const fetchGetSearchArticles = async () => {
  if (query.value === '') return

  try {
    isLoading.value = true
    const params = { params: { q: query.value } }
    const { data } = await axios.get('search', params)

    articles.value = data.articles
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const onSubmit = () => fetchGetSearchArticles()

onMounted(fetchGetSearchArticles)
</script>

<style scoped>
.container-result-search {
  display: grid;
  grid-template-rows: 10rem auto;
  align-items: center;
  margin: auto;
  max-width: 43rem;
  width: auto;
}
.search {
  display: flex;
  align-items: center;
  max-width: 38rem;
  width: auto;
  gap: 1rem;
}

.cards {
  max-width: 43rem;
  width: auto;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  flex-grow: 1;
}
</style>
