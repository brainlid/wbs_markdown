<template>
  <div class="detail-level">
    <div class="btn-group" role="group" aria-label="Level of detail selection">
      <button v-for="level in maxlevel" type="button"
          class="btn btn-default"
          v-bind:class="{ active: level == activeLevel }"
          @click.stop="levelSelected(level)">
        {{ level }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['maxlevel', 'selectedlevel'],
    data: function() {
      return {
        activeLevel: this.$props.selectedlevel
      }
    },
    watch: {
      selectedlevel: function() {
        this.activeLevel = this.$props.selectedlevel
      }
    },
    methods: {
      levelSelected: function(newLevel) {
        this.activeLevel = newLevel
        this.$emit("change", newLevel)
      }
    }
  };
</script>

<style scoped>

</style>
