# frontend-npm-goodies

Lessons/examples for creative coding, rapid prototyping, and front-end development with npm in JS. It demonstrates the strengths of modern practices like modularity, promises, functional programming, browserify, Node, ES6, etc.

This is still a work in progress. More goodies coming soon.

## live demos

You can run any of the demos here:  

http://mattdesl.github.io/frontend-npm-goodies/dist/

Some of the demos will also be published to RequireBin so you can easily jump in and edit them.

- [canvas-collision](http://requirebin.com/?gist=2af8e18dae0111886aa1)
- [image-palette](http://requirebin.com/?gist=1f49e56f22fa9caa94d7)

## building demos

To run any of the demos from source:

1. `git clone https://github.com/mattdesl/frontend-npm-goodies.git`
2. `cd frontend-npm-goodies`
3. `npm install`

Now you can either bundle all of the files with `gulp`, or you can run it in dev (watch) mode on a single file like so:

```gulp watch --demo canvas-collision```

Where the format is `[folder]-[filename]`. Then you can open `localhost:8000/canvas-collision.html` to see it in action. Examples:

```
gulp watch --demo image-animation
gulp watch --demo image-palette
gulp watch --demo image-preloader
gulp watch --demo image-preloader-es6
gulp watch --demo canvas-collision
```

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/frontend-npm-goodies/blob/master/LICENSE.md) for details.
