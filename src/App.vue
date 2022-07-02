<template>
  <div id="app">
    <TopBar />
    <router-view/>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'

export default {
  name: "App",
  components: {
    TopBar
  },
  mounted () {
    this.$store.dispatch('auth/getCurrentUser')
  },
}
</script>

<style lang="stylus">

</style>
