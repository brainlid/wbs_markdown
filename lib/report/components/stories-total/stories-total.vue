<template>
  <div class='stories-total-display'>
    <span :title="nameTitleText()">{{ total_text }}:</span>
    <confidence-display :value="total_confidence"></confidence-display>
    <div class='work-total' :title="titleText()">
      {{ total_estimated }}
    </div>
  </div>
</template>

<script>
  export default {
    props: ['stories', 'story_work', 'group', 'story_groups'],
    data: function() {
      return {
        total_estimated_hours: null,
        total_estimated: null,
        total_text: "Total",
        total_actual: null,
        total_confidence: null,
      }
    },
    watch: {
      stories: function() {
        var workSet = []
        // if given a specific group, use that to limit the workSet
        if (this.$props.group) {
          var stories = this.$props.story_groups[this.$props.group]
          workSet = _.flatten(_.values(_.pick(this.$props.story_work, stories)))
        }
        else {
          // no group limit, take work for all active stories
          workSet = _.flatten(_.values(this.$props.story_work))
        }

        var _this = this
        // filter out any stories that are not active
        workSet = _.filter(workSet, function(i) {
          return _.includes(_this.$props.stories, i.for_story)
        })
        // further filter down to only the incomplete items
        workSet = _.filter(workSet, {'done': false})
        var estimatedWork = _.sumBy(workSet, 'estimate.amount') || 0
        var actualWork    = _.sumBy(workSet, 'actual.amount') || 0
        this.total_estimated_hours = estimatedWork
        this.total_confidence = weightedConfidence(workSet)
        this.total_estimated = workDisplay(estimatedWork)
        this.total_actual = workDisplay(actualWork)
        // If total represents a "group". Display as "Group Total"
        if (this.$props.group) {
          this.total_text = "Group Total"
        }
      }
    },
    methods: {
      nameTitleText: function() {
        if (this.$props.group) {
          return this.$props.group;
        }
        else {
          return null;
        }
      },
      titleText: function() {
        var totalHours = this.total_estimated_hours || 0
        return "Estimated Time Remaining: " + totalHours.toString() + "h"
      }
    }
  }
</script>

<style scoped>

</style>
