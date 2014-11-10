var gulp = require('gulp')
var gutil = require('gulp-util')
var source = require('vinyl-source-stream')
var watchify = require('watchify')
var livereload = require('gulp-livereload')
var connect = require('gulp-connect')
var browserify = require('browserify')
var xtend = require('xtend')
var format = require('format-text')
var fs = require('fs')

var demos = require('./demos')
var path = require('path')
var asyncEach = require('async-each')

var htmlTemplate = fs.readFileSync(__dirname+'/template.html', 'utf8') 

if (gutil.env.demo) {
    var s = gutil.env.demo.split('-')
    gutil.env.f = s[0]
    gutil.env.d = s.slice(1).join('-')
}

gulp.task('bundle', function(){
    if (typeof gutil.env.f !== 'string' && typeof gutil.env.d !== 'string')
        return gutil.log(gutil.colors.red('Must specify a demo!'))

    var d = getDemo(gutil.env.f, gutil.env.d) || { name: gutil.env.d, folder: gutil.env.f }
    bundleDemo(d, !gutil.env.prod)
})

gulp.task('production', function(cb) {
    asyncEach(demos, function (d) {
        return bundleDemo(d, false)
    }, cb)
})

gulp.task('watch', ['bundle'], function(){
    connect.server({
        port: 8000,
        root: 'app'
    })
    livereload.listen(35729)
});

gulp.task('html', function(cb) {
    demos.forEach(function(d) {
        var jsFile = bundleFilename(d)
        var doc = format(htmlTemplate, xtend({
            title: d.name,
            entry: 'js/'+jsFile
        }, d))

        var f = 'dist/'
        fs.writeFileSync(path.join(f, d.folder+'-'+d.name+'.html'), doc)
    })
    if (cb)
        cb()
})

function bundleFilename(d) {
    return 'bundle-'+d.folder+'-'+d.name+'.js'
}

function bundleDemo(d, watch) {
    var entry = path.join(d.folder, d.name+'.js')
    var outfile = bundleFilename(d)
    return bundle(entry, outfile, watch, d.transforms )
}

function bundle(entry, out, watch, transforms) {
    var args = xtend(watchify.args, { debug: watch })
    var b = watch ? watchify(browserify(args)) : browserify()
    b.on('update', doBundle)
    b.add('./'+entry)
 
    function doBundle() {
        var p = b.bundle()
            .on('error', function(e) {
                gutil.beep()
                gutil.log( gutil.colors.red('Bundle error: ',e.message) )
            })
            .pipe(source(out))
            .pipe(gulp.dest('./dist/js'))
        if (watch)
            p = p.pipe(livereload())
        return p
    }
    return doBundle()
}

function getDemo(folder, name) {
    return demos.filter(function(d) {
        return d.name === name && d.folder === folder
    })[0]
}