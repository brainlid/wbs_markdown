<template>
  <div class="display-filter">
    <div class="btn-group">
      <button type="button" class="btn btn-default button-style-toggle dropdown-toggle"
        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
        v-on:click="toggleActivated">
        <i class="primary fa fa-filter" aria-hidden="true"></i>
        <span class="direction-indicator">
          <i v-show="!activated" class="fa fa-caret-down"></i>
          <i v-show="activated" class="fa fa-caret-up"></i>
        </span>
      </button>
    </div>
    <span class="current-settings-text">{{ settingsText() }}</span>

    <div class="options" v-show="activated">
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
    </div>
  </div>
</template>

<script>
  export default {
    props: ['showmode'],
      data: function() {
      return {
        showMode: "new-tracking",
        // button activated status
        activated: false
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
    },
    computed: {
      classObject: function () {
        return {
          'activated': this.activated
        }
      }
    },
    methods: {
      settingsText: function() {
        switch (this.showMode) {
          case "new-tracking":
            return "New Work"
          case "existing-only":
            return "Existing Structure Only"
          case "show-all":
            return "All"
          default:
            return ""
        }
      },
      toggleActivated: function() {
        this.activated = !this.activated
      }
    }
  };
</script>

<style scoped>

</style>
