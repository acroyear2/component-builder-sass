
var resolve = require('component-resolver');
var build = require('component-builder');
var path = require('path');

function fixture(name) {
  return path.join(__dirname, 'fixtures', name);
}

function buildStyles (tree, options, cb) {
  build.styles(tree)
    .use('styles', build.plugins.css())
    .use('styles', require('..')(options))
    .end(function (err, string) {
      if (err) throw err;
      cb(string);
    });
}

describe('sass', function () {

  it('should render', function (done) {
    resolve(fixture('example'), {}, function (err, tree) {
      if (err) throw err;
      buildStyles(tree, {
        includePaths: tree.paths,
        outputStyle: 'compressed'
      }, function (string) {
        string.trim().should.eql('section h1{color:#cc0000;}')
        done();
      });
    });
  });

});
