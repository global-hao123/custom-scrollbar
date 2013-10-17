# jQuery custom-scrollbar plugin

A jQuery plugin for custom scrollbar

## Compatibility

- IE 6-10, Firefox, Opera, Chrome, Safari
- ltr / rtl
- Windows / Mac
- Mouse / Touchpad

## TODO

 - [Feature] drag when middle-key is pressing
 - [Feature] support mobil device
 - [Feature] resize support
 - [API] destroy support

## Demo

## Getting Started

require plugin:

```html
<link rel="stylesheet" href="scrollable.css">
<script src="scrollable.js"></script>
```

html snippet:

```html
<div class="outer">
    <div id="test1" class="inner">
        <!--content-->
    </div>
</div>
```

simple bind a element:

```html
<script>
$("#test1").scrollable();
</script>
```

## Examples

### Simple Syntax:

```
$("#test1, #test2").scrollable();
```

### Verbose Syntax:
There are lots of options, so you could do something more like:

```javascript

// Options
$("#test1, #test2").scrollable({
    /**
     * mousewheel speed
     * @type {Number}
     */
    wheelSpeed: 20

    /**
     * Mousedown pressing delay on scrollbar
     * @type {Number}
     */
    , pressDelay: 200

    /**
     * Direction, default to auto
     * @type {String}
     */
    , dir: ""

    /**
     * Auto hide scrollbar when mouseleave
     * @type {String|Bool|Number}
     * @example: true, 1, "1" ==> true | false, 0, "0" ==> false
     */
    , autoHide: true

    /**
     * Add a custom class, like: "mod-scroll--black"
     * @type {String}
     */
    , customClass: ""

    /**
     * The suffix-classes of controller elements
     * @type {Object}
     */
    , controller: {
        barX: "bar-x"
        , barY: "bar-y"
        , thumbX: "thumb-x"
        , thumbY: "thumb-y"
    }
});

// Event API

// onInit

// onScroll

// onWheel

// onStartPress
// onEndPress

// onStartDrag
// onEndDrag

// Dynamic state, allows read and write
this.state = {
    dir: that.args.dir === "ltr"

    , autoHide: that.args.autoHide == 1

    // Outer Height
    , H: $parent.height()

    // Inner Height
    , h: $el.outerHeight()

    // Outer Width
    , W: $parent.width()

    // Inner Width
    , w: $el.outerWidth()

    // Axis-x offset of thumb
    , x: 0

    // Axis-y offset of thumb
    , y: 0

    // Update scroll offset
    , offset_x: Math.max(state.w - state.W, 0)
    , offset_y: Math.max(state.h - state.H, 0)

    // Update thumb size
    , _w: thumbSize(state.W, state.w)
    , _h: thumbSize(state.H, state.h)
}
```

## Contributing

## Release History

* 2013/10/17 - v0.1.0 - First release

## License
Copyright (c) 2012 Boaz Sender  
Licensed under the MIT, GPL licenses.
http://code.bocoup.com/license/

## Authors

* [yuji](http://gitlab.pro/u/yuji)
* [wangmingfei](http://gitlab.pro/u/wangmingfei)