<template>
  <div>
    <ArticleForm
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

export default {
  name: 'CreateArticle',
  components: {
    ArticleForm,
  },
  data() {
    return {
      initialValue: {
        title: '',
        description: '',
        body: '',
        tagList: '',
      },
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.createArticle.isSubmitting,
      validationErrors: state => state.createArticle.validationErrors,
    }),
  },
  methods: {
    onSubmit(articleInput) {
      this.$store.dispatch('createArticle/createArticle', { articleInput })
        .then(article => {
          this.$router.push({name: 'Articles', params: {slug: article.slug}})
        })
    }
  }
}
</script>
