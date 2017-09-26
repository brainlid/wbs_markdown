# Sample Markdown Project File

Generate using `wbsm report`. Generates `wbs.project.html`.

Feature Definition Example:

```markdown
- Unlinked (group work item's not linked to a story) {story="null"}
- Higher-level user feature/story - [PRJ-001](https://github.com/brainlid/wbs_markdown/issues/1) (Initials) {story="001"}
```

Deliverable Item Examples:

```markdown
- [ ] incomplete item with explicit work size set {link=001 work=3}
- [x] completed item that defaults to 1 hour work unit {link=001}
```

## Stories

- Unlinked {story="null"}
- Small feature that is defined alone - [PRJ-001](https://github.com/brainlid/wbs_markdown/issues/1) (BL) {story=123}
- Story 234 {story=234}
- Story 345 {story=345}

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
  - [ ] do stuff A {work=1 link=234}
- Section C
  - [ ] do C stuff B {work=1 link=234}
  - C.1
    - [ ] do C.1 {work=1 link=345}
    - C.1.1
      - [x] do C.1.1 {work=1 link=345}
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
