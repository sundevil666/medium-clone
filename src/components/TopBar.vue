<template>
  <nav>
    <div class='navbar navbar-light'>
      <div class='container'>
        <router-link :to="{name: 'GlobalFeed'}">Logo</router-link>

        <ul class='nav navbar-nav pull-xs-right'>
          <li class='nav-item'>
            <router-link
              class='nav-link'
              :to="{name: 'GlobalFeed'}"
              active-class="active"
              exact
            >
              Home
            </router-link>
          </li>
          <template v-if='isLoggedIn'>
            <li class='nav-item'>
              <router-link class='nav-link' :to="{name: 'CreateArticle'}" active-class="active">
                <i class='ion-compose'></i> New Article
              </router-link>
            </li>
            <li class='nav-item'>
              <router-link class='nav-link' :to="{name: 'Settings'}" active-class="active">
                <i class='ion-gear-a'></i> Settings
              </router-link>
            </li>
            <li class='nav-item'>
              <router-link class='nav-link' :to="{name: 'UserProfile', params: { slug: currentUser.username }}" active-class="active">
                <img v-if="currentUser.image" :src='currentUser.image' :alt='currentUser.username'> {{ currentUser.username }}
              </router-link>
            </li>
          </template>
          <template v-if="isAnonymous">
            <li class='nav-item'><router-link class='nav-link' active-class="active" :to="{name: 'Login'}">Sign in</router-link></li>
            <li class='nav-item'><router-link class='nav-link' active-class="active" :to="{name: 'Register'}">Sign up</router-link></li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TopBar',

  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',
      isLoggedIn: 'auth/isLoggedIn',
      isAnonymous: 'auth/isAnonymous',
    }),
  }
}
</script>

<style>

</style>
