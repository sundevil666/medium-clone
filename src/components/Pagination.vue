<template>
  <ul>
    <li
      v-for="page in pages"
      :key="page"
      class='page-item'
      :class="{active: currenPage === page}"
    >
      <router-link :to="{path: url, query:{page: page}}" class="page-link">{{ page }}</router-link>
    </li>
  </ul>
</template>

<script>
import { range } from '@/helpers/utils'

export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    currenPage: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    }
  },
  computed: {
    pages() {
      const pagesCount = Math.ceil(this.total / this.limit)
      return range(1, pagesCount)
    }
  }
}
</script>

<style>

</style>
