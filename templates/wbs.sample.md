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
- [ ] incomplete item with estimated work size of 3 days {link=001 work=3d}
- [ ] explicitly set confidence value (as percent) {link=001 work=3d confidence=20}
- [ ] item with a note {link=001 work=3d note="shows up in the data table"}
- [x] completed work item, 2 hours estimated {link=001 work=2h}
- [x] completed work item, tracked actual time {link=001 work=2h actual=3.25h}
```

## Stories

chart {#stories-chart}

toggle {#stories-toggle}

- **null**: Unlinked {story="null"}

### Group 1

- **123**: Some Small feature - [PRJ-001](https://github.com/brainlid/wbs_markdown/issues/1) (BL) {story=123 group="Group 1"}
- **234**: Story 234 description {story=234 group="Group 1"}

totals {#stories-total group="Group 1"}

### Group 2

- **345**: Story 345 description {story=345 group="Group 2"}

totals {#stories-total group="Group 2"}

### Total

totals {#stories-total}


## MyProject

- Project
  - Module A
    - [ ] unlinked (not linked to a story) {work=1d}
    - Sub 0
    - [x] Sub 1 {work=1d link=123}
    - [ ] Sub 2 {work=2d link=123}
    - [x] Sub 3 {work=5h link=234 actual=6h}
    - Sub 4
  - Module B
    - [x] artwork updated {work=3h link="123"}
    - [ ] "Right to be Forgotten" function implemented {work=1w link=234 confidence=30}
    - [x] "Right to be Forgotten" button on user profile page {work=1h link=234 actual=0.5h}
    - [x] Completed item (not linked to a story) {work=1d}
    - [x] Records customer billing event {work=1d link=123}
  - Module C {new=true}
    - [ ] behavior X implemented {work=1d link=345}
    - Database
      - [ ] database table Y tracks user acceptance {work=1d link=345}
  - Module D
  - Module E


## Administrative

- Administration
  - MR (Merge Request)
    - Submission
      - [ ] **123** Merge Request created {work=0.5h link=123}
    - Code reviewed and updated
      - [ ] **123** Merge Request updated and merged {work=0.5h link=123}
  - Security Assessment
  - Threat Model updated
  - CR (Change Request)
    - Submission
    - Approved and deployed
    - Validated in PRD
      - [ ] **123** validated and tested in production {work=0.75h link=123}
  - Announcements
    - [ ] **123** Email announcing new feature created {work=1d link=123}
    - [ ] **123** Email announcing new feature sent {work=0.25 link=123}


## Raw Table Data

table {#stories-table}
