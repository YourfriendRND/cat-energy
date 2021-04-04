const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso"); // CSS минификатор
const rename = require("gulp-rename"); // Переименовка файлов
const imagemin = require("gulp-imagemin") // Оптимизатор изображений
const webp = require("gulp-webp"); // Конвертр jpg, png в WebP
const svgstore = require("gulp-svgstore"); // Конструктор svg спрайтов
const uglify = require("gulp-uglify"); // Минификатор JS
const del = require("del"); // Чистка файлов
const sync = require("browser-sync").create();

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

//images

const images = () => {
  return gulp.src("source/img/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({quality: 90, progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.images = images;

//jpg, png in WebP

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img/webp-graphics"))
}

exports.createWebp = createWebp;

// Sprites

const sprite = () => {
  return gulp.src("source/img/icons/*.svg")
  .pipe(svgstore())
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("source/img"))
}

exports.sprite = sprite;

//Scripts

const scripts = () => {
  return gulp.src("source/js/script.js")
  .pipe(uglify())
  .pipe(rename("script.min.js"))
  .pipe(gulp.dest("build/js"))
  .pipe(sync.stream())
}

exports.scripts = scripts;

//Copy

const copy = () => {
  return gulp.src([
    "source/fonts/*.{woff,woff2}",
    "source/*.html"
  ],
  {
    base: "source"
  })
  .pipe(gulp.dest("build"))
}

exports.copy = copy;

// Copy images

const copyImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}",
  {
    base: "source"
  })
  .pipe(gulp.dest("build"))
}

exports.copyImages = copyImages;

//Clean

const clean = () => {
  return del("build")
}

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

// Build - create final folder

const build =
gulp.series (
  clean,
  sprite,
  gulp.parallel (
    createWebp, styles, images, scripts, copy
  )
)

exports.build = build;

// Default - start developer mode

exports.default = gulp.series(
  clean,
  sprite,
  gulp.parallel(
    createWebp,
    copyImages,
    styles,
    scripts,
    copy
  ),
  gulp.series(
    server,
    watcher
  )
)
