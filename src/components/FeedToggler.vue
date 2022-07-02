<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item" v-if="isLoggedIn">
        <router-link
          :to="{name: 'YourFeed'}"
          class="nav-link"
          :class="{active: routeName === 'YourFeed'}"
        >
          Your feed
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{name: 'GlobalFeed'}"
          class="nav-link"
          :class="{active: routeName === 'GlobalFeed'}"
        >
          Global feed
        </router-link>
      </li>
      <li class="nav-item" v-if="tagName">
        <router-link
          :to="{name: 'Tag'}"
          class="nav-link"
          :class="{active: routeName === 'Tag'}"
        >
          <i class="ion-pound" />
          {{ tagName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'FeedToggler',
  props: {
    tagName: {
      type: String,
      default: '',
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
    }),
    routeName() {
      return this.$route.name
    }
  }
}
</script>
