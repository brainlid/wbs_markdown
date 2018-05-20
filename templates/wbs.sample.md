# Filters

filter {#display-filter}

# Sample WBS Markdown Project File

Generate using `wbsm report`. Generates `wbs.project.html`.

Feature Definition Example:

```markdown
- Unlinked (group work item's not linked to a story) {story="null"}
- Higher-level user feature/story - [PRJ-001](https://github.com/brainlid/wbs_markdown/issues/1) (Initials) {story="001"}
```

Deliverable Item Examples:

```markdown
- [ ] incomplete item with explicit work size set {link=001 work=3}
- [ ] explicitly set confidence value (as percent) {link=001 work=3 confidence=20}
- [ ] item with a note {link=001 work=3 note="shows up in the data table"}
- [x] completed item that defaults to 1 hour work unit {link=001}
```

## Stories

chart {#stories-chart}

toggle {#stories-toggle}

- **null**: Unlinked {story="null"}

### Phase 1

- **123**: Small feature that is defined alone - [PRJ-001](https://github.com/brainlid/wbs_markdown/issues/1) (BL) {story=123 group="Phase 1"}
- **234**: Story 234 description {story=234 group="Phase 1"}

totals {#stories-total group="Phase 1"}

### Phase 2

- **345**: Story 345 description {story=345 group="Phase 2"}
- **456**: Story 456 description {story=456 group="Phase 2"}

totals {#stories-total group="Phase 2"}

### Total

totals {#stories-total}


## MyProject

- Section A
  - [ ] unlinked {work=1}
  - Sub 0
  - [ ] Sub 1 {work=1 link=123}
  - [ ] Sub 2 {work=1 link=123}
  - [x] Sub 3 {work=1 link=234}
  - Sub 4
- Section B
  - [ ] do stuff {work=1 link="123"}
  - [x] more stuff {work=1}
  - [x] done stuff {work=1 link=123}
  - [ ] do stuff A {work=1 link=234 confidence=30}
- Section C {new=true}
  - [ ] do C stuff B {work=1 link=234}
  - C.1
    - [ ] do C.1 {work=1 link=345}
    - C.1.1
      - [x] do C.1.1 {work=1 link=345 note="depends on secret project X"}
- Section D
- Section E


## Administrative

- MR (Merge Request)
  - Submission
  - Code reviewed and updated
- Security Assessment
- Threat Model updated
- CR (Change Request)
  - Submission
  - Approved and deployed
  - Validated in PRD


## Raw Table Data

table {#stories-table}
