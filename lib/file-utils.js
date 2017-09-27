var fs = require('fs');

// Read the contents of a file out synchronously and return the file contents.
function read(filename) {

  // TODO: see https://nodejs.org/docs/latest-v6.x/api/fs.html#fs_fs_access_path_mode_callback
  // read recommended example.
  // what happens if the project file doesn't exist?

  return fs.readFileSync(filename, 'utf8', function (err, data) {
    if (err) {
      return console.error(err);
    }
    return data;
  });
}

// Write the contents of a file out synchronously and return the file contents.
function write(contents, outputFilename, overwrite) {
  var flags = {flags: "wx"};
  if (overwrite === false) {
    flags = flags["flags"] = "";
  }
  console.log(flags)
// https://nodejs.org/docs/latest-v6.x/api/fs.html#fs_fs_access_path_mode_callback
// see write recommended example. Open then write.


  return fs.writeFile(outputFilename, contents, flags, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;
    return true;
  });
}

// Implements a poor content-copy operation. Working with smaller files and the
// fs.copyFileSync doesn't exist in Node 6.x LTS.
function copy(fromFile, toFile, overwrite) {
  var contents = read(fromFile);
  return write(contents, toFile, overwrite);
}

module.exports = {
  read: read,
  write: write,
  copy: copy
};
