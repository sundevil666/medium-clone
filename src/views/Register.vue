<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'Login'}">
              Have an account?
            </router-link>
          </p>
          <ValidationErrors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />
          <form @submit.prevent='onSubmit'>
            <fieldset class="form-group">
              <input
                v-model='username'
                class="form-control form-control-lg"
                type="text"
                placeholder="Username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model='email'
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model='password'
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" :disabled='isSubmitting'>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ValidationErrors from '@/components/ValidationErrors'
import { mapState } from 'vuex'

export default {
  name: 'Register.vue',
  components: {
    ValidationErrors
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapState ({
      isSubmitting: state => state.auth.isSubmitting,
      validationErrors: state => state.auth.validationErrors,
    })
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('auth/register', {email: this.email, username: this.username, password: this.password})
        .then(() => this.$router.push({name: 'GlobalFeed'}))
    },
  },
}
</script>

<style lang='stylus'>

</style>
