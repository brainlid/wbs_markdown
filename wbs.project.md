# Project File for WBS-Markdown

chart {#stories-chart}

## Stories

toggle {#stories-toggle}

- **null**: Unlinked {story="null"}

- **09**: Level of Detail component [Github](https://github.com/brainlid/wbs_markdown/issues/9) {story=09}

totals {#stories-total}

## wbs-markdown

filter {#display-filter}

style {#display-style}

### Code

- wbs-markdown
  - lib
    - `config/default.json`
      - [ ] detail-level component registered {work=0.25h link=09}
    - report
      - components
        - bs-percentage
        - confidence-display
        - `css/main.scss`
        - display-style
        - display-filter
        - invalid-story-panel
        - detail-level {new=true}
          - [ ] Template UI v1 implemented {work=1d link=09}
          - [ ] Event fires to vue-main to collapse to a level {work=0.5h link=09}
          - [ ] Supports an "all" level {work=0.25h link=09}
          - [ ] Selection display shows all available levels {work=1h link=09}
        - security-local-storage
        - stories-chart
        - stories-table
        - stories-toggle
        - stories-total
        - story-label
        - tick-display
        - vue-main
          - [ ] Handles event from detail-level to set state of current detail level {work=0.5h link=09}
          - [ ] detail-level state is stored in localstorage {work=0.5h link=09}
          - [ ] computes max total detail level count {work=2h link=09}
          - `workEstimate()`
          - `workDisplayBest()`
          - `weightedConfidence()`
        - wbs-item
          - [ ] knows it's level {work=0.25h link=09 note="using numbering array"}
          - [ ] prop for "desired-level" shows/hides item appropriately {work=0.75h link=09 note="uses the toggle method (only toggle when not a deliverable?)"}
      - htmlPlugins
        - `reportConfig/reportConfig.js`
        - `vue/vue.js`
        - `wbs/wbs.js`
      - `generate.js`
        - `generate()`
        - `watching()`
    - `file-utils.js`
    - `index.wbsm.js`
    - `settings.js`
    - `version.js`
    - `wbsm-init.js`
    - `wbsm-new.js`
    - `wbsm-report.js`
    - `wbsm-watch.js`
  - templates
    - `sample-config.json`
    - `wbs_deliverables_layout.html`
    - `wbs.sample.md`
  - `README.md`

### Administrative

- Administration
  - MR (Merge Request)
  - QA Verified
  - Announcements
  - Samples Updated
    - [ ] **09** Updated externally hosted sample files {work=1h link=09 note="May move to wbscourse.com domain"}
  - Release

## Raw Table Data

table {#stories-table}
