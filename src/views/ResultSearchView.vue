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
      <p v-show="showResultNotFoundMessage">Result not found</p>
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
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AlertComponent from '@/components/AlertComponent.vue'
import CardArticle from '@/components/CardArticle.vue'
import CustomButton from '@/components/CustomButton.vue'
import LoadingIcon from '@/components/LoadingIcon.vue'
import TextField from '@/components/TextField.vue'
import axios from '@/service/axios'

const store = useStore()
const route = useRoute()
const router = useRouter()

const query = ref(route.query.query ?? '')
const isLoading = ref(false)
const articles = ref([])
const errorMessage = ref('')

const fetchGetSearchArticles = async () => {
  try {
    isLoading.value = true
    const params = { params: { q: query.value } }
    const { data } = await axios.get('search', params)

    articles.value = data.articles
  } catch (error) {
    if (error.response === undefined || error.response.data === null) {
      errorMessage.value = 'There was an error, please try again later'
      return
    }

    const { data } = error.response
    const [message] = data.errors

    errorMessage.value = message
    articles.value = []
  } finally {
    isLoading.value = false
  }
}

const onSubmit = () => {
  const canMakeRequest = query.value === '' || route.query.query === ''
  if (canMakeRequest) return

  fetchGetSearchArticles()
  store.commit('addQuery', query.value)
}

const showResultNotFoundMessage = computed(() => {
  return articles.value.length === 0 && !isLoading.value
})

onMounted(() => {
  const haveRedirectPage = route.query.query === undefined
  if (haveRedirectPage) {
    router.push('/')
    return
  }

  fetchGetSearchArticles()
})
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
