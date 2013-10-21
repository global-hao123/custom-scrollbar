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
     * Timer of update layout(0 | false ==> do not check)
     * @type {Number}
     */
    , watch: 200

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
    
    /**
     * Fire when scroll
     */
    , onScroll = function() {
        console.log(this.state)
    }
});
```

## Options

| Option        | Type | Default Value        | Description |
| ------------- |:-----|:--------:| -----:|
| wheelSpeed     | `Number` | 20 | mousewheel speed |
| pressDelay     | `Number` | 200 | Mousedown pressing delay on scrollbar |
| watch     | `Number` | 200 | Timer of update layout(0, false ==> do not check)|
| dir     | `String` | "" | Direction(ltr/trl), default to auto detect|
| autoHide     | `String` / `Bool` / `Number` | true | Auto hide scrollbar when mouseleave(true, 1, "1" ==> true) |
| customClass    | `String` | "" | Add a custom class, like: `mod-scroll--black` |
| controller    | `Object` | {barX: "bar-x", barY: "bar-y", thumbX: "thumb-x", thumbY: "thumb-y"} | The suffix-classes of controller elements |

## Dynamic State

allows read and write, like:

```
$("#test1").scrollable({
    onScroll = function() {
        console.log(this.state);
        that.state.x = 0;
    }
});
```

| State Key        | Type | Description |
| ------------- |:--------:| -----:|
| dir     | `Bool` | Boolean `dir` in options |
| autoHide     | `Bool` | Whether to auto hide(by options) |
| H     | `Number` | Container Height |
| W     | `Number` | Container Width |
| h     | `Number` | Content Height |
| w     | `Number` | Content Width |
| x     | `Number` | Axis-x offset of the thumb |
| y     | `Number` | Axis-y offset of the thumb |
| offset_x     | `Number` | Axis-x offset of Content |
| offset_y     | `Number` | Axis-y offset of Content |
| _w     | `Number` | thumb width|
| _h     | `Number` | thumb height|

## Event API

| Function Name        | Description |
| ------------- |:--------:| -----:|
| onInit     |  Initialization trigger  |
| onScroll     |  Triggered when scrolling  |
| onWheel     |  Triggered when mouse wheel to scroll  |
| onStartPress     |  Triggered when press on scrollbar  |
| onEndPress     |  Triggered when press end  |
| onStartDrag     |  Triggered when start drag  |
| onEndDrag     |  Triggered when end drag  |

## Contributing

## Release History

* 2013/10/21 - v0.1.2 - Fixed: #1 & replace MutationObserver to setInterval
* 2013/10/18 - v0.1.1 - Add: Inner style/content Dynamic change supports
* 2013/10/17 - v0.1.0 - First release

## License
Copyright (c) 2012 Boaz Sender  
Licensed under the MIT, GPL licenses.
http://code.bocoup.com/license/

## Authors

* [yuji](http://gitlab.pro/u/yuji)
* [wangmingfei](http://gitlab.pro/u/wangmingfei)