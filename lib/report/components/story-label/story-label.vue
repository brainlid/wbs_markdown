<template>
  <div class="story-label">
    <span class="label-anchor">
      <span v-bind:class="classObject">{{storyName}}</span>
    </span>
  </div>
</template>

<script>
  export default {
    props: ['story'],
    computed: {
      classObject: function () {
        return {
          'label': true,
          'show-always': this.isUnlinked,
          'label-danger': this.isUnlinked,
          'label-primary': this.isLinked
        }
      },
      isUnlinked: function() {
        return _.isEmpty(this.$props.story) || this.$props.story == "null";
      },
      isLinked: function() {
        return !this.isUnlinked;
      },
      storyName: function() {
        if (this.isUnlinked) {
          return "unlinked"
        }
        else {
          return this.$props.story
        }
      }
    }
  }
</script>

<style scoped>

</style>
