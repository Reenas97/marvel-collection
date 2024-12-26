<script setup>
</script>

<template>
    <div class="loading-container">
        <div class="loading-spinner"></div>
    </div>
</template>

<style scoped>
    .loading-container{
      height: 350px; 
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .loading-spinner {
      width: 60px;
      height: 60px;
      border: 5px solid rgba(0, 0, 0, 0.1);
      border-top: 6px solid #ea2228;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: auto;
    }
    
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
</style>