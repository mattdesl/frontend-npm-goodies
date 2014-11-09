//quick css insert for our demo here
require('insert-css')(`
    img { padding: 5px; }
`)

var Promise = require('bluebird')
var load = Promise.promisify(require('img'))
var animate = require('gsap-promise')
var baboon = require('baboon-image-uri')

var paths = require('./icon-paths')('icons').slice(0, 30)

require('domready')(() => {
    start()
        .then(() => {  
            console.log("Animations all done.")
        })
})

function start() {
    //parallel preload all images
    return Promise.all(paths.map(x => load(x)))
        //then add them to the body once finished
        .then(render)
        //then fade them in
        .then(fadeIn)
        //then trigger our next cool sequence
        .then(sequence)
}

//render our images and add them to the body
function render(images) {
    images.forEach(function(img) {
        document.body.appendChild(img)
    })
    return Promise.resolve(images)
}

//stagger fade the images in, return a promise of this task
function fadeIn(images) {
    return animate.staggerFromTo(images, 1.0, {
        alpha: 0
    }, {
        alpha: 1,
        ease: "easeOutExpo"
    }, 0.02)
}

//do some other cool thing here
function sequence() {
    //load up a test image
    return load(baboon)
        .then( img => {
            //style it absolutely
            animate.set(img, { display: 'block', x: -img.width*2 })
            document.body.appendChild(img)
            //animate it in, returning the promise of this task
            return animate(img, 1.0, { x: 0, ease: 'easeOutExpo' } )
        })
}