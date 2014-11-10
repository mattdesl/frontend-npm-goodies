//setup styles
require('./style.less')

var domify = require('domify')
var template = require('./content.hbs')
var createList = require('./list')

require('domready')(() => {
    var container = document.body.appendChild(domify('<div id="main">'))

    container.appendChild( domify(template()) )
    createList(container)
})