<template>
  <div class="display-style">
    <div class="radio">
      <label>
        <input type="radio" value="bullets" v-model="options.wbs">
        Bullets
      </label>
    </div>
    <div class="radio">
      <label>
        <input type="radio" value="numbered" v-model="options.wbs">
        Numbered
      </label>
    </div>
    <div class="checkbox">
      <label>
        <input type="checkbox" value="true" v-model="options.progress">
        Show progress
      </label>
    </div>
    <div class="checkbox">
      <label>
        <input type="checkbox" value="true" v-model="options.totals">
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
        options: {
          // wbs - "bullets" or "numbered"
          // progress - boolean
          // totals - boolean
          wbs: "bullets",
          progress: true,
          totals: true
        }
      }
    },
    watch: {
      showmode: function() {
        this.options = _.merge({}, this.options, this.$props.styleoptions)
      },
      options: function() {
        var newObj = _.merge({}, this.options)
        // options just changed. Emit an event.
        this.$emit("change", newObj)
      }
    }
  };
</script>

<style scoped>

</style>
