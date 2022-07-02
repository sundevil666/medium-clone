<template>
  <div>
    <Loading v-if="isLoading" />
    <ErrorMessages v-if="error" />

    <div v-if="feed">
      <div class="article-preview" v-for="(article, index) in feed.articles" :key='index'>
        <div class='article-meta'>
          <router-link :to="{name: 'UserProfile', params: {slug: article.author.username}}">
            <img :src="article.author.image" :alt="article.author.username">
          </router-link>
          <div class='info'>
            <router-link
              :to="{name: 'UserProfile', params: {slug: article.author.username}}"
              class="author"
            >
              {{ article.author.username }}
            </router-link>
            <span class='date'>{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">
            <AddToFavorites
              :is-faforited="article.favorited"
              :article-slug="article.slug"
              :favorites-count="article.favoritesCount"
            />
          </div>
        </div>
        <router-link
          :to="{name: 'Articles', params: {slug: article.slug}}"
          class="preview-link"
        >
          <h4>{{ article.title }}</h4>
          <p>{{ article.description}}</p>
          <span>Read more...</span>
          <TagList :tags="article.tagList"/>
        </router-link>
      </div>
      <Pagination :total="3" :limit="limit" :curren-page="currenPage" :url="baseUrl" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import { limit } from '@/helpers/vars'
import { stringify, parseUrl } from 'query-string'
import Loading from '@/components/Loading'
import ErrorMessages from '@/components/ErrorMessages'
import TagList from '@/components/TagList'
import AddToFavorites from '@/components/AddToFavorites'

export default {
  name: 'Feed',
  components: {
    Pagination,
    Loading,
    ErrorMessages,
    TagList,
    AddToFavorites,
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      limit,
    }
  },
  computed: {
    ...mapState ({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error,
    }),
    currenPage() {
      return Number(this.$route.query.page) || 1
    },
    baseUrl() {
      return this.$route.path
    },
    offset() {
      return this.currenPage * limit - limit
    },
  },
  watch: {
    currenPage() {
      this.fetchFeed()
    },
    apiUrl() {
      this.fetchFeed()
    }
  },
  mounted () {
    this.fetchFeed()
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl)
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
      this.$store.dispatch('feed/getFeed', { apiUrl: apiUrlWithParams })
    }
  }
}
</script>
