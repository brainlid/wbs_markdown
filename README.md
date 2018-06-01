# WBS Markdown

WBS Markdown is an NPM package designed to make it easier for software
developers to create and manage a [Work Breakdown Structure
(WBS)](https://en.wikipedia.org/wiki/Work_breakdown_structure). A WBS can be a
powerful tool in the estimation process. This is fully compatible with an Agile
workflow.

## Purpose

This tool is designed to be used by a software developer and assumes you are
skilled at editing text files (markdown specifically). The breakdown structure
is managed in a [Markdown file](https://en.wikipedia.org/wiki/Markdown) format
which you are probably already familiar with. Using your favorite editor you can
collapse regions, perform mass updates, re-structure, and more.

The generated report is a static HTML file. It uses [Vue.js](https://vuejs.org/)
components to add some interactive features.

## Examples

Example reports that show different ways of using the WBS Markdown tool. These
are the rendered static HTML reports that are created from a markdown file.

- [Bicycle Product Sample](https://brainlid.org/assets/static-html/wbs-markdown/wbs.bicycle-product.html) - [Markdown file](./examples/wbs.bicycle-product.md) Example shows the breakdown of a the creation of a new bicycle product. This is an adaptation from an example given on the [WBS Wikipedia page](https://en.wikipedia.org/wiki/Work_breakdown_structure#Example).
- [Rails Commerce Project](https://brainlid.org/assets/static-html/wbs-markdown/wbs.rails-commerce.html) - [Markdown file](./examples/wbs.rails-commerce.md) Example shows a simple/small Rails e-Commerce project with a detailed breakdown of a new "Forgot my password" feature. This is a "high level of detail" breakdown and is an example of what that may look like. Remember, you choose the appropriate Level of Detail for you immediate need.

## Background

How many times have you estimated a new feature and you ended up being *way*
off? Yeah, I've been there too many times myself. Management and Project
Managers need *some* idea of the amount of work something will be. This helps me
give a better estimate so I don't forget parts of the system that are impacted
by a change.

As we continue to build out the features and the product, the project file is
checked in with our source code so it is shared and expanded to represent the
code being created.

An additional benefit, I wanted to be able to track the progress of features
being built. This allows for marking off tasks as being completed (which can be
checked in with the implementing code). Since the report output is a static HTML
file, a project build system can generate the report for what is committed on,
say, the master branch and expose feature progress in that way as well.

I created this tool for myself and my team. I share it in the hopes it can help
others as well.

## Installation

```
npm install -g wbs-markdown
```

## Getting Started

### Initialize a new project configuration

```
wbsm init
```

This will create a file named `.wbsm-config.json` in your current working
directory.

This is a sample configuration file:

```json
{
  "reportTitle": "WBSM Project Report",
  "defaultWorkUnit": "d",
  "unitConversion": {
    "h": 1,
    "d": 6,
    "w": 30,
    "m": 120
  },
  "avgHoursPerDay": 4.5,
  "workUnitConfidencePct": {
    "h": 95,
    "d": 80,
    "w": 60,
    "m": 30
  }
}
```

### Create New Markdown Project File

Create a new project markdown file. This file can be checked in with the
sourcecode of your project.

```
wbsm new
```

Optionally specify the name of the new file to create. Defaults to
`wbs.project.md`.

```
wbsm new wbs.my-project.md
```

### Generate a Report

Basic version. Defaults to look for a markdown file titled `wbs.project.md`.

```
wbsm report
wbsm r
```

You can generate a report from a specifically named file using the `-m` flag and
the filename.

```
wbsm report -m wbs.my-project.md
wbsm r -m wbs.my-project.md
```

You can override the generated HTML report output filename using the `-r` flag
and the filename.

```
wbsm report -r custom-report-name.html
wbsm r -r custom-report-name.html
```

### Get CLI Help

```
wbsm --help
wbsm new --help
wbsm report --help
```

## Upgrade Notes

If upgrading from a pre-1.0 version, you will want to add the "filter" component
to your project file. This became a component which lets you customize the
default display mode and the placement of the filter selection in your report.

## Usage

The document uses a Markdown style. Anything you can create in Markdown is
valid. This makes it easy to customize and create something that works and makes
sense for your project and organization.

### Components

There are a number of "components" to use for helping to get the most out of
building a Work Breakdown Structure in Markdown.

#### Story Item

There are several valid ways to define a story item.

```markdown
- Story description {story=StoryId}
- **StoryId**: Story description {story=StoryId}
- **StoryId**: Story description {story=StoryId group="Group Name"}
```

The first one is minimum for a Story. A story can optionally be linked to a
group. The bold StoryId is just to help with usability in reading and
interacting with the document.

**Examples**

```markdown
- **ISSUE-123**: New Billing Integration Service  {story="ISSUE-123"}
- **[ISSUE-123](https://example.com/issue-link/ISSUE-123)**: New Billing Integration Service  {story="ISSUE-123"}
```

Remember that it is just Markdown, so it can contain links to external issue
trackers or anything relevant.

#### Work Item

The work item is the heart of the document.

```markdown
- [ ] Item description {work=1d link=987}
- [x] Item description {work=1h link=987 actual=1.5h note="note to self"}
```

Attributes:

- `[ ]` - work item is incomplete
- `[x]` - work item is complete
- `{link=(story)}` - links a work item to a specific story
- `{work=(duration)}` - estimated duration to complete. The more specific the estimate, the higher the confidence. There is higher confidence in `5d` than in `1w`.
  - Expressed as `unit` and `time`.  Examples: `1d`, `2.5h`, `0.5w`
    - Supported values:
      - `h` - hours
      - `d` - days
      - `w` - weeks
      - `m` - months
- `{actual=(duration)}` - (optional) actual time required to complete (for personal documentation)
- `{confidence=(value)}` - (optional) explicitly set the confidence for the work estimate. A default confidence percent is used based on the time used. An hour long estimate has a higher confidence value than a week long one.
- `{note="Text"}` - (optional) note to associate with the work item. A note is visible on the rendered report on a work item through a "note" icon. It is also exposed in the "table" component's display of work items. Ex: `{note="forgotten"}`
- `{new=true}` - (optional) explicitly signal that something in the project structure should be treated as "new" when filtering, even though it isn't a work item that is directly estimated. It can be added at the top-level "new" item and all contained child items will be hidden when switched to the "Existing Structure Only" filter view.


**NOTE:** Must be nested under a non work item.

**Example:**

```markdown
- BillingSystem
  - Integrations
    - [ ] Quickbooks Online {work=1m link=987}
  - Email Templates
    - [x] Quickbooks Integration communication problem {work=2h link=987}
```

#### Filter Display

Displays a Filter radio group for changing the current filter or mode of the display.

```markdown
filter {#display-filter}

filter {#display-filter default="show-all"}
```

Supported values for `default`:

- `new-basic`
- `new-tracking` - The default value if not specified.
- `existing-only`
- `show-all`

#### Story Chart

Creates a chart that shows each story's work size, amount completed and
optionally actual time spent.

```markdown
chart {#stories-chart}
```

When stories are toggled on/off, they are included or removed from the chart.

#### Story Toggle

Creates a toggle link. Helpful for flipping the inclusion of a story. If you
want to focus on 1 or 2 stories, you can toggle all of them off and just turn on
the ones you wish to focus on.

```markdown
toggle {#stories-toggle}
```

#### Story Totals

Creates a component that totals all the selected stories. Optionally it can be
linked to a specific group. This is effectively a sub-total then. When no group
link is set, it gives the total for all the checked stories.

```markdown
totals {#stories-total}
totals {#stories-total group="Phase 1"}
```

#### Story Table

Generates a table with all the work items' details in an easy to access way.

```markdown
table {#stories-table}
```

This helps get data out and easily copied into a spreadsheet or other system.
When a developer is working on measuring their ability to improve at estimate
accuracy over time, they need data. This helps collect that data for personal
use.

This also exposes any "notes" on a work-item that otherwise aren't displayed.
