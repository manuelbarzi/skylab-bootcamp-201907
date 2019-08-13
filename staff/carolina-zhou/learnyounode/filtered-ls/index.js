// file system module passed to a variable named fs
var fs = require('fs')

// path module passed to a variable named path
var path = require('path')
 
// third and fourth index of the argv property of the process object also passed to named variables
/* const { argv: [,, directory, extension]} = process 
process.argv = [...]*/
var directory = process.argv[2]
var extension = '.' + process.argv[3]
 
// readdir method from fs called. it accepts a directory as the first argument and a callback function as the second.
fs.readdir(directory, function (err, files) {
  if (err) return console.error(err)
  files.forEach(function(file) {
      // path.extname(p) method extracted from official documentation
      if (path.extname(file) === extension) {
          console.log(file)
      }
  })
})