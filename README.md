# Intro:
Is inspired by http://js1k.com/2012-love/details/1071
# Install:
```
npm install --save canvas-worm
```

# Usage:
Create worm instance.
```javascript
var born = require('canvas-worm');
var path = [{ x: 10, y: 10 }, { x: 20, y: 20 }, { x: 30, y: 30 }];
var worm = born(
  0 /* x position */,
  0 /* y position */,
  2 /* speed */,
  '#ff0000' /* color */ ,
  path /* path which worm will follow on */
);
```

To draw use `draw` method on `worm` instance. You can also update color by use `update` method.
```javascript
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

(function loop() {
  window.requestAnimationFrame(function() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, screenWidth, screenHeight);
    worm.draw(ctx);
    loop();
  });
})();

```

# Examples:
Run
```
npm run build
npm start
```
Go to url localhost:3000
