var asyncEach = require('async-each')
var load = require('img')
var paths = require('./icon-paths')('icons')

require('domready')(function() {
    //parallel load all images
    //then add them to the body once finished
    asyncEach(paths, load, function(err, images) {
        if (err) 
            throw err
        else
            render(images)
    })
})

function render(images) {
    images.forEach(function(img) {
        document.body.appendChild(img)
    })
}