const gulp = require('gulp');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
var ts = require("gulp-typescript");

let tscinfig = ts.createProject('./tsconfig.json');

//开发环境
function buildDev() {
    return tscinfig.src()
        .pipe(tscinfig())
        .js
        .pipe(gulp.dest('./dist'));
}

//上线环境
function buildProd() {
    return tscinfig.src()
        .pipe(rollup({
            input: './config/index.ts',
            output: {
                format: 'cjs'
            },
            plugins: [
                replace({
                    'process.env.NODE_ENV': JSON.stringify('production')
                })
            ]
        }))
        .pipe(tscinfig())
        .js
        .pipe(gulp.dest('./dist'));
}

let build = gulp.series(buildDev);

if (process.env.NODE_ENV == 'production') {
    build = gulp.series(buildProd);
}

gulp.task('default', build);