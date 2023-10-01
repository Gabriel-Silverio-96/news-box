<template>
  <div>
    <div class="search">
      <img src="@/assets/logo.svg" width="100" height="50" />

      <h1>
        What's the new <br />
        you're looking for?
      </h1>

      <form @submit.prevent="onSubmit">
        <TextField
          id="query"
          type="text"
          v-model="query"
          :value="query"
          placeholder="Ex: Technology Trends"
        />

        <CustomButton>Search</CustomButton>
      </form>
    </div>

    <div class="container-cards">
      <h3>Last News</h3>
      <LoadingIcon :isLoading="isLoading" />
      <AlertComponent :message="errorMessage" :show="errorMessage" severity="error" />

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
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AlertComponent from '@/components/AlertComponent.vue'
import CardArticle from '@/components/CardArticle.vue'
import CustomButton from '@/components/CustomButton.vue'
import LoadingIcon from '@/components/LoadingIcon.vue'
import TextField from '@/components/TextField.vue'
import axios from '@/service/axios'

const store = useStore()
const router = useRouter()

const query = ref('')
const isLoading = ref(true)
const articles = ref([])
const errorMessage = ref('')

const fetchGetArticlesTopHeadlines = async () => {
  try {
    const params = { params: { category: 'general', max: 3 } }
    const { data } = await axios.get('top-headlines', params)

    articles.value = data.articles
  } catch (error) {
    const { data } = error.response
    const [message] = data.errors

    errorMessage.value = message
  } finally {
    isLoading.value = false
  }
}
onMounted(fetchGetArticlesTopHeadlines)

const onSubmit = () => {
  if (query.value === '') return

  const conditionalURL = query.value === '' ? '' : `result-search?query=${query.value}`
  router.push(conditionalURL)
  store.commit('addQuery', query.value)
}
</script>

<style scoped>
.search {
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  margin-top: calc(100vh / 3.5);
  margin-bottom: 3rem;

  > form {
    width: 100%;

    > div {
      margin-bottom: 1rem;
    }
  }
}
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
</style>
