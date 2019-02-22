# WBS Markdown Dev Notes

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

Deploying an update

Update `lib/version.js` for the correct next version.

```
npm version patch
npm publish
git push
```

Push the tag for creating a GitHub release (if desired). Used Atom's Git Plus plugin.

```
git push origin v1.1.0
```
