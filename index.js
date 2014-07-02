
var sass = require('node-sass');
var path = require('path');

var filenamePattern = /^(?!_).+\.(scss)$/;

module.exports = function (options) {
  options = options || {};

  return function scss (file, done) {
    if (!filenamePattern.test(file.path)) return done();

    file.read(function (err, data) {
      sass.render({
        data: data,
        success: function (string) {
          file.extension = 'css';
          file.string = string;
          done();
        },
        error: function (error) {
          throw new Error(error);
        },
        includePaths: [path.dirname(file.filename)].concat(options.includePaths||[]),
        outputStyle: options.outputStyle,
        imagePath: options.imagePath
      })
    });

  };
};

function extend (obj) {
  Array.prototype.slice.call(arguments, 1).forEach(function (source) {
    if (!source) return;

    for (var key in source) {
      obj[key] = source[key];
    }
  });

  return obj;
}
