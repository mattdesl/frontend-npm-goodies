var baboon = require('baboon-image-uri')
var pixels = require('get-image-pixels')
var palette = require('get-rgba-palette')
var load = require('img')
var colorStyle = require('color-style')
var style = require('dom-style')

require('domready')(function() {
    //load a test image
    load(baboon, function(err, img) {
        if (err) throw err

        //show it
        document.body.appendChild(img)

        //get the 5 prominent colors from our image
        var count = 5
        var p = palette(pixels(img), count)

        //render the colors
        render(p, img.width/count)
    })  
})

function render(p, width) {
    var container = document.createElement('div')

    //add each color to the dom as a styled div
    p.forEach(function(color) {
        var el = document.createElement('div')
        style(el, {
            display: 'inline-block',
            width: width+'px',
            height: '20px',
            backgroundColor: colorStyle(color)
        })
        container.appendChild(el)
    })
    document.body.appendChild(container)
}