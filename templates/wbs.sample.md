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

- Project
  - Module A
    - [ ] unlinked (not linked to a story) {work=1}
    - Sub 0
    - [ ] Sub 1 {work=1d link=123}
    - [ ] Sub 2 {work=2d link=123}
    - [x] Sub 3 {work=5h link=234 actual=6h}
    - Sub 4
  - Module B
    - [ ] artwork updated {work=3h link="123"}
    - [ ] "Right to be Forgotten" function implemented {work=1w link=234 confidence=30}
    - [x] "Right to be Forgotten" button on user profile page {work=1h link=234 actual=0.5}
    - [x] Completed item (not linked to a story) {work=1d}
    - [x] Billing event recorded {work=1d link=123}
  - Module C {new=true}
    - [ ] behavior X implemented {work=1 link=234}
    - Database
      - [ ] database table Y tracks user acceptance {work=1 link=345}
  - Module D
  - Module E


## Administrative

- Administration
  - MR (Merge Request)
    - Submission
      - [ ] **345** Merge Request created {work=0.5h link=345}
    - Code reviewed and updated
      - [ ] **345** Merge Request updated and merged {work=0.5h link=345}
  - Security Assessment
  - Threat Model updated
  - CR (Change Request)
    - Submission
    - Approved and deployed
    - Validated in PRD
      - [ ] **345** validated and tested in production {work=0.75h link=345}
  - Announcements
    - [ ] **345** Email announcing new feature created {work=1d link=345}
    - [ ] **345** Email announcing new feature sent {work=0.25 link=345}


## Raw Table Data

table {#stories-table}
