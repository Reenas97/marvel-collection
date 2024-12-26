<script setup>
  import { onMounted, ref } from 'vue'
  import Card from '../components/card.vue'
  import Spinner from '../components/spinner.vue'
  import Search from '../components/search.vue'
  import Pagination from '../components/pagination.vue'

  import CryptoJS from 'crypto-js'

  const ts = 1
  const publicKey = '64c6a5b8f22cf2606cd296f37c862f97'
  const privateKey = '577bd910fdeec778f75f6a8390d60f207c81b063'

  const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString(CryptoJS.enc.Hex)

  
  const limit = 12;
  const isLoading = ref(true)
  const characters = ref([])
  const originalCharacters = ref([])
  const currentPage = ref(1)
  const totalPages = ref(0)
  const originalTotalPages = ref(0)
  const searchQuery = ref('')

  const fetchCharacters = () => {
    const offset = (currentPage.value - 1) * limit;
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`
    fetch(url)
    .then(res => res.json())
    .then(res => {
      originalCharacters.value = res.data.results
      characters.value = res.data.results
      totalPages.value = Math.ceil(res.data.total / limit)
      originalTotalPages.value = Math.ceil(res.data.total / limit)
    })
    .finally(() => {
      isLoading.value = false
    });
  };

  const findCharacter = (char, page = 1) => {
    searchQuery.value = char;
    const offset = (page - 1) * limit
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&nameStartsWith=${char}&apikey=${publicKey}&hash=${hash}`

    fetch(url)
    .then(res => res.json())
    .then(res => {
      characters.value = res.data.results
      totalPages.value = Math.ceil(res.data.total / limit)
    })
    .finally(() => {
      isLoading.value = false
    })
  }

  onMounted(() => {
    fetchCharacters()
  })

  function searching(searched) {
    currentPage.value = 1
    if (searched.type === 'reset' || !searched.searching.length) {
      searchQuery.value = ''
      fetchCharacters()
      return
    }
  
    if (searched.type === 'search') {
      isLoading.value = true
      findCharacter(searched.searching, currentPage.value)
    }
  }

  const handlePageChange = (page) => {
    currentPage.value = page
    isLoading.value = true
    isLoading.value = true
    if (searchQuery.value) {
      findCharacter(searchQuery.value, page)
    } else {
      fetchCharacters()    
    }
  }

</script>

<template>


  <section class="margint-default marginb-default">
    <div class="container">
      <Search 
        @searching-item="searching"
      />
      <template v-if="isLoading">
        <div class="itemsList">
          <div v-for="i in 12" :key="'loading-' + i">
            <Spinner />
          </div>
        </div>
      </template>
      <template v-else>
        <div v-if="characters.length == 0" class="no-results">
          <p>No characters found for your search.</p>
        </div>
        <div class="itemsList">
          <div class="itemsList__container" v-for="character in characters" :key="character.id">
            <Card 
              :name="character.name"
              :image="character.thumbnail.path + '.' + character.thumbnail.extension"
              :link= "`/character/${character.id}`"
            />
          </div>
        </div>
        <Pagination 
          v-if="characters.length > 0"
          :currentPage="currentPage"
          :totalPages="totalPages"
          @updatePage="handlePageChange" 
        />
      </template>
    </div>
  </section>


</template>

<style scoped>
  .no-results{
    color: #dc3545;
    text-shadow: 2px 2px #000000;
    text-align: center;
    font-weight: 700;
    font-size: 28px;
    margin-top: 100px;
  }
</style>
