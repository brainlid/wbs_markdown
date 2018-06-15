<template>
  <div class="display-style">
    <div class="btn-group">
      <button type="button" class="btn btn-default button-style-toggle dropdown-toggle"
        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
        v-on:click="toggleActivated">
        <i class="primary fa fa-paint-brush" aria-hidden="true"></i>
        <span class="direction-indicator">
          <i v-show="!activated" class="fa fa-caret-down"></i>
          <i v-show="activated" class="fa fa-caret-up"></i>
        </span>
      </button>
    </div>
    <span class="current-settings-text">{{ settingsText() }}</span>

    <div class="options" v-show="activated">
      <div class="radio">
        <label>
          <input type="radio" value="bullets" v-model="wbs">
          Bullets
        </label>
      </div>
      <div class="radio">
        <label>
          <input type="radio" value="numbered" v-model="wbs">
          Numbered
        </label>
      </div>
      <div class="checkbox">
        <label>
          <input type="checkbox" :true-value="true" :false-value="false" v-model="showColored">
          Show colored deliverable checks
        </label>
      </div>
      <div class="checkbox">
        <label>
          <input type="checkbox" :true-value="true" :false-value="false" v-model="showProgress">
          Show progress
        </label>
      </div>
      <div class="checkbox">
        <label>
          <input type="checkbox" :true-value="true" :false-value="false" v-model="showTotals">
          Show totals
        </label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['styleoptions'],
      data: function() {
      return {
        showColored: true,
        showProgress: true,
        showTotals: true,
        // wbs - "bullets" or "numbered"
        wbs: "bullets",
        // button activated status
        activated: false
      }
    },
    watch: {
      styleoptions: function() {
        this.showColored = _.get(this.$props.styleoptions, "colored", true)
        this.showProgress = _.get(this.$props.styleoptions, "progress", true)
        this.showTotals = _.get(this.$props.styleoptions, "totals", true)
        this.wbs = _.get(this.$props.styleoptions, "wbs", "bullets")
      },
      wbs: function() { this.signalChange() },
      showColored: function() { this.signalChange() },
      showProgress: function() { this.signalChange() },
      showTotals: function() { this.signalChange() }
    },
    computed: {
      classObject: function () {
        return {
          'activated': this.activated
        }
      }
    },
    methods: {
      signalChange: function() {
        var newObj = {
          wbs: this.wbs,
          colored: this.showColored,
          progress: this.showProgress,
          totals: this.showTotals
        }
        this.$emit("change", newObj)
      },
      settingsText: function() {
        var settings = []
        settings.push(this.wbs)
        // Colored setting
        if (this.showColored) {
          settings.push("colored checks")
        }
        else {
          settings.push("plain checks")
        }
        // Progress setting
        if (this.showProgress) {
          settings.push("with progress")
        }
        // Totals setting
        if (this.showTotals) {
          settings.push("with totals")
        }
        return settings.join(", ")
      },
      toggleActivated: function() {
        this.activated = !this.activated
      }
    }
  };
</script>

<style scoped>

</style>
