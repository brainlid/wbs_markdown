<template>
  <span v-bind:class="classObject" title="Level of confidence in estimate">{{displayValue()}}</span>
</template>

<script>
  export default {
    props: ['value'],
    computed: {
      classObject: function() {
        return {
          'confidence-display': true,
          'text-success': this.valueBetween(90, 100),
          'text-info': this.valueBetween(75, 89),
          'text-warning': this.valueBetween(60, 74),
          'text-danger': this.valueBetween(1, 59),
          'text-muted': this.valueBetween(0, 0)
        }
      }
    },
    methods: {
      valueBetween: function(low, high) {
        return (this.$props.value >= low && this.$props.value <= high)
      },
      displayValue: function() {
        var val = this.$props.value
        if (_.isNumber(val) && val > 0) {
          return val.toString() + "%"
        }
        else {
          return "-"
        }
      }
    }
  };
</script>

<style scoped>

</style>
