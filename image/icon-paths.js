var fs = require('fs')
var path = require('path')
var urljoin = require('url-join')

//get all files in the icons folder
var files = fs.readdirSync(__dirname+'/icons')

//filter them to images only
files = files.filter(function(p) {
    var ext = path.extname(p).toLowerCase().substr(1)
    return [
        'jpg', 'jpeg', 'png', 'bmp', 'gif'
    ].indexOf(ext) !== -1
})

//populates a list of icon paths for use in the examples
module.exports = function icons(base) {
    return files.map(function(p) {
        return base ? urljoin(base, p) : p
    })
}