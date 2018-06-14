<template>
  <div class="display-style">
    <!-- <i class="fa fa-eye" aria-hidden="true"></i> -->
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
        wbs: "bullets"
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
    methods: {
      signalChange: function() {
        var newObj = {
          wbs: this.wbs,
          colored: this.showColored,
          progress: this.showProgress,
          totals: this.showTotals
        }
        this.$emit("change", newObj)
      }
    }
  };
</script>

<style scoped>

</style>
