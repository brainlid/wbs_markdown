<template>
  <li v-bind:class="classObject">
      <span v-if="mode == 'story'">
        <content>
          <div class="checkbox">
            <label>
              <input type="checkbox" v-model="storyIncluded" @click="toggleIncludeStory">
              <slot></slot>
            </label>
          </div>
        </content>
        <div class='story-work-display'>
          <bs-percentage :total="getStoryTotalWork()" :done="getStoryWorkDone()"></bs-percentage>
          <confidence-display :value="storyConfidence"></confidence-display>
          <div class='work-total' title="Estimated Time" @click="toggleExpandStory">
            {{ workEstimateDisplay() }}
            <a href="#" class="toggle-story-details" @click.stop.prevent="toggleExpandStory">
              <i v-show="!storyExpanded" class="fa fa-angle-up"></i>
              <i v-show="storyExpanded" class="fa fa-angle-down"></i>
            </a>
          </div>
        </div>
        <div v-show="storyExpanded">
          Confidence Level: {{storyConfidence}}%
        </div>
      </span>

    <span v-if="mode == 'work-item'">
        <story-label :story="link"></story-label>
        <slot></slot>
        <div v-if="user_work.estimate.amount > 0" class='work-amount pull-right' title="Estimated Time">
          {{ workEstimateDisplay() }}
        </div>
        <div v-if="user_work.estimate.amount == 0" class='work-amount pull-right' title="Not Estimated">
          <i class="fa fa-exclamation text-danger no-estimate-warning" aria-hidden="true"></i>
        </div>
        <div v-if="note" class='work-note pull-right' :title="note">
          <i class="fa fa-sticky-note" aria-hidden="true"></i>
        </div>
      </span>
    <span v-if="mode == 'none'">
        <span class="collapsed-toggle-display">
          <i class="fa fa-plus-square-o" v-on:click.self.stop="toggleCollapsed"></i>
        </span>
        <content v-on:click.self.stop="toggleCollapsed">
          <slot></slot>
        </content>
        <div class='sub-work-display' v-if="showProgress">
          <bs-percentage :total="totals.totalWork" :done="totals.totalDone"></bs-percentage>
          <div class='work-total pull-right' title="Estimated Time">
            {{ workEstimateDisplay() }}
          </div>
        </div>
      </span>
  </li>
</template>

<script>
  export default {
    // declare the props
    // - showmode - passed from root, showing "all", "new-basic", "new-tracking", or "existing-only"
    // - new - flag passed for explicitly marking a non-work item as "new" so it can be filtered out on "existing-only" mode
    // - done - "true" if flagged as complete
    // - work - "1", "2"... passed as a string, represents hours of work
    // - actual - Track reported actual work reported by user.
    // - work_item - If a [ ] or [x] was used on the item, it is a work-item
    // - link - string that connects a work-item to a story. Value is the story number.
    // - story - string that labels a wbs-item as a story. Value is the story number.
    // - active_stories - Array of story names/IDs that are checked and "active"
    // - stories - Array of story numbers that selected for display
    // - story_work - Array of objects that tracks total and done work for a story.
    // - confidence - Explicitly set the level of confidence on a work-item.
    // - note - User defined note that is tracked and output in table view (on work-item)
    // - group - Attribute to help group stories together (only really applies to a story)
    props: ['work_item', 'link', 'story', 'active_stories', 'stories',
      'story_work', 'work', 'actual', 'showmode', 'new', 'done',
      'confidence', 'note', 'group'],
    template: '#wbs-item-template',
    data: function() {
      // NOTE: props come in as strings unless explicitly bound to Vue like this...
      // <wbs-item :work=3 :done=true story="123">Contents</wbs-item>
      // Most of my "data" values are "computed" so they can process the input
      // and I don't have to Regex HTML as much.
      return {
        storyIncluded: true,
        storyExpanded: false,
        childWork: [],
        storyConfidence: 0,
        collapsed: false
      }
    },
    watch: {
      active_stories: function() {
        // respond to being "included"
        var value = _.includes(this.$props.active_stories, this.$props.story)
        this.storyIncluded = value
      },
      stories: function() {
        // NOTE: this watch doesn't fire on "story_work", which is what it should be.
        //       That's an object though. It didn't work as a computed property
        //       either because it only fired once and it wasn't the object with
        //       values, it was an Observer with none of the values set.
        var value = 0;
        if (this.mode == "story") {
          value = weightedConfidence(this.$props.story_work[this.$props.story])
        }
        this.storyConfidence = value
      }
    },
    mounted: function() {
      // When "mounted" event fires, all children are already mounted and available.
      var list = [];
      _.forEach(this.$children, function(child) {
        list = _.concat(list, child.user_work, child.childWork)
      })
      this.childWork = _.compact(list)

      // once mounted, fire event that registers this item with the root.
      this.$emit("register", this)
    },
    computed: {
      excludedByStorySelection: function() {
        return this.getExcludedByStorySelection(this.$props.stories)
      },
      showProgress: function() {
        // show the progress when not a story or work-item and has total to
        // display. But don't show even then if showmode is for "existing-only"
        var nonWorkItemAndHasWork = (this.mode == "none" && this.totals.totalWork > 0)
        return nonWorkItemAndHasWork && this.$props.showmode != "existing-only";
      },
      classObject: function () {
        return {
          'wbs-item': true,
          'story': this.mode == "story",
          'task-parent': this.showProgress,
          'show-tick': this.user_work,
          'collapsed': this.collapsed,
          // 'show-tick': !this.showProgress && this.user_work,
          'hidden': !this.shouldShow()
        }
      },
      unlinked: function() {
        return (this.mode == "work-item") && (this.user_link == "null")
      },
      totals: function() {
        var _this = this
        var workForSelection = _.filter(this.childWork, function(work) {
          return _this.includeForStories(_this.$props.stories, work)
        })
        return {
          workItems: workForSelection,
          // compute done from all self and all children. If ALL done the true.
          done: _.every(workForSelection, {'done': true}),
          // sum of all work items expressed in hours
          totalWork: _.sumBy(workForSelection, 'estimate.amount') || 0,
          totalDone: _.sumBy(_.filter(workForSelection, 'done'), 'estimate.amount') || 0,
        }
      },
      mode: function() {
        // if flagged as a "story", operate as that only
        if (!_.isEmpty(this.$props.story)) {
          return "story"
        }
        // if defines "work" or a "link" to a story, "work-item"
        // Needs both to preserve an "unlinked" work item and a linked work
        // item with no work estimate
        if (this.$props.work_item) {
          return "work-item"
        }
        return "none"
      },
      // Get the user_link value (ie. what the user said an item links to)
      user_link: function() {
        if (this.mode == "work-item") {
          return _.isEmpty(this.$props.link) ? "null" : this.$props.link;
        }
        else {
          return null;
        }
      },
      // Get the user specified work estimate and recorded actual (if given)
      user_work: function() {
        if (this.mode == "work-item") {
          var confidence = parseInt(this.$props.confidence) || null
          var defaultAmount = 0
          return {
            for_story: this.user_link,
            done: this.$props.done,
            estimate: workEstimate(this.$props.work || "", defaultAmount, confidence),
            actual: workActual(this.$props.actual || ""),
            note: this.$props.note
          }
        }
        else {
          return null;
        }
      }
    },
    methods: {
      shouldShow: function() {
        // always show a story
        if (this.mode == "story") {
          return true
        }
        if (this.mode == "work-item") {
          // should show unless excluded by the current story selection
          if (this.excludedByStorySelection) {
            return false
          }
        }
        // hide if set to "new-*" and does not define new work nor contain
        // children that define work
        if (this.$props.showmode == "new-basic" || this.$props.showmode == "new-tracking") {
          // defines new work directly, has children define work, or explicitly set as "new"
          return (this.user_work != null) || this.totals.workItems.length > 0 || this.$props.new == "true";
        }
        // hide if set to "existing-only" and defines new work
        // show if "existing-only" and not defining new work of flagged as new
        if (this.$props.showmode == "existing-only") {
          return this.mode != "work-item" && this.$props.new != "true";
        }
        return true;
      },
      // Story: when a story's checkbox for inclusion is toggled, emit the event
      toggleIncludeStory: function(_event) {
        if (this.mode == "story") {
          this.$emit("togglestory", this.$props.story)
        }
      },
      // Story: when a story's drop-down/close-up chevron is clicked for exposing more details is toggled
      toggleExpandStory: function(_event) {
        if (this.mode == "story") {
          this.storyExpanded = !this.storyExpanded
        }
      },
      includeForStories: function(stories, work) {
        // have a link and link is NOT included in what to display, return to exclude
        return _.includes(stories, work.for_story);
      },
      getExcludedByStorySelection: function(storyList) {
        if (this.mode == "work-item") {
          // have a link and link is NOT included in what to display, return to exclude
          return (!_.isEmpty(this.user_link) && !_.includes(storyList, this.user_link));
        }
        return false;
      },
      getStoryTotalWork: function() {
        var data;
        if (this.mode == "story") {
          data = this.$props.story_work[this.$props.story]
        }
        else if(this.mode == "work-item") {
          data = this.$props.story_work[this.$props.link]
        }
        return _.sumBy(data, 'estimate.amount') || 0
      },
      getStoryWorkDone: function() {
        var data;
        if (this.mode == "story") {
          data = this.$props.story_work[this.$props.story]
        }
        else if(this.mode == "work-item") {
          data = this.$props.story_work[this.$props.link]
        }
        return _.sumBy(_.filter(data, 'done'), 'estimate.amount') || 0
      },
      workEstimateDisplay: function() {
        switch (this.mode) {
          case "work-item":
            if (this.user_work.estimate.amount == 0) {
              return ''
            }
            else {
              return this.user_work.estimate.display
            }
          case "story":
            var storyWork = _.sumBy(this.story_work[this.story], 'estimate.amount') || 0
            return workDisplay(storyWork)
          case "none":
            return workDisplayBest(this.totals.totalWork)
          default:
            return ""
        }
      },
      toggleCollapsed: function() {
        // Toggle the "collapsed" state of the item. Effect is applied in CSS.
        console.log("toggleCollapsed()")
        this.collapsed = !this.collapsed;
      }
    }
  };
</script>

<style scoped>

</style>
