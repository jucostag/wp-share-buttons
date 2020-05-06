var gulp = require("gulp"),
    git = require('gulp-git')
    jshint = require("gulp-jshint"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    sass = require("gulp-ruby-sass"),
    notify = require("gulp-notify") ,
    maps = require("gulp-sourcemaps"),
    files = {
      vendor: ["node_modules/angular-slideables/angularSlideables.js",
               "node_modules/angular-socialshare/dist/angular-socialshare.min.js",
               "node_modules/bootstrap/dist/js/bootstrap.min.js"],
      js:     ["assets/app/*.js", 
               "assets/app/**/*.js"],
      css:     "assets/sass/*.s*ss"
    };

gulp.task("clone", function(){
  git.clone("https://github.com/EricWVGG/AngularSlideables.git", 
    { args: "./node_modules/angular-slideables" }, function (err) {
    if (err) throw err;
  });
});

gulp.task("font-awesome-css", function() { 
    return gulp.src("./node_modules/font-awesome/css/**.*")
        .pipe(gulp.dest("./assets/css"))
});

gulp.task("font-awesome-icons", function() { 
    return gulp.src("./node_modules/font-awesome/fonts/**.*") 
        .pipe(gulp.dest("./assets/fonts")); 
});

gulp.task("css", function() { 
    return sass(files.css, {
             style: "compressed",
            sourcemap: true
         }) 
        .on("error", sass.logError)
        .pipe(maps.write("./maps"))
        .pipe(rename({
              basename : "wpsb",
              extname : ".min.css"
            }))
         .pipe(gulp.dest("./assets/css")); 
});

gulp.task("vendor", function() {
  gulp.src(files.vendor)
  .pipe(concat("wpsbVendor.min.js"))
  .pipe(uglify())
  .pipe(gulp.dest("assets/js"));
});

gulp.task("js", function() {
  gulp.src(files.js)
  .pipe(jshint())
  .pipe(jshint.reporter("default"))
  .pipe(concat("wpsb.min.js"))
  .pipe(uglify())
  .pipe(gulp.dest("assets/js"));
});

gulp.task("watch",function() {
  gulp.watch(files.css, ["css"]);
  gulp.watch(files.js, ["js"]);
});

gulp.task("build", ["clone", "font-awesome-css", "font-awesome-icons", "css", "vendor", "js"]);
gulp.task("default", ["watch"]);