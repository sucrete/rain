const ghPages = require('gulp-gh-pages');
var { task, src } = require('gulp'),
  fs = require('fs'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  uglify = require('gulp-uglify'),
  streamify = require('gulp-streamify'),
  babelify = require("babelify");
	gsap = require("gsap");
	glslify = require("glslify");

function compileJS(file){
  browserify('src/'+file+'.js',{debug:true})
    .transform(babelify)
    .transform('glslify')
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source(file+'.min.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('demo/js'));
}
task('default',['js1'],function(){});
task('js1',function(){
  compileJS('index');
});

task('deploy', () => src('./demo/**/*').pipe(ghPages()));