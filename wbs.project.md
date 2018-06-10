# Filters

filter {#display-filter}

# Project File for WBS-Markdown

chart {#stories-chart}

## Stories

toggle {#stories-toggle}

- **null**: Unlinked {story="null"}

- **04**: "traditional" mode with "1.1.1.2" style numbering [Github](https://github.com/brainlid/wbs_markdown/issues/4) {story=04}

totals {#stories-total}


## wbs-markdown

- wbs-markdown
  - lib
    - `file-utils.js`
    - `index.wbsm.js`
    - `report-generate.js`
      - `generate()`
      - `watching()`
    - `settings.js`
    - `version.js`
    - `wbsm-init.js`
    - `wbsm-new.js`
    - `wbsm-report.js`
    - `wbsm-watch.js` {new=true}
  - templates
    - `sample-config.json`
    - `wbs_deliverables_layout.html`
      - components
        - [ ] traditional numbering display component? {work=3d link=04}
        - `<security-local-storage>`
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
      - functions
        - `workEstimate()`
        - `workDisplayBest()`
        - `weightedConfidence()`
    - `wbs.sample.md`
  - `README.md`
    - [ ] documented "traditional" mode {work=0.25 link=04}

## Administrative

- Administration
  - MR (Merge Request)
  - QA Verified
    - [ ] **04** verified {work=0.5h link=04}
  - Announcements

## Raw Table Data

table {#stories-table}
