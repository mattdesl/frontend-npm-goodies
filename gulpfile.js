var gulp = require('gulp')
var gutil = require('gulp-util')
var source = require('vinyl-source-stream')
var watchify = require('watchify')
var livereload = require('gulp-livereload')
var connect = require('gulp-connect')
var uglify = require('gulp-uglify')
var browserify = require('browserify')
var xtend = require('xtend')
var format = require('format-text')
var streamify = require('gulp-streamify')
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

gulp.task('dev', function(){
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

gulp.task('watch', ['dev'], function(){
    connect.server({
        port: 8000,
        root: 'dist'
    })
    livereload.listen(35729)
});

gulp.task('html', function(cb) {
    demos.forEach(function(d) {
        var jsFile = bundleFilename(d)
        var demoTemplate = htmlTemplate
        if (d.template) 
            demoTemplate = fs.readFileSync(d.template, 'utf8')

        var doc = format(demoTemplate, xtend({
            title: d.name,
            entry: 'js/'+jsFile
        }, d))

        var f = 'dist/'
        var outfile = d.outfile || (d.folder+'-'+d.name+'.html')
        fs.writeFileSync(path.join(f, outfile), doc)
    })
    if (cb)
        cb()
})

gulp.task('copy', function() {
    return gulp.src(['image/icons/**'])
        .pipe(gulp.dest('dist/icons'))
})

gulp.task('default', ['html', 'copy', 'production'])

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
    if (transforms) 
        transforms.forEach(function(t) { b.transform(t) })
    
    function doBundle() {
        var p = b.bundle()
            .on('error', function(e) {
                gutil.beep()
                gutil.log( gutil.colors.red('Bundle error: ',e.message) )
            })
            .pipe(source(out))
        
        if (!watch)
            p = p.pipe(streamify(uglify({ mangle: true, compress: true })))

        p = p.pipe(gulp.dest('./dist/js'))

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