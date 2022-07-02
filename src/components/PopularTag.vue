<template>
  <div>
    <Loading v-if="isLoading" />
    <ErrorMessages v-if="error" />

    <div v-if='popularTags' class='sidebar'>
      <p>Popular tags</p>
      <div class='tag-list'>
        <router-link
          v-for="popularTag in popularTags"
          :key="popularTag"
          :to="{name: 'Tag', params: { slug: popularTag }}"
          class="tag-default tag-pill"
        >
          {{ popularTag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loading from '@/components/Loading'
import ErrorMessages from '@/components/ErrorMessages'

export default {
  name: 'PopularTag',
  components: {
    Loading,
    ErrorMessages,
  },
  computed: {
    ...mapState({
      isLoading: state => state.popularTags.isLoading,
      error: state => state.popularTags.error,
      popularTags: state => state.popularTags.data,
    }),
  },
  mounted () {
    this.$store.dispatch('popularTags/getPopularTags')
  }
}
</script>

<style>

</style>
