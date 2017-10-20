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

## Usage

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
