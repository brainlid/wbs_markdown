<template>
  <span>
    <i v-if="done == false" class='fa task-indicator icon-left show-incomplete fa-square-o'></i>
    <i v-if="done == true" class='fa task-indicator icon-left show-complete fa-check-square-o'></i>
  </span>
</template>

<script>
  export default {
    props: ['done'],
  }
</script>

<style scoped>

</style>
