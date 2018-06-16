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

level {#detail-level}

### Code

- wbs-markdown
  - lib
    - `config/default.json`
    - report
      - components
        - bs-percentage
        - confidence-display
        - `css/main.scss`
        - display-style
        - display-filter
        - invalid-story-panel
        - detail-level
        - security-local-storage
        - stories-chart
        - stories-table
        - stories-toggle
        - stories-total
        - story-label
        - tick-display
        - vue-main
          - `workEstimate()`
          - `workDisplayBest()`
          - `weightedConfidence()`
        - wbs-item
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
    - [ ] **09** Updated example md files {work=0.25h link=09}
    - [ ] **09** Updated externally hosted sample files {work=1h link=09 note="May move to wbscourse.com domain"}
  - Release

## Raw Table Data

table {#stories-table}
