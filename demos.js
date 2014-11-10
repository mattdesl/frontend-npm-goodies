module.exports = [
    { folder: 'image', name: 'animation', info: 'handling animations with Promises & ES6', transforms: ['6to5-browserify', 'brfs'] },
    { folder: 'image', name: 'preloader', info: 'preloading images with async-each', transforms: ['brfs'] },
    { folder: 'image', name: 'preloader-es6', info: 'preloading images with Promises & ES6', transforms: ['6to5-browserify', 'brfs'] },
    { folder: 'image', name: 'palette', info: 'get RGB palette from an image' },
    { folder: 'canvas', name: 'collision', info: 'example of circle-triangle collision in real-time' },

    { folder: 'webgl', name: 'svg', info: 'svg triangulation & rendering in WebGL' },
    { folder: 'webgl', name: 'bunny', info: 'the stanford bunny as a wireframe mesh' },

    { folder: 'viewer', 
        name: 'index', 
        outfile: 'index.html', 
        norender: true,
        info: 'the main demo viewer harness', 
        template: 'viewer/index.template.html',
        transforms: ['hbsfy', 'lessify', '6to5-browserify'] }
]
