# Filters

filter {#display-filter}

# Project File for WBS-Markdown

chart {#stories-chart}

## Stories

toggle {#stories-toggle}

- **null**: Unlinked {story="null"}

- **03**: "watch" sub-command that auto-regenerates [Github](https://github.com/brainlid/wbs_markdown/issues/3) {story=03}
- **04**: "traditional" mode with "1.1.1.2" style numbering [Github](https://github.com/brainlid/wbs_markdown/issues/4) {story=04}
- **05**: Local storage persists user selections between refreshes [Github](https://github.com/brainlid/wbs_markdown/issues/5) {story=05}

totals {#stories-total}


## wbs-markdown

- wbs-markdown
  - lib
    - `file-utils.js`
    - `index.wbsm.js`
      - [x] documented "watch" sub-command {work=0.25h link=03}
    - `report-generate.js`
      - `generate()`
      - `watching()`
    - `settings.js`
    - `version.js`
    - `wbsm-init.js`
    - `wbsm-new.js`
    - `wbsm-report.js`
    - `wbsm-watch.js` {new=true}
      - [x] watch function that executes the report sub-command on file change {work=1.5d link=03}
      - [x] supports custom filename to watch {work=1h link=03}
  - templates
    - `sample-config.json`
    - `wbs_deliverables_layout.html`
      - components
        - [ ] traditional numbering display component? {work=3d link=04}
        - `<invalid-story-panel>`
        - `<filter>`
          - [ ] "traditional" mode selection {work=1h link=04}
        - `<stories-chart>`
        - `<stories-toggle>`
        - `<stories-table>`
        - `<tick-display>`
        - `<progress-bar>`
        - `<wbs-item>`
          - [ ] awareness of number within parent context {work=1d link=04 confidence=50 note="Don't know how to do yet"}
          - [ ] displays full context number {work=1d link=04 note="Needs parent's full number context and own number within parent?"}
        - `<vue-root>`
          - [ ] Local storage used to read/write mode and story selections {work=2d link=05 note="Research needed"}
      - functions
        - `workEstimate()`
        - `workDisplayBest()`
        - `weightedConfidence()`
    - `wbs.sample.md`
  - `README.md`
    - [ ] documented "traditional" mode {work=0.25 link=04}
    - [ ] documented "watch" sub-command {work=0.5h link=03}
    - [ ] documented local storage behavior {work=0.25h link=05}

## Administrative

- Administration
  - MR (Merge Request)
  - QA Verified
    - [x] **03** verified {work=0.5h link=03}
    - [ ] **04** verified {work=0.5h link=04}
    - [ ] **05** verified {work=0.5h link=05}
  - Released
    - [ ] **03** released {work=0.25h link=03}
    - [ ] **04** traditional filter mode released {work=0.25h link=04}
    - [ ] **05** local storage released {work=0.25h link=05}
  - Announcements

## Raw Table Data

table {#stories-table}
