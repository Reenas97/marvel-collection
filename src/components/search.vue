<script setup>
    import { ref, defineEmits, watch } from 'vue'
    const searched = ref('')

    const emit = defineEmits(['searching-item'])

    watch(searched, (newValue) => {
      if (!newValue.trim()) {
        emit('searching-item', { type: 'reset', searching: '' })
      }
    })

    function searching(event){
        emit('searching-item', {type:'search',searching:searched.value})
    }
</script>

<template>
    <div class="input-group">
        <input 
            v-model="searched" 
            @keyup.enter="searching" 
            type="text" 
            class="form-control bg--dark" 
            placeholder="Search" 
            aria-label="Search" 
            aria-describedby="search"
        >
        <button class="btn btn--red" type="submit" id="search" @click="searching">
            <span class="material-symbols-outlined d-block m-auto">
                search
            </span>
        </button>
    </div>
</template>

<style scoped>
    .input-group{
        display: flex;
        margin-bottom: 20px;
        width: 40%;
        margin-left: auto;
    }
    input{
        border: none;
        padding: 5px 10px;
        color: #fff;
        font-size: 16px;
        width: 90%;
    }
    input:focus{
        box-shadow: none;
    }
    input::placeholder{
        color: white;
    }
    button{
        border: none;
        width: 10%;
        cursor: pointer;
    }
    @media(max-width: 1175px){
        .input-group{
            width: 50%;
        }
        input{
            width: 85%;
        }
        button{
            width: 15%;
        }
    }
    @media(max-width: 768px){
        .input-group{
            width: 100%;
        }
    }
</style>