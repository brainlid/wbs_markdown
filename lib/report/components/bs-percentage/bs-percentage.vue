<template>
  <div class="total-progress" title="Percent Complete">
    <div class="progress">
      <div class="progress-bar" v-bind:class="classObject" v-bind:style="{ width: getPercent() + '%' }">{{ getPercent() }}%</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['total', 'done'],
    methods: {
      getPercent: function() {
        return Math.round(this.done / this.total * 100) || 0;
      }
    },
    computed: {
      classObject: function() {
        return {
          // show as "green/success" if > 95% complete
          'progress-bar-success': this.getPercent() >= 95.0,
        }
      }
    }
  };
</script>

<style scoped>

</style>
