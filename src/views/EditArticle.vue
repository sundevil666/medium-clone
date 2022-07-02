<template>
  <div>
    <Loading v-if='isLoading' />
    <ArticleForm
      v-if="initialValue"
      :initial-values="initialValue"
      :validation-errors="validationErrors"
      :is-submitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArticleForm from '@/components/ArticleForm'
import Loading from '@/components/Loading'

export default {
  name: 'EditArticle',
  components: {
    ArticleForm,
    Loading,
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.editArticle.isSubmitting,
      validationErrors: state => state.editArticle.validationErrors,
      isLoading: state => state.editArticle.isLoading,
      article: state => state.editArticle.article,
    }),
    initialValue() {
      if(!this.article) {
        return null
      }
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList,
      }
    }
  },
  mounted () {
    this.$store.dispatch('editArticle/getArticle', {slug: this.$route.params.slug})
  },
  methods: {
    onSubmit(articleInput) {
      const slug = this.$route.params.slug

      this.$store.dispatch('editArticle/updateArticle', {slug, articleInput })
        .then(article => {
          this.$router.push({name: 'Articles', params: {slug: article.slug}})
        })
    }
  }
}
</script>
