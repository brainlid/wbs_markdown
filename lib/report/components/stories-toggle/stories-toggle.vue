<template>
  <div>
    <a href="#" class="story-toggle-link" @click.stop.prevent="toggleStories">
      <i class="fa fa-random"></i> Toggle story selection
    </a>
  </div>
</template>

<script>
  export default {
    methods: {
      toggleStories: function() {
        // emit the "toggle" event that the root component uses.
        this.$emit("toggle")
      }
    }
  }
</script>

<style scoped>

</style>
