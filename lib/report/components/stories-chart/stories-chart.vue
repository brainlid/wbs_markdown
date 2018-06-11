<template>
  <div style="position: relative; width:100%;" v-bind:style="{ height: getHeight() + 'px' }">
    <canvas id="stories-chart" ref="canvas"></canvas>
  </div>
</template>

<script>
  export default {
    props: ['stories', 'story_work'],
    mounted: function() {
      this.chart = new Chart(this.$refs.canvas, {
        type: 'horizontalBar',
        data: {
          labels: this.chartLabels,
          datasets: this.chartDatasets
        },
        options: this.chartOptions()
      });
    },
    data: function() {
      return {
        // setup in mounted()
        chart: null,
        chartLabels: [],
        chartDatasets: []
      }
    },
    watch: {
      stories: function() {
        this.chartLabels = this.$props.stories || []
        if (this.chart) {
          this.chart.data.labels = this.chartLabels;
          this.chart.update();
        }
        this.updateDatasets()
      },
      story_work: function() {
        this.updateDatasets()
      }
    },
    methods: {
      chartOptions: function() {
        return {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              // stacked: true
            }],
            yAxes: [{
              // stacked: true,
              ticks: {
                beginAtZero:true
              }
            }]
          }
        }
      },
      getHeight: function() {
        // 3 bars show per story. 130px for 1 bar (includes legend and padding)
        return 100 + (this.$props.stories.length * 30);
      },
      updateDatasets: function() {
        var estimatedSet = [];
        var doneSet = [];
        var actualSet = [];
        var _this = this;
        _.forEach(_this.chartLabels, function(story) {
          var storyList = _this.$props.story_work[story]
          estimatedSet.push(_.sumBy(storyList, 'estimate.amount'))
          doneSet.push(_.sumBy(_.filter(storyList, 'done'), 'estimate.amount'))
          actualSet.push(_.sumBy(storyList, 'actual.amount'))
        })
        this.chartDatasets = [
          {
            label: 'hours estimated',
            data: estimatedSet,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'hours done',
            data: doneSet,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'hours actual',
            data: actualSet,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1
          }
        ]
        if (this.chart) {
          this.chart.data.datasets = this.chartDatasets
          this.chart.update()
        }
      }
    },
    beforeDestroy () {
      if (this.chart) {
        this.chart.destroy()
      }
    }
  }
</script>

<style scoped>

</style>
