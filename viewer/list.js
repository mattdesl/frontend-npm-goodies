var items = require('../demos').filter(function(d) {
    return !d.norender
})
var template = require('./item.hbs')
var domify = require('domify')

var animate = require('gsap-promise')

var urljoin = require('url-join')
var path = require('path')

function render(item) {
    item.link = item.outfile || (item.folder+'-'+item.name)
    item.url = path.basename(item.link, '.html')+'.html'
    item.src = source(item)
    return template(item)
}

function append(parent) {
    return function(e) {
        return (parent||document.body).appendChild(e)
    }
}

function source(d) {
    var base = 'https://github.com/mattdesl/frontend-npm-goodies/blob/master/'
    return urljoin(base, d.folder, d.name+'.js')
}

module.exports = function(parent) {
    var elements = items
            .map(render)
            .map(domify)

    //animate each
    animate.staggerFromTo(elements, 0.5, {
        alpha: 0
    }, { 
        alpha: 1.0, delay: 0.1, ease: "easeOutQuad" 
    }, 0.03)

    //add to dom
    elements.forEach(append(parent))
}