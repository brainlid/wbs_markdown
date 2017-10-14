# WBS Markdown

## Purpose

WBS Markdown is an NPM package designed to make it easier for software
developers to create a [Work Breakdown Structure
(WBS)](https://en.wikipedia.org/wiki/Work_breakdown_structure) to help in the
estimation process. This is fully compatible with an Agile workflow.

This tool assumes you are a software developer and you are skilled at editing
text files. The breakdown structure is managed in a [Markdown
file](https://en.wikipedia.org/wiki/Markdown) which you are probably already
familiar with. Using your favorite editor you can collapse regions, perform
mass updates, and more.

The report that gets generated is a static HTML file (using Vue.js components)
to help add some interactive features.

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

**(Not yet implemented)**

```
wbsm init
```

This will create a file named `.wbsm-config.json` in your current working
directory.

This is a sample configuration file:

```json
{
  "reportTitle": "WBSM Project Report",
  "newFilename": "wbs.project.md",
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

**(Not yet implemented)**

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
wbsm report -m wbs.simple.md
wbsm r -m wbs.simple.md
```

### Get CLI Help

```
wbsm --help
```
