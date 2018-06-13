<template>
  <span class="position-display">{{ displayText() }}</span>
</template>

<script>
  export default {
    props: ['positions', 'id'],
    template: '#position-display-template',
    methods: {
      displayText: function() {
        var position = this.$props.positions[this.$props.id]
        // Convert a position array like [1, 1, 1, 2] into text like "1.1.1.2"
        if (Array.isArray(position)) {
          // if [1] => "1."
          if (position.length == 1) {
            return position[0] + "." // + ".0"
          }
          else {
            // has more depth [1, 1, 2] => "1.1.2"
            return position.join(".")
          }
        }
        else {
          return ""
        }
      }
    }
  };
</script>

<style scoped>

</style>
