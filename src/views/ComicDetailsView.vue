<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import Spinner from '../components/spinner.vue'
    import CryptoJS from 'crypto-js'

    const route = useRoute()
    const comic = ref(null)
    const isLoading = ref(true)

    const ts = 1
    const publicKey = '64c6a5b8f22cf2606cd296f37c862f97'
    const privateKey = '577bd910fdeec778f75f6a8390d60f207c81b063'
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString(CryptoJS.enc.Hex)

    const formatDate = (date) => {
        const data = new Date(date)
        const dia = String(data.getUTCDate()).padStart(2, '0')
        const mes = String(data.getUTCMonth() + 1).padStart(2, '0')
        const ano = data.getUTCFullYear()
        return `${mes}-${dia}-${ano}`
    };

    onMounted(() => {
        const comicId = route.params.id
        const url = `https://gateway.marvel.com/v1/public/comics/${comicId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`

        fetch(url)
            .then(res => res.json())
            .then(res => {
              comic.value = res.data.results[0]
              if (comic.value && comic.value.dates) {
                comic.value.onSaleDate = formatDate(comic.value.dates[0].date)
              }
            })
            .finally(() => {
              isLoading.value = false
        })
    })


</script>

<template>
    <template v-if="isLoading">
        <Spinner />
    </template>
    <template v-else>
        <main class="margint-default marginb-default">
            <div class="container">
                <router-link class="btn btn-dark" to="/comics">Comics List</router-link>
                    <div class="itemInfos">
                        <div class="itemInfos__card bg--dark">
                        <img :src="comic.thumbnail.path + '.' + comic.thumbnail.extension" :alt="comic.title" class="w--100"  />
                    </div>
                    <div class="itemInfos__card bg--dark text--white">
                        <h1 class="title itemInfos__title">{{ comic.title }}</h1>
                        <p><strong>Published:</strong> {{ comic.onSaleDate }}</p>
                        <p><strong>Page Count:</strong> {{ comic.pageCount }}</p>
                        <p v-if="comic.description">{{ comic.description }}</p>
                        <p v-else>No description available yet.</p>
                    </div>
                </div>
            </div>
        </main>
    </template>
</template>

<style scoped>
    p{
        margin-top: 10px;
    }
</style>
