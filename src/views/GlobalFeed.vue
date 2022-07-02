<template>
  <div class="global-feed home-page">
    <Banner />
    <div class='container page'>
      <div class='row'>
        <div class='col-sm-9'>
          <FeedToggler />
          <Feed :api-url="apiUrl" />
        </div>
        <div class='col-sm-3'><PopularTag /></div>
      </div>
    </div>
  </div>
</template>

<script>
import Feed from '@/components/Feed'
import PopularTag from '@/components/PopularTag'
import Banner from '@/components/Banner'
import FeedToggler from '@/components/FeedToggler'

export default {
  name: 'GlobalFeed',
  components: {
    Feed,
    PopularTag,
    Banner,
    FeedToggler,
  },
  data() {
    return {
      apiUrl: '/articles'
    }
  }
}
</script>
