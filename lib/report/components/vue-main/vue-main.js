// create a root instance
new Vue({
  el: '#vue-root',
  data: {
    // the template being used may not include a filter display component,
    // provide a good default show_mode value.
    show_mode: null,
    style_display: {wbs: "bullets", progress: true, totals: true, colored: true},
    active_stories: [],
    story_work: {},
    total_work: 0,
    stories: [],
    workItems: [],
    story_groups: {},
    invalid_story_links: [],
    can_use_local_storage: false,
    root_nodes: [],
    positions: {},
    max_level: 0,
    selected_level: 0
  },
  mounted: function() {
    this.can_use_local_storage = testLocalStorageAccess('lastDocId')
    // Load lastDocId from localstorage. If something was loaded (failure to
    // read returns a null). If found a previous ID and it is different from
    // this report's document.
    var lastDocId = safeGetLocalStorageItem("lastDocId", null)
    if (lastDocId && reportConfig.document_id && lastDocId != reportConfig.document_id) {
      deleteLocalStorageKeys(["stories", "selected_level", "filter_mode"])
    }
    this.saveToLocalStorage('lastDocId', reportConfig.document_id)

    // get a list of stories
    var totalStories = _.map(this.stories, 'story')

    // load the persisted localStorage settings and try to apply them now.
    //
    // The root node is the last one to be mounted. Set the active_stories
    // to all the stories once mounted if we can't load from previous.
    // Triggers the items to evaluate their totals based on story inclusion.
    //
    // Intersect the loaded with what's valid for the report. Don't want invalid
    // "active" stories.
    var loadedStories = safeGetLocalStorageItem('stories', totalStories)
    this.active_stories = _.intersection(totalStories, loadedStories)

    // restore the saved "filter_mode" or "show_mode" if it exists. Otherwise
    // the default is used.
    this.show_mode = safeGetLocalStorageItem('filter_mode', "new-tracking")

    // restore the saved "style_display" settings if it exists. Otherwise the
    // default is used.
    this.style_display = _.merge({}, safeGetLocalStorageItem('style_display', this.style_display))

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

    // All items are mounted and registered.
    // Start the numbering for the structure.
    // Ensure "positions" is a new object
    var positions = {}
    this.root_nodes.forEach(function(child, index) {
      computePositions(child, [index + 1], positions)
    })
    // set the positions to the newly computed object
    this.positions = positions
    // computed the greatest depth
    var maxFound = computeMaxLevel(positions)
    this.max_level = maxFound
    // load the last saved "selected_level". File changes could make that invalid.
    // If maxFound is less, use that.
    var loadedSelectedLevel = safeGetLocalStorageItem('selected_level', maxFound)
    if (maxFound < loadedSelectedLevel) {
      this.selected_level = maxFound
    }
    else {
      this.selected_level = loadedSelectedLevel
    }
  },
  computed: {
    classObject: function() {
      return {
        "mode-new-tracking": this.show_mode == "new-tracking",
        "mode-existing": this.show_mode == "existing-only",
        "mode-all": this.show_mode == "all",
        "style-numbered": this.style_display["wbs"] == "numbered",
        "style-bullets": this.style_display["wbs"] == "bullets",
        "style-progress": this.style_display["progress"],
        "style-totals": this.style_display["totals"],
        "style-colored-checks": this.style_display["colored"]
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
      // track top-level non-work items (new or existing structure) but not
      // terminal elements
      if (child.mode == "none") {
        // if the parent vue element is this (the root) then it is a
        // top-level "none" item.
        if (child.$parent == this) {
          this.root_nodes.push(child)
        }
      }
    },
    filterChanged: function(showMode) {
      // user changed the active filter using the filter component.
      // update the mode for display.
      this.show_mode = showMode;
      // record the "show_mode" under "filter_mode" in the localStorage.
      this.saveToLocalStorage('filter_mode', this.show_mode)
    },
    styleChanged: function(options) {
      // user changed the style options using the style component.
      // update the options for display.
      // create a new object to ensure no reference issues
      this.style_display = _.merge({}, options)
      // record the styles under "style_display" in the localStorage.
      this.saveToLocalStorage('style_display', JSON.stringify(this.style_display))
    },
    levelChanged: function(newLevel) {
      this.saveToLocalStorage('selected_level', newLevel)
      this.selected_level = newLevel
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
      this.saveToLocalStorage('stories', JSON.stringify(this.active_stories))
    },
    toggleAllStories: function() {
      // loop through all the stories and toggle their active/checked state
      var allNames = _.map(this.stories, "story")
      var _this = this
      _.forEach(this.stories, function(s) {
        _this.toggleStory(s.story)
      })
    },
    saveToLocalStorage: function(key, value) {
      if (this.can_use_local_storage) {
        localStorage.setItem(key, value)
      }
      else {
        console.warn("Unable to write " + key + " to local storage. Value:", value)
      }
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
  // Start with what we were given. Could be a fractional hour like 0.25h which
  // would already be the best.
  var bestFit = {amount: amountHours, unit: "h"}

  // Convert the object in arrays. Ex: [["d", 6], ["h", 1]]
  var pairs = _.toPairs(reportConfig.unitConversion)
  // sort by the numeric value. Order of the keys can be alphabetical.
  var unitConversions = _.sortedUniqBy(pairs, function(a) { return a[1]})

  _.forEach(unitConversions, function(pair) {
    var [unit, conversionAmount] = pair
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

/**
 * Delete the specified keys from localstorage.
 * @param {Array} keys  Array of key names to delete
 */
function deleteLocalStorageKeys(keys) {
  try {
    _.forEach(keys, function(key) {
      localStorage.removeItem(key)
    });
  } catch (e) {
    console.error("Blocked from using localStorage")
  }
}

// Uses dirty mutable objects to build out the entries on the positions hash
// object.
function computePositions(node, position, positions) {
  // record the node's position in the hash

  positions[node.getId()] = position
  // NOTE: $children includes non-work-item children. Filter to the list
  // of only wbs-item children
  var workItemChildren = _.filter(node.$children, function(child) {
    return child.$vnode.componentOptions["tag"] == "wbs-item"
  })
  // recursively compute the positions this node's children
  workItemChildren.forEach(function(child, index) {
    computePositions(child, position.concat(index + 1), positions)
  })
}

// Given an object with ID's and position arrays, we want to get all the arrays
// and find the longest one. That is the max depth.
function computeMaxLevel(positionsData) {
  // We've already computed an array for each work-item that has it's number
  // for WBS numbering structure. Now just find the longest of those arrays.
  // _.values() returns an array of arrays.
  var values = _.values(positionsData)
  return _.reduce(values, function(acc, numArray) {
    // if this array is longer than the longest we've seen so far, return that
    // length
    var currLength = numArray.length
    if (currLength > acc) {
      return currLength
    }
    else {
      return acc
    }
  }, 0)
}
