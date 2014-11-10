var background = require('gl-checker-background')

//get the triangulated svg mesh
var mesh = require('./svg-mesh')()

var scale = 10
require('./orbit-viewer')(mesh, {
    scale: [scale, -scale, scale], //scale the model matrix
    tint: [0.15,0.15,0.2,0.90],    //mesh color
    background: background         //pass the factory function for our background
})