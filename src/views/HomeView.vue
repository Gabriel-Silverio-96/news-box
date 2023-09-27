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

    <div class="container-cards">
      <h3>Last News</h3>
      <div class="cards">
        <CardNew
          v-for="article in articles"
          :key="article.title"
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
import axios from '../service/axios'
import CardNew from '../components/CardNew.vue'
import CustomButton from '../components/CustomButton.vue'
import TextField from '../components/TextField.vue'
import { onMounted, ref } from 'vue'

const query = ref('')
const isLoadingData = ref(true)
const articles = ref([])

const fetchGetArticlesTopHeadlines = async () => {
  try {
    const params = { params: { category: 'general', max: 3 } }
    const { data } = await axios.get('top-headlines', params)

    articles.value = data.articles
  } catch (error) {
    console.error(error)
  } finally {
    isLoadingData.value = false
  }
}
onMounted(fetchGetArticlesTopHeadlines)
</script>

<style scoped>
.container-cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 5rem;
}

.cards {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}
.search {
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
</style>
