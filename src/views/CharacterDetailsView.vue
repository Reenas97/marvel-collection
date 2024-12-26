<script setup>
    import { onMounted, ref, toRaw } from 'vue';
    import { useRoute } from 'vue-router';
    import Spinner from '../components/spinner.vue';
    import Card from '../components/card.vue';
    
    const route = useRoute()
    const character = ref(null)
    const comics = ref([])
    const orginalComicsLength = ref([])
    const isLoading = ref(true)
    const series = ref([])

    import CryptoJS from 'crypto-js'

    const ts = 1
    const publicKey = '64c6a5b8f22cf2606cd296f37c862f97'
    const privateKey = '577bd910fdeec778f75f6a8390d60f207c81b063'

    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString(CryptoJS.enc.Hex)

   

    onMounted(() => {
        loadCharacter(4)
    })

    const loadCharacter = ((qty)=>{
        const characterId = route.params.id
        const characterUrl = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`

        fetch(characterUrl)
            .then(res => res.json())
            .then(res => {
              character.value = res.data.results[0]
              orginalComicsLength.value = character.value.comics.items.length
              comics.value = character.value.comics.items.slice(0, qty)
              series.value = character.value.series.items
              console.log(series)
        })
        .finally(async () => {
            await fetchComicDetails()
            isLoading.value = false
        });
    })

    const seeAllComics = (()=>{
        const length = toRaw(orginalComicsLength.value)
        loadCharacter(length)
    })

    const fetchComicDetails = (async () => {
        const comicList = toRaw(comics.value)
        for (const comic of comicList) {
            const url = `${comic.resourceURI}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
            await fetch(url)
                .then(res => res.json())
                .then(res => {
                    comic.details = res.data.results[0]
                })
            
            
        }
    })

    
</script>

<template>
    <template v-if="isLoading">
        <Spinner />
    </template>

    <template v-else>
        <main v-if="character" class="margint-default marginb-default">
            <div class="container">
                <router-link class="btn btn--dark btn--back" to="/characters">Characters List</router-link>
                <div class="itemInfos">
                    <div class="itemInfos__card bg--dark">
                        <img :src="character.thumbnail.path + '.' + character.thumbnail.extension" :alt="character.name" class="w--100"  />
                    </div>
                    <div class="itemInfos__card bg--dark text--white">
                        <h1 class="title itemInfos__title">{{ character.name }}</h1>
                        <p v-if="character.description">{{ character.description }}</p>
                        <p v-else>No description available yet.</p>
                        <div v-if="series.length > 0">
                            <h2 class="title itemInfos__title--secondary">Series</h2>
                            <div class="itemInfos__list">
                                <ul>
                                    <li v-for="serie in series.slice(0, Math.ceil(series.length / 2))" :key="serie.name">
                                        {{ serie.name }}
                                    </li>
                                </ul>
                                <ul>
                                    <li v-for="serie in series.slice(Math.ceil(series.length / 2))" :key="serie.name">
                                        {{ serie.name }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <section v-if="comics.length > 0" class="marginb-default">
            <div class="container">
                <h2 class="title title--red">Related Comics</h2>
                <div class="itemsList">
                    <div class="itemsList__container" v-for="comic in comics" :key="comic.name">
                        <div v-if="comic.details">
                            <Card 
                                :name="comic.name"
                                :image="comic.details.thumbnail.path + '.' + comic.details.thumbnail.extension"
                                :link= "`/comic/${comic.details.id}`"
                            />
                        </div>
                    </div>
                </div>
                <button @click="seeAllComics" class="btn btn--dark btn--see-all" v-if="orginalComicsLength > comics.length">See All Comics</button>
            </div>
        </section>
    </template>
</template>

<style scoped>
    .btn--back{
        margin-bottom: 20px;
        display: inline-block;
        border-radius: 8px;
    }
    .btn--see-all{
        border-radius: 8px;
        margin: auto;
        margin-top: 50px;
        display: block;
    }
</style>
