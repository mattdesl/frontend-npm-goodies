var contents = require('./data/svg.json')
var parse = require('parse-svg-path')
var triangulate = require('triangulate-contours')
var normalize = require('normalize-path-scale')
var contours = require('svg-path-contours')
var bounds = require('getboundingbox')
var simplify = require('simplify-path')
var flatten = require('flatten')

module.exports = function(opt) {
    opt = opt||{}

    var polylines = contours(parse(contents), 5)

    //get all our lines as a single path and determine its bounding box
    var flat = flatten(polylines, 1)
    var box = bounds(flat)

    //now simplify based on the width of the bounding box (for consistency across shapes)
    var threshold = typeof opt.threshold === 'number' ? opt.threshold : 0.001
    polylines = polylines.map(function(c) {
        return simplify(c, (box.maxX-box.minX)*threshold)
    })

    //triangulate the polylines..
    var c = triangulate(polylines)

    //then normalize the positions in -1.0 to 1.0 space
    c.positions = normalize(c.positions, box).map(to3d)
    return c
}

function to3d(p) {
    return [p[0], p[1], p[2]||0]
}