<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <router-link :to="{name: 'UserProfile', params: {slug: article.author.username}}">
            <img :src="article.author.image" :alt="article.author.username">
          </router-link>
          <div class="info">
            <router-link :to="{name: 'UserProfile', params: {slug: article.author.username}}">
              {{article.author.username}}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <span v-if="isAuthor">
            <router-link :to="{name: 'EditArticles', params: {slug: article.slug}}" class="btn btn-outline-secondary btn-sm">
              <i class="ion-edit" /> Edit Article
            </router-link>
            <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
              <i class="ion-trash-a" /> Delete Article
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class='container page'>
      <Loading v-if='isLoading' />
      <ErrorMessages v-if="error" :message="error" />

      <div v-if="article" class="row article-container">
        <div class="col-sm-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <TagList :tags="article.tagList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters } from 'vuex'
import Loading from '@/components/Loading'
import ErrorMessages from '@/components/ErrorMessages'
import TagList from '@/components/TagList'

export default {
  name: 'Article',
  components: {
    Loading,
    ErrorMessages,
    TagList,
  },
  computed: {
    ...mapState({
      isLoading: state => state.article.isLoading,
      error: state => state.article.error,
      article: state => state.article.data,
    }),
    ...mapGetters({
      currentUser: 'auth/currentUser',
    }),
    isAuthor() {
      if(!this.currentUser || !this.article) {
        return false
      }
      return  this.currentUser.username === this.article.author.username
    }
  },
  mounted () {
    this.$store.dispatch('article/getArticle', {slug: this.$route.params.slug})
  },
  methods: {
    deleteArticle() {
      this.$store.dispatch('article/deleteArticle', {slug: this.$route.params.slug})
        .then(() => {
          this.$router.push({name: 'GlobalFeed'})
        })
    }
  }
}
</script>
