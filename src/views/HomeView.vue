<script setup>
  import {onMounted, ref} from 'vue'
  import Card from '../components/card.vue'
  import Spinner from '../components/spinner.vue'
  import CryptoJS from 'crypto-js'

  const ts = 1
  const publicKey = '64c6a5b8f22cf2606cd296f37c862f97';
  const privateKey = '577bd910fdeec778f75f6a8390d60f207c81b063';
  const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString(CryptoJS.enc.Hex);

  const characterIds = [1009368, 1009652, 1010972, 1009610, 1017324, 1009664, 1010744, 1009629]

  const isLoadingCharacters = ref(true);
  const isLoadingComics = ref(true)
  const famousCharacters = ref([])
  const comics = ref([])

  const fetchCharacters = () => {
    const characterPromises = characterIds.map(id => {
      const url = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
      return fetch(url).then(res => res.json())
    })

    Promise.all(characterPromises)
    .then(results => {
      famousCharacters.value = results.map(res => res.data.results[0])
    })
    .catch(error => {
      console.error('Erro ao buscar personagens:', error)
    })
    .finally(() => {
      isLoadingCharacters.value = false
    })
  }

  const fetchComics = () => {
    const url = `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=8&offset=150`

    fetch(url)
    .then(res => res.json())
    .then(res => {
      comics.value = res.data.results
    })
    .finally(() => {
      isLoadingComics.value = false
    })
  }

  onMounted(() => {
    fetchCharacters()
    fetchComics()
  });
  
</script>

<template>
  <main class="margint-default">
    <div class="container">
      <img src="../assets/images/marvel-banner.jpg" alt="Marvel Banner" class="banner w--100">
    </div>
  </main>
  <section class="margint-default marginb-default">
    <div class="container">
      <h2 class="title title--red">Characters</h2>
      <template v-if="isLoadingCharacters">
        <div class="itemsList">
          <div v-for="i in 12" :key="'loading-' + i">
            <Spinner />
          </div>
        </div>
      </template>
      
      <template v-else>
        <div class="itemsList">
          <div class="itemsList__container" v-for="character in famousCharacters" :key="character.id">
            <Card 
              :name="character.name"
              :image="character.thumbnail.path + '.' + character.thumbnail.extension"
              :link="`/character/${character.id}`"
            />
          </div>
        </div>
        <router-link to="/characters" class="btn btn--dark btn--see-all">See All Characters</router-link>
      </template>
    </div>
  </section>

  <section class="margint-default marginb-default">
    <div class="container">
        <h2 class="title title--red">Comics</h2>
        <template v-if="isLoadingComics">
          <div class="itemsList">
            <div v-for="i in 12" :key="'loading-' + i">
              <Spinner />
            </div>
          </div>
        </template>
        
        <template v-else>
          <div class="itemsList">
            <div class="itemsList__container" v-for="comic in comics" :key="comic.id">
              <Card 
                :name="comic.title"
                :image="comic.thumbnail.path + '.' + comic.thumbnail.extension"
                :link="`/comic/${comic.id}`"
              />
            </div>
          </div>
          <router-link to="/comics" class="btn btn--dark btn--see-all">See All Comics</router-link>
        </template>
      </div>
  </section>
</template>

<style scoped>
  .card{
    height: 100%;
  }
  .btn--see-all{
    display: block;
    margin: auto;
    width: 15%;
    border-radius: 5px;
    margin-top: 50px;
  }

  @media(max-width: 1175px){
    .btn--see-all{
      width: 35%;
    }
  }

  @media(max-width: 768px){
    .banner{
      height: 200px;
      object-fit: cover;
    }
  }
</style>

