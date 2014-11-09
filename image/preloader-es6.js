var Promise = require('bluebird')
var load = Promise.promisify(require('img'))
var paths = require('./icon-paths')('icons')

require('domready')(() => {
    //parallel load all images
    //then add them to the body once finished
    Promise.all(paths.map(x => load(x)))
        .then(render)
})

function render(images) {
    images.forEach(img => document.body.appendChild(img))
}