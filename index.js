
var sass = require('node-sass');
var path = require('path');
var pluck = require('pluck');

var filenamePattern = /^(?!_).+\.(scss)$/;

module.exports = function (options) {
  options = options || {};

  return function scss (file, done) {
    if (!filenamePattern.test(file.path)) return done();

		var includePaths = [path.dirname(file.filename)];
		for (var key in file.branch.dependencies) {
			if (file.branch.dependencies.hasOwnProperty(key))
				includePaths.push(file.branch.dependencies[key].path);
		}
		includePaths = includePaths.concat(options.includePaths);

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
        includePaths: includePaths,
        outputStyle: options.outputStyle,
        imagePath: options.imagePath
      });
    });

  };
};

