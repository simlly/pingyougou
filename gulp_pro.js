/* 生产环境做的事 */
console.log("======生产环境做的事======");
const gulp = require("gulp");
const del = require("del");
const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require('gulp-cssmin');
const babel = require("gulp-babel");
const uglify=require("gulp-uglify");
const fileInclude = require("gulp-file-include");
const rev=require("gulp-rev");
const revCollector=require("gulp-rev-collector");

gulp.task("del", () => {
  return del(["./dist"]);
});

// 3 处理css 任务
gulp.task("css", () => {
  return gulp
      .src("./src/css/*.less")
      .pipe(less())
      .pipe(
        autoprefixer({
          browsers: ["last 2 versions"]
        })
      )
      .pipe(cssmin())
      .pipe(rev())
      .pipe(gulp.dest("./dist/css/"))
      .pipe(rev.manifest({
        path:"rev-css.json"
      }))
      .pipe(gulp.dest("./rev/"));
});

// 4 处理js
gulp.task("js",()=>{
  return  gulp.src("./src/js/*.js")
  .pipe(babel())
  .pipe(uglify( { mangle: { toplevel: true } } ))
  .pipe(rev())
  .pipe(gulp.dest("./dist/js/"))
  .pipe(rev.manifest({
    path:"rev-js.json"
  }))
  .pipe(gulp.dest("./rev/"));
});

// 5 处理html 任务
gulp.task("html",()=>{
  return gulp
  .src(["src/*.html","./rev/*.json"])
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "src/components/",
      })
    )
    .pipe(revCollector())
    .pipe(gulp.dest("dist/"));
});

// 6 执行 负责第三方插件 任务
gulp.task("lib",()=>{
  return  gulp.src("./src/lib/**")
  .pipe(gulp.dest("./dist/lib/"));
});

gulp.task("default", gulp.series(["del","css","js","html","lib"]));