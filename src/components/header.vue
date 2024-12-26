<script setup>
    import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
    const isMenuOpen = ref(false)
    const route = useRoute()
    function openMenu(){
        isMenuOpen.value = !isMenuOpen.value
    }

    watch(route, () => {
        isMenuOpen.value = false
    })

</script>

<template>
    <header  class="bg--dark">
        <nav>
            <div class="container">
                <div class="header__content">
                    <router-link class="header__logo" to="/">
                        <img src="../assets/images/marvel-logo-red.png" alt="Marvel Logo">
                    </router-link>
                    <button class="header__button" @click="openMenu">
                        <span v-if="!isMenuOpen" class="material-symbols-outlined">menu</span>
                        <span v-if="isMenuOpen" class="material-symbols-outlined">close</span>
                    </button>
                    <div class="header__links bg--dark" :class="{ 'is-open': isMenuOpen }">
                        <ul>
                            <li>
                                <router-link class="text--white" to="/" active-class="active">Home</router-link>
                            </li>
                            <li>
                                <router-link class="text--white" to="/characters" active-class="active">Characters</router-link>
                            </li>
                            <li>
                                <router-link class="text--white" to="/comics" active-class="active">Comics</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<style>
    header{
        padding: 6px 0 3px 0;
        position: relative;
    }
    .header__content{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .header__logo{
        width: 15%;
    }
    .header__logo img{
        width: 100%;
    }
    .header__button{
        display: none;
    }
    .header__links ul{
        display: flex;
        gap: 24px;
        list-style: none;
    }
    .header__links li a{
        text-decoration: none;
        font-size: 20px;
        opacity: 0.7;
    }
    .header__links li a.active{
        opacity: 1;
    }
    
    @media(max-width: 992px){
        .header__button{
            display: block;
            color: #fff;
            background: transparent;
            border: none;
        }
        .header__links{
            display: none;
            position: absolute;
            top: 100%;
            right: 0;
            width: 100%;
        }
        .header__links ul{
            flex-direction: column;
            padding: 10px 30px;
            text-align: center;
            width: 100%;
            gap: 10px;
        }
        .header__links.is-open {
          display: flex;
        }
    }

    @media(max-width: 768px){
        .header__logo{
            width: 30%;
        }
    }

</style>