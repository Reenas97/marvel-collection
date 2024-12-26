<script setup>
   const item = defineProps(["link", "image", "name"])
</script>

<template>
    <div class="card bg--dark text--white">
        <img :src="item.image" class="w--100 " :alt="item.name">
        <div class="card__body">
            <h2 class="card__title title">{{ item.name }}</h2>
            <a :href="item.link" class="btn btn--red">See Details</a>
        </div>
    </div>
</template>

<style scoped>
    .card{
        position: relative;
        padding: 20px;
        height: 100%;
    }
    .card:hover{
        -webkit-box-shadow: 10px 10px 10px -4px rgba(0,0,0,0.75);
        -moz-box-shadow: 10px 10px 10px -4px rgba(0,0,0,0.75);
        box-shadow: 10px 10px 10px -4px rgba(0,0,0,0.75);
        transition: all ease 0.4s;
    }
    .card img{
        height: 350px; 
        object-fit: cover;
        object-position: left;
    }
    .card__body{
        padding: 10px 0 30px 0;
    }
    .card__title{
        font-size: 24px;
    }
    .btn{
        position: absolute;
        bottom: -20px;
        left: 0;
        right: 0;
        margin: auto;
        width: 35%;
    }

    @media(max-width: 1580px){
        .card{
            padding: 15px;
        }
        .btn{
            width: 40%;
        }
    }

    @media(max-width: 1175px){
        .card__title{
            font-size: 18px;
        }
    }
    @media(max-width: 768px){
        .card img{
            height: 400px;
            object-position: top;
        }
    }
</style>