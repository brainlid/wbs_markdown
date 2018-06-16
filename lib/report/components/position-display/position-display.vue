<template>
  <span class="position-display" @click="clicked">{{ displayText() }}</span>
</template>

<script>
  export default {
    props: ['position'],
    template: '#position-display-template',
    methods: {
      displayText: function() {
        var position = this.$props.position
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
      },
      clicked: function(event) {
        this.$emit("click", event)
      }
    }
  };
</script>

<style scoped>

</style>
