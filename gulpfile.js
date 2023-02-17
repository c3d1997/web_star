const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // 載入 gulp-sass 套件
const purgecss = require('gulp-purgecss') // 載入 gulp-purgecss 套件
const postcss = require('gulp-postcss'); // 載入 gulp-postcss 套件
const autoprefixer = require('autoprefixer'); // 載入 autoprefixer 套件

gulp.task('sass', () => {
    return gulp
        .src('./scss/all.scss') // SCSS 主檔案路徑
        .pipe(sass().on('error', sass.logError)) // 使用 gulp-sass 進行編譯\\
        .pipe(postcss([autoprefixer()])) // 將編譯完成的 CSS 做 PostCSS 處理
        .pipe(gulp.dest('./css')); // 編譯完成輸出路徑
});

gulp.task('watch', () => {
    return gulp
        .watch('./scss/**/*.scss', gulp.series('sass')); //監視scss資料夾內所有的.scss檔案
});

// 移除沒用的CSS
gulp.task('purgecss', () => {
    return gulp
        .src('./scss/all.scss')
        .pipe(purgecss({
            content: ['index.html']
        }))
        .pipe(gulp.dest('./css')); // 編譯完成輸出路徑
});