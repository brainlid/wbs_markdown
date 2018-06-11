// create a root instance
new Vue({
  el: '#vue-root',
  data: {
    // the template being used may not include a filter display component,
    // provide a good default show_mode value.
    show_mode: null,
    active_stories: [],
    story_work: {},
    total_work: 0,
    stories: [],
    workItems: [],
    story_groups: {},
    invalid_story_links: [],
    can_use_local_storage: false
  },
  mounted: function() {
    // get a list of stories
    var totalStories = _.map(this.stories, 'story')
    this.can_use_local_storage = testLocalStorageAccess('filter_mode')

    // load the persisted localStorage settings and try to apply them now.
    //
    // The root node is the last one to be mounted. Set the active_stories
    // to all the stories once mounted if we can't load from previous.
    // Triggers the items to evaluate their totals based on story inclusion.
    this.active_stories = safeGetLocalStorageItem('stories', totalStories)

    // restore the saved "filter_mode" or "show_mode" if it exists. Otherwise
    // the default is used.
    this.show_mode = safeGetLocalStorageItem('filter_mode', "new-tracking")

    // Now that the children are all setup, look for work items that link to
    // a story that doesn't exist. If found, activate the display of an a
    // warning at at the root Vue level.

    // get a list of total work-item links
    var totalLinks = _.compact(_.uniq(_.map(this.workItems, 'link')))
    var missingStories = []
    totalLinks.forEach(function(link) {
      if (!_.includes(totalStories, link)) {
        missingStories.push(link)
      }
    })
    this.invalid_story_links = missingStories
  },
  computed: {
    classObject: function() {
      return {
        "mode-new-basic": this.show_mode == "new-basic",
        "mode-new-tracking": this.show_mode == "new-tracking",
        "mode-existing": this.show_mode == "existing-only",
        "mode-all": this.show_mode == "all"
      }
    }
  },
  methods: {
    registered: function(child) {
      // track stories
      if (child.mode == "story") {
        this.stories.push(child)
        var storyList = this.story_groups[child.group] || []
        this.story_groups[child.group] = _.concat(storyList, child.story)
      }
      // track work-items
      if (child.mode == "work-item") {
        this.workItems = _.concat(this.workItems, child)
        this.addStoryWork(child.user_link, child.user_work, child.done)
      }
    },
    filterChanged: function(showMode) {
      // user changed the active filter using the filter component.
      // update the mode for display.
      this.show_mode = showMode;
      // record the "show_mode" under "filter_mode" in the localStorage.
      if (this.can_use_local_storage) {
        localStorage.setItem('filter_mode', this.show_mode)
      }
      else {
        console.warn("Unable to store filter mode change to local storage.")
      }
    },
    addStoryWork: function(story, userWork, isDone) {
      var storyData = this.story_work[story] || []
      this.story_work[story] = _.concat(storyData, userWork)
    },
    toggleStory: function(story) {
      // toggle a single story's active status (presence in the array)
      var index = this.active_stories.indexOf(story)
      if (index >= 0) {
        // return new array excluding the removed item
        // doing it this way to help Vue detect the array change
        this.active_stories.splice(index, 1)
        this.active_stories = this.active_stories
      }
      else {
        // toggled but not included, find the index in the full set and
        // insert at that position.
        var storyIndex = _.findIndex(this.stories, function(s) {
          return s.story == story
        })
        this.active_stories.splice(storyIndex, 0, story)
        this.active_stories = this.active_stories
      }
      // store the story selection to localStorage so it persists for user.
      if (this.can_use_local_storage) {
        localStorage.setItem('stories', JSON.stringify(this.active_stories))
      }
      else {
        console.warn("Unable to store selected stories to local storage.")
      }
    },
    toggleAllStories: function() {
      // loop through all the stories and toggle their active/checked state
      var allNames = _.map(this.stories, "story")
      var _this = this
      _.forEach(this.stories, function(s) {
        _this.toggleStory(s.story)
      })
    }
  }
});

// Convert a work estimate like "1w" to an object structure where the value
// is converted to the lowest unit (hours) and the confidence is assigned.
// "confidence" is an explicit confidence value if set by the user.
// The confidence value is used if provided, otherwise a default value is
// computed.
function workEstimate(value, defaultAmount, confidence) {
  // regex supports fractional hours "5", "3h", "2.5d"
  var matches = value.match(/(\d+\.?\d*)([h|d|w|m]?)/i)
  var workAmount = defaultAmount
  var workUnit = reportConfig.defaultWorkUnit
  // if found the 2 parts (original text plus the 2 captures)
  if (matches && matches.length == 3) {
    workAmount = _.toNumber(matches[1]);
    if (!_.isEmpty(matches[2])) {
      workUnit = matches[2]
    }
  }
  return {
    display: workAmount.toString() + workUnit,
    user_unit: workUnit.toLowerCase(),
    amount: workAmount * reportConfig.unitConversion[workUnit],
    confidence: confidence || reportConfig.workUnitConfidencePct[workUnit]
  }
}

// Convert an "actual" estimate like "3.5h" to an object structure where the
// value is converted to the lowest unit (hours). Same as `workEstimate`
// but without the confidence percent.
function workActual(value) {
  // use workEstimate, default missing amount to 0
  var est = workEstimate(value, 0)
  return _.omit(est, ['confidence'])
}

// Display the amount in hours to a "best fit" unit for showing total
// estimated work time
function workDisplayBest(amountHours) {
  // Cycle through the unitConversions and stop at the "best" fit.
  // Best is when it is >= 1
  var bestFit = {amount: 0, unit: ""}
  _.forEach(reportConfig.unitConversion, function(conversionAmount, unit) {
    var testAmount = (amountHours / conversionAmount).toPrecision(2)
    if (testAmount >= 1.0) {
      bestFit["amount"] = testAmount
      bestFit["unit"] = unit
    }
  })
  return bestFit.amount.toString() + bestFit.unit.toString()
}

// Compute the weighted average for the confidence values for a story.
function weightedConfidence(storyWork) {
  // computed the weighted average for the confidence value.
  // takes the amount of work at it's level of confidence compared to total work.
  // https://en.wikipedia.org/wiki/Weighted_arithmetic_mean
  // (item1.amount * item1.confidence) + (item2.amount * item2.confidence) / (item1.amount + item2.amount)

  var numerator = _.sumBy(storyWork, function(work) { return work.estimate.amount * work.estimate.confidence })
  var denominator = _.sumBy(storyWork, 'estimate.amount')
  if (denominator <= 0)
    denominator = 1;
  return Math.round(numerator / denominator)
}

// Get the display text for showing an amount of work
function workDisplay(workAmount) {
  if (workAmount == 0) {
    return "-"
  }
  else {
    return workDisplayBest(workAmount)
  }
}

// Test if localStorage can be accessed. Returns a boolean.
function testLocalStorageAccess(key) {
  try {
    localStorage.getItem(key)
    return true
  } catch (e) {
    console.error("Blocked from using localStorage")
    return false
  }
}

// Attempt to read from local storage. If blocked or a value isn't present,
// return the fallback. Logs that it was blocked.
function safeGetLocalStorageItem(key, fallback) {
  var rawData = null;
  try {
    // Try to read from local storage.
    // Could fail from browser security setting.
    rawData = localStorage.getItem(key)
    try {
      // Can read from local storage, try converting the value from JSON.
      // If it fails (ie. wasn't serialized), just use the value we received.
      return JSON.parse(rawData) || fallback
    } catch {
      // Failed to convert from JSON. Just return the value as-is. Could
      // just be a string.
      return rawData
    }
  } catch (e) {
    console.error(e)
    console.error("Blocked from using localStorage")
    console.log("returning fallback", fallback)
    return fallback
  }
}
