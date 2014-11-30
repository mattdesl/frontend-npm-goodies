//setup styles
require('./style.less')

var domify = require('domify')
var template = require('./content.hbs')
var createList = require('./list')

var domready = require('domready')

domready(function() {
    var container = document.body.appendChild(domify('<div id="main">'))

    var content = template()
    container.appendChild( domify(content) )
    createList(container)
})