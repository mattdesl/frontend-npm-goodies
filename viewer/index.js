var items = require('../demos')
var template = require('./item.hbs')
var domify = require('domify')
require('domready')(function() {

    items.map(render)
        .forEach( function(e) { document.body.appendChild(domify(e))}  )
})


var urljoin = require('url-join')

function render(item) {
    item.link = urljoin(item.folder, item.name)
    item.url = urljoin('/', item.link)+'.js'
    return template(item)
}