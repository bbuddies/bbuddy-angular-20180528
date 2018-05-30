require("babel-core/register");
var gulp = require("gulp");
var gutil = require("gulp-util");
var notify = require("gulp-notify");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var mocha = require("gulp-mocha");
var istanbul = require("gulp-istanbul");
var isparta = require("isparta");

const dev = !process.argv.includes("--production");

gulp.task("default", ["watch", "server"]);

gulp.task("watch", ["build", "mocha"], function() {
  gulp.watch(["src/app/**/*", "src/sass/**/*"], ["build"]);
  gulp.watch(["src/app/**/*", "src/app/test/**/*.js"], ["mocha"]);
});

gulp.task("mocha", function() {
  return gulp
    .src(["src/app/test/**/*.js"], { read: false })
    .pipe(mocha())
    .on("error", gutil.log)
    .on("error", notify.onError("Error: <%= error.message %>"));
});

gulp.task("istanbul", function() {
  return gulp
    .src(["src/app/**/*.js"])
    .pipe(
      istanbul({
        instrumenter: isparta.Instrumenter,
        includeUntested: true
      })
    )
    .pipe(istanbul.hookRequire());
});

gulp.task("coverage", ["istanbul"], function() {
  return gulp
    .src(["src/app/test/**/*.js"], { read: false })
    .pipe(mocha())
    .on("error", gutil.log)
    .pipe(istanbul.writeReports());
});

gulp.task("build", function(callback) {
  webpack(webpackConfig(dev), function(err, stats) {
    if (err) throw new gutil.PluginError("webpack:build", err);
    gutil.log(
      "[webpack:build]",
      stats.toString({
        chunks: false,
        colors: true
      })
    );
    callback();
  });
});

gulp.task("server", function(callback) {
  let port = dev ? 8100 : 9100;
  new WebpackDevServer(webpack(webpackConfig(dev))).listen(port, "localhost", function(err) {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", `http://localhost:${port}/`);
  });
});
