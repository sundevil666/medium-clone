<template>
  <button
    class="btn btn-group-sm"
    :class="{'btn-primary': isFavoritedOptimistic, 'btn-outline-primary': !isFavoritedOptimistic}"
    @click="handleLike"
  >
    <i class="ion-heart" />
    <span>{{ favoritesCountOptimistic }}</span>
  </button>
</template>

<script>

export default {
  name: 'AddToFavorites',
  props: {
    isFaforited: {
      type: Boolean,
      required: true,
    },
    articleSlug: {
      type: String,
      required: true,
    },
    favoritesCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isFavoritedOptimistic: this.isFaforited,
      favoritesCountOptimistic: this.favoritesCount,
    }
  },
  methods: {
    handleLike() {
      this.$store.dispatch('addToFavorite/addToFavorites', {
        slug: this.articleSlug,
        isFavorited: this.isFavoritedOptimistic
      })
      if(this.isFavoritedOptimistic) {
        this.favoritesCountOptimistic = this.favoritesCountOptimistic - 1
      } else {
        this.favoritesCountOptimistic = this.favoritesCountOptimistic + 1
      }
      this.isFavoritedOptimistic = !this.isFavoritedOptimistic
    }
  }
}
</script>

