var createShader = require('gl-basic-shader')
var createGeometry = require('gl-geometry')
var createCamera = require('canvas-orbit-camera')
var createApp = require('canvas-testbed')

var mat4 = require('gl-mat4')

var clear = require('gl-clear')()
var touch = require('touch-position')()

//A simple WebGL scene 
module.exports = function(complex, opt) {
    createApp(render, start, { context: 'webgl' })

    var projection = mat4.create()
    var view       = mat4.create()
    var model      = mat4.create()
    var rotate     = mat4.create()

    //offset the model a bit
    mat4.scale(model, model, opt.scale || [1,1,1])
    mat4.translate(model, model, opt.position || [0, 0, 0])

    var geometry,
        shader,
        camera,
        mode,
        tint = opt.tint || [1, 1, 1, 1],
        background,
        angle = 0


    function render(gl, width, height, dt) {
        clear(gl)

        if (background) {
            //setup state for background rendering
            gl.enable(gl.BLEND)
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

            gl.disable(gl.DEPTH_TEST)
            background.draw()
        }

        camera.view(view)
        camera.tick()

        var aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight
        var fieldOfView = Math.PI / 4
        var near = 0.01
        var far = 1000
        mat4.perspective(projection, fieldOfView, aspectRatio, near, far)

        gl.enable(gl.DEPTH_TEST)
        gl.disable(gl.CULL_FACE)

        //rotate the mesh a bit
        angle += dt / 1000 * 0.1
        mat4.copy(rotate, model)
        mat4.rotateY(rotate, rotate, angle)

        //send the matrices to the shader
        shader.bind()
        shader.uniforms.tint = tint
        shader.uniforms.projection = projection
        shader.uniforms.view = view
        shader.uniforms.model = rotate
        
        //draw the geometry
        geometry.bind(shader)
        geometry.draw(mode)
        geometry.unbind()
    }

    //called on domready
    function start(gl, width, height) {
        camera = createCamera(gl.canvas)
        shader = typeof opt.shader === 'function' 
            ? opt.shader(gl) : createShader(gl)

        //two geometries: one for filled, one for wireframe
        geometry = createGeometry(gl)
        geometry.attr('position', complex.positions)
        geometry.faces(complex.cells)

        mode = opt.lines ? gl.LINES : gl.TRIANGLES

        if (typeof opt.background === 'function')
            background = opt.background(gl)
    }
}


