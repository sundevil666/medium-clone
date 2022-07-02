<template>
  <div>{{ message }}</div>
</template>

<script>

export default {
  name: 'ErrorMessages',
  props: {
    message: {
      type: String,
      default: 'Something bad happened...',
    },
  }
}
</script>
