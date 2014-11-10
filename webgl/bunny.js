var createVignette = require('gl-vignette-background')
var bunny = require('bunny')
var rgb = require('./luma-to-rgb')

//the bulk of the WebGL code is contained in the orbit-viewer
require('./orbit-viewer')(bunny, {
    lines: true,                 //render lines (gl.LINES)
    scale: [1.5, 1.5, 1.5],      //scale the model matrix
    position: [0, -5, 0],        //translate the model matrix
    tint: [0.8, 0.8, 0.8, 0.2],  //mesh color
    background: background       //pass the factory function for our background
})

//any object with a draw() function can act as our "background"
function background(gl) {
    return createVignette(gl, {
        color1: rgb(80),
        color2: rgb(20),
        noiseAlpha: 0.1,
        coloredNoise: false,
        scale: [1.15, 1.15]
    })
}

