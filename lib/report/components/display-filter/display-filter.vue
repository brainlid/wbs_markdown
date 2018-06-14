<template>
  <div class="display-filter">
    <div class="radio">
      <label>
        <input type="radio" value="new-tracking" v-model="showMode">
        New Work
      </label>
    </div>
    <div class="radio">
      <label>
        <input type="radio" value="existing-only" v-model="showMode">
        Existing Structure Only
      </label>
    </div>
    <div class="radio">
      <label>
        <input type="radio" value="show-all" v-model="showMode">
        All
      </label>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['showmode'],
      data: function() {
      return {
        showMode: "new-tracking"
      }
    },
    watch: {
      showmode: function() {
        this.showMode = this.$props.showmode
      },
      showMode: function() {
        // showMode just changed. Emit an event.
        this.$emit("change", this.showMode)
      }
    }
  };
</script>

<style scoped>

</style>
