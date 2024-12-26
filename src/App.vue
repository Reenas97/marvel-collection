<script setup>
import { ref , provide} from 'vue'

import Header from './components/header.vue'
import Footer from './components/footer.vue'

const searched = ref('');
provide('searched', searched);

</script>

<template>
  <Header></Header>
    <div class="main">
      <router-view />
    </div>
  <Footer></Footer>
</template>
