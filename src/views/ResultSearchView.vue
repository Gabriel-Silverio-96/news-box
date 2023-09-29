<template>
  <div class="container-result-search">
    <div class="search">
      <TextField
        id="query"
        type="text"
        v-model="query"
        :value="query"
        placeholder="Ex: Technology Trends"
      />

      <CustomButton> Search </CustomButton>
    </div>

    <div class="result-search">
      <div class="cards">
        <CardArticle
          url="https://www.reuters.com/business/autos-transportation/strikes-could-idle-more-detroit-three-auto-plants-friday-2023-09-29/"
          label="Sources"
          title="Exclusive: UAW to expand strike on Detroit 3 US automakers - sources"
          description="The United Auto Workers are set to expand their strike of Detroit Three factories and walk off the job at one additional assembly plant at General Motors , Ford and Stellantis , three sources familiar with the matter said Friday."
          image="https://www.reuters.com/resizer/i1_A4w5RxRC114M8G362-13dwZs=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/24KLIAKVHFKMNF5EIFRNRM5RLA.jpg"
          publishedAt="2023-09-29T14:08:00Z"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import CustomButton from '../components/CustomButton.vue'
import TextField from '../components/TextField.vue'
import CardArticle from '../components/CardArticle.vue'

const route = useRoute()
const query = ref(route.query.query ?? '')
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
