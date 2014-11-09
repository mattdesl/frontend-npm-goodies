require('canvas-testbed')(draw)

var tris = [
    [[50,50], [400,140], [70, 140]],
    [[100, 300], [50, 300], [150, 350]],
    [[350,300], [450,450], [350, 450]], 
    [[150, 450], [250,450], [150,300]], 
    [[125,150], [100,70], [170, 40]]
]

//hit testing
var collision = require('triangle-circle-collision')

//get a mouse/touch vector
var mouse = require('touch-position')()

//radius of our mouse circle
var radius = 10

function draw(ctx, width, height) {
    ctx.clearRect(0, 0, width, height)

    //whether collision happens at all
    var inside = tris.some(function(t) {
        return collision(t, mouse, radius)
    })

    //draw our triangles
    tris.forEach(function(t) {
        ctx.beginPath()
        ctx.lineWidth = 1
        ctx.strokeStyle = 'black'
        t.forEach(function(pos, i) {
            ctx.lineTo(pos[0], pos[1])
        })
        ctx.closePath()
        ctx.stroke()
    })

    //draw mouse
    ctx.beginPath()
    ctx.arc(mouse[0], mouse[1], radius, 0, Math.PI*2, false)
    ctx.lineWidth = 3
    ctx.strokeStyle = inside ? 'red' : 'black'
    ctx.stroke()
}