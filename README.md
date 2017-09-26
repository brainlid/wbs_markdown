# WBS Markdown

## Installation

```
npm install -g wbs_markdown
```

## Usage

Initialize a new project configuration.

```
wbsm init
```

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


## Development

Interactive development where it is linked to act like a global registration.

```bash
npm link
npm unlink
```

Working with `asdf`:

- `which wbsm` shows where symlink is shimmed
- if changing the root bin command, may have to `rm` the shim link
- remove the node_modules
- `npm install -g`
