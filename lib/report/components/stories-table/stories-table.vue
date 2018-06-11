<template>
  <div class="story-table-data">
    <a href="#" title="Toggle work item table display"
       class="toggle-table-display"
       @click.stop.prevent="toggleExpandTable">
      <i class="fa fa-table" aria-hidden="true"></i>
    </a>
    <table class="table" v-show="tableExpanded">
      <thead>
      <tr>
        <th>Date</th>
        <th>Story</th>
        <th>Work Est (h)</th>
        <th>Actual (h)</th>
        <th>Completed</th>
        <th>Confidence (%)</th>
        <th>Note</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="entry in dataset">
        <td>{{ entry.date }}</td>
        <td>{{ entry.story }}</td>
        <td>{{ entry.work }}</td>
        <td>{{ entry.actual }}</td>
        <td>{{ entry.completed }}</td>
        <td>{{ entry.confidence_pct }}</td>
        <td>{{ entry.note }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    props: ['stories', 'story_work'],
    data: function() {
      return {
        // setup in mounted()
        dataset: [],
        tableExpanded: false
      }
    },
    watch: {
      stories: function() {
        this.updateDataset()
      },
      story_work: function() {
        this.updateDataset()
      }
    },
    methods: {
      toggleExpandTable: function() {
        this.tableExpanded = !this.tableExpanded
      },
      updateDataset: function() {
        var m = new Date();
        var dateString = m.getUTCFullYear() +"-"+ (m.getUTCMonth()+1) +"-"+ m.getUTCDate();
        this.dataset = [];
        var _this = this;
        _.forEach(_this.$props.stories, function(story) {
          _.forEach(_this.$props.story_work[story], function(work) {
            _this.dataset.push({
              date: dateString,
              story: story,
              work: work.estimate.amount,
              actual: work.actual.amount,
              completed: work.done,
              confidence_pct: work.estimate.confidence / 100,
              note: work.note
            })
          })
        })
      }
    }
  };
</script>

<style scoped>

</style>
