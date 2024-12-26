<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['updatePage'])

const pageNumbers = computed(() => {
  const pages = []
  let startPage = Math.max(1, props.currentPage - 2)
  let endPage = Math.min(props.totalPages, props.currentPage + 2)

  if (startPage > 1) {
    pages.push(1)
    if (startPage > 2) pages.push('...')
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  if (endPage < props.totalPages) {
    if (endPage < props.totalPages - 1) pages.push('...');
    pages.push(props.totalPages)
  }

  return pages
})

const changePage = (page) => {
  if (page < 1 || page > props.totalPages) return
  emit('updatePage', page)
  window.scrollTo(0, 0)
}
</script>

<template>
  <div class="col-12 d-flex justify-content-center mt-4">
    <ul class="pagination">
      <li class="page__item" :class="{ disabled: currentPage === 1 }">
        <button class="page__link" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
          <
        </button>
      </li>

      <li class="page__item" v-for="page in pageNumbers" :key="page" :class="{ active: currentPage === page, disabled: page === '...' }">
        <button class="page__link" v-if="page !== '...'" @click="changePage(page)">
          {{ page }}
        </button>
        <button v-else class="page__link">...</button>
      </li>

      <li class="page__item" :class="{ disabled: currentPage === totalPages }">
        <button class="page__link bg-dark" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
          >
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .pagination{
    display: flex;
    list-style: none;
    justify-content: center;
    margin-top: 40px;
  }
  .page__item{
    cursor: pointer;
  }
  .page__link{
    background: #212529;
    color: #fff;
    padding: 10px;
    cursor: pointer;
    border: 1px solid #000;
  }
  .page__item.disabled .page__link{
    cursor: not-allowed;
  }
  .page__item.disabled .page__link{
    background: #4f4f4f;
  }
  .page__item.active .page__link{
    background: #dc3545;
    border-color: #dc3545;
  }
</style>
