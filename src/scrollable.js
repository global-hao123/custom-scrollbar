/**
 * jQuery custom-scrollbar plugin
 * @author yuji@baidu.com
 * @update 2013/10/17
 * 
 * Compatibility:
 * 1. IE 6-10, Firefox, Opera, Chrome, Safari
 * 2. ltr/rtl
 * 3. Windows / Mac
 * 4. Mouse / Touchpad
 * 
 * TODO:
 *
 * 1. [Feature] drag when middle-key is pressing
 * 2. [Feature] support mobil device
 * 3. [API] destroy support
 */

var $ = window.jQuery || window.require && require("common:widget/ui/jquery/jquery.js");

$ && function(WIN, DOC, undef) {

    /**
     * check if 3D hardware acceleration supports
     * @type {String}
     */
    var supportCss3d = 'WebKitCSSMatrix' in WIN && 'm11' in new WebKitCSSMatrix()

    /**
     * check if MutationObserver supports
     */
    // , MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver

    /**
     * Constructor
     * @param  {[type]} el  [description]
     * @param  {[type]} args [description]
     * @return {[type]}      [description]
     */
    , scroll = function(el, args) {

        var that = this;
        that.el = el;
        that.$el = $(el);
        that.$parent = that.$el.parent();
        that.state = {};

        // Default options
        that.args = $.extend({

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
             * Timer of update layout(0 | false ==> do not check)
             * @type {Number}
             */
            , watch: 200

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

            /**
             * Event API
             * onInit
             * onScroll
             *
             * onWheel
             * 
             * onStartPress
             * onEndPress
             *
             * onStartDrag
             * onEndDrag
             */
        }, args);

        that.init();
    }

    , fn = scroll.prototype;

/**
 * Initialization
 * @return {[type]} [description]
 */
fn.init = function() {
    var that = this
        , $el = that.$el
        , $parent = that.$parent
        , $wrap = that.$wrap = $("<div>");

    // Initialization controller Layout
    $.map(that.args.controller, function(v, k) {
        $wrap.append(that.state["$" + k] = $('<div class="mod-scroll_' + v + '"></div>'));
    }); 

    // Update State
    that.updateState();

    // Update Layout
    that.initLayout();

    if($parent.css("position") === "static") $parent.css({"position": "relative"});

    if(that.state.autoHide) {
        $wrap.css({"display": "none"});
        $parent
            .on("mouseenter", function() {
                $wrap.css({"display": "block"});
            })
            .on("mouseleave", function() {
                !that.state.draging && $wrap.css({"display": "none"});
            });
    }

    $parent
        .css({overflow: "hidden"})
        .append($wrap).on("mousewheel", function(e) {
        e.preventDefault();
        that.wheelHandle.call($el, e, that);
    });

    $wrap
        .addClass("mod-scroll " + that.args.customClass);

    $el.on("mousedown", function(e) {
            e.preventDefault();
            that.mouseHandle.call(e.target, e, that);
        });

    // Observer fallback to IE / Opera
    // if(!MutationObserver) 

    if(that.args.watch != 0) that.resizeTimer = setInterval(function() {
        that.detectLayout() && that.resizeHandle.call(that);
    }, 200);

    that.args.onInit && that.args.onInit.call(that);
}

/**
 * Update State
 * @return {[type]} [description]
 */
fn.updateState = function() {
    var that = this
        , $el = that.$el
        , $parent = that.$parent
        , state = $.extend(that.state, {

            // Auto detect direction
            dir: function(el, dir) {
                that.args.dir = el.currentStyle
                ? el.currentStyle[dir]
                : WIN.getComputedStyle(el, null).getPropertyValue(dir) || "ltr"
                return that.args.dir === "ltr";
            }(that.el, "direction")

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
            , x: that.state.x || 0

            // Axis-y offset of thumb
            , y: that.state.y || 0
        })

        /**
         * Get thumb size
         * @param  {[type]} outer [description]
         * @param  {[type]} inner [description]
         * @return {[type]}       [description]
         */
        , thumbSize = function(outer, inner) {
            return Math.floor(Math.min(Math.pow(outer, 2) / inner, outer));
        };

    that.state = $.extend(state, {

        // Update scroll offset
        offset_x: Math.max(state.w - state.W, 0)
        , offset_y: Math.max(state.h - state.H, 0)

        // Update thumb size
        , _w: thumbSize(state.W, state.w)
        , _h: thumbSize(state.H, state.h)
    });
}

/**
 * Initialization Layout
 * @return {[type]} [description]
 */
fn.initLayout = function() {
    var that = this
        , state = that.state
        , $el = that.$el
        , $parent = that.$parent
        , $wrap = that.$wrap
        , style = {}
        , isShowX = state.W < state.w
        , isShowY = state.H < state.h;

    // Reset Layout
    style[state.dir ? "right" : "left"] = 0;
    style.display = isShowY ? "block" : "none";
    state.$barY.css(style);
    state.$thumbY.css(style).css({"height": state._h + "px"});

    style = {};
    style[state.dir ? "left" : "right"] = 0;
    style.display = isShowX ? "block" : "none";
    state.$barX.css(style);
    state.$thumbX.css(style).css({"width": state._w + "px"});

    // Start Observer
    /*if(MutationObserver) {
        that.observer = new MutationObserver(function(mutations) {
            // console.log(mutations)
            that.detectLayout() && that.resizeHandle.call(that);
        });

        $($el, $parent).each(function() {
            that.observer.observe(this, {
                attributes: true
                , childList: true
                , characterData: true
                // , subtree: true
                // , attributeFilter: ["dir"]
            });
        });
    }*/
}

fn.resizeHandle = function() {
    var that = this,
    state = that.state;

    that.observer && that.observer.disconnect();

    that.updateState();

    that.scrollTo(state.$thumbX, {
        x: Math.floor(-state.x * state.W / state.w)
        , y: 0
    });

    that.scrollTo(state.$thumbY, {
        x: 0
        , y: Math.floor(-state.y * state.H / state.h)
    });

    that.initLayout();
}

/**
 * Mouse evnent handle, contains click & drag
 * @param  {[type]} e    [description]
 * @param  {[type]} that [description]
 * @return {[type]}      [description]
 */
fn.mouseHandle = function(e, that) {
    var $target = $(this)
        , state = that.state
        , axis = "x"
        , n = state.w
        , N = state.W
        , pos = {
            x: 0
            , y: 0
        }
        , $thumb = state.$thumbX
        , isPressing = !1
        , pressed = 0
        , tmp
        , pressing = function() {
            var offset;

            state[axis] = that.fixPos(state[axis] + N * ((axis === "y"

                // jQuery bug on firefox: e.offsetY ==> undefined & position().top ==> 0
                // @see: http://bugs.jquery.com/ticket/8523
                // ? e.offsetY > state.$thumbY.position().top
                // : e.offsetX > state.$thumbX.position().left) ? -1 : 1), axis);
                ? e.pageY - $target.offset().top > Math.max(parseFloat(state.$thumbY.css("marginTop")), state.$thumbY.position().top)
                : e.pageX - $target.offset().left > Math.max(parseFloat(state.$thumbX.css("marginLeft")), state.$thumbX.position().left)) ? -1 : 1), axis);

            that.scrollTo(that.$el, {
                x: state.x
                , y: state.y
            });

            pos[axis] = Math.floor(-state[axis] * N / n);
            that.scrollTo($thumb, pos);

            offset = (axis === "x" ? e.pageX - $target.offset().left : e.pageY - $target.offset().top) - pos[axis];

            offset = offset > 0 ? offset > (axis === "x" ? state._w : state._h) : offset < 0;

            that.args.onScroll && that.args.onScroll.call(that);

            if(!offset) {
                isPressing = !1;
                pressed = 1;
                that.args.onEndPress && that.args.onEndPress.call(that);
            }

            isPressing && setTimeout(function() {
                isPressing && pressing();
            }, that.args.pressDelay);
        };

    if(this === state.$thumbY[0] || this === state.$barY[0]) {
        axis = "y";
        n = state.h;
        N = state.H;
        $thumb = state.$thumbY;
    }

    if(this === state.$thumbX[0] || this === state.$thumbY[0]) {

        tmp = {
            x: e.pageX
            , y: e.pageY

            // jQuery bug on firefox: e.offsetY ==> undefined & position().top ==> 0
            // , h: $target.position().top
            // , w: $target.position().left
            , h: Math.max(parseFloat($target.css("marginTop")), $target.position().top)
            , w: Math.max(parseFloat($target.css("marginLeft")), $target.position().left)
        }

        if(!state.dir) tmp.w = tmp.w - state._w;
        state.draging = !0;

        $(DOC)
            .on("mousemove.scroll", function(e){

                state[axis] = that.fixPos(-n * (axis === "y"
                    ? tmp.h + e.pageY - tmp.y
                    : tmp.w + e.pageX - tmp.x) / N, axis);

                that.args.onStartDrag && that.args.onStartDrag.call(that);

                that.scrollTo(that.$el, {
                    x: state.x
                    , y: state.y
                });

                pos[axis] = Math.floor(-state[axis] * N / n);
                that.scrollTo($thumb, pos);

                that.args.onScroll && that.args.onScroll.call(that);
            });
    }
    
    else if(this === state.$barX[0] || this === state.$barY[0]) {
        // isPressing = !1;
        isPressing = !0;

        that.args.onStartPress && that.args.onStartPress.call(that);
        pressing();
    }

    $(DOC)
        .on("mouseup.scroll", function(){
            $(this).off("mousemove.scroll").off("mouseup.scroll");
            !pressed && that.args.onEndPress && that.args.onEndPress.call(that);
            isPressing = !1;
            state.draging = !1;
            that.args.onEndDrag && that.args.onEndDrag.call(that);
        })
}

/**
 * Mouse wheel event handle
 * @param  {[type]} e    [description]
 * @param  {[type]} that [description]
 * @return {[type]}      [description]
 */
fn.wheelHandle = function(e, that) {

    var state = that.state,
        $el = $(that.el),
        fixNum = function(axis) {
            return that.state[axis] = that.fixPos(that.state[axis] + that.getDelta(e)[axis] * that.args.wheelSpeed, axis);
        };

    that.scrollTo(that.$el, {
        x: fixNum("x")
        , y: fixNum("y")
    });

    that.scrollTo(state.$thumbY, {
        x: 0
        , y: Math.floor(-state.y * state.H / state.h)
    });

    that.scrollTo(state.$thumbX, {
        x: Math.floor(-state.x * state.W / state.w)
        , y: 0
    });

    that.args.onWheel && that.args.onWheel.call(that);
    that.args.onScroll && that.args.onScroll.call(that);
}

/**
 * Fixed bounds check
 * @param  {[type]} n    [description]
 * @param  {[type]} axis [description]
 * @return {[type]}      [description]
 */
fn.fixPos = function(n, axis) {
    var min = Math.min
        , max = Math.max
        , N = -this.state["offset_" + axis];

    if(!this.state.dir && axis === "x") {
        min = Math.max;
        max = Math.min;
        N = -N;
    }
    return Math.floor(max(min(n, 0), N));
}

/**
 * Detect layout is dynamic changed
 * @return {[type]} [description]
 */
fn.detectLayout = function() {
    var that = this
        , state = that.state;

    return !(state.h === that.$el.outerHeight()
        && state.w === that.$el.outerWidth()
        && state.H === that.$parent.height()
        && state.W === that.$parent.width());
}

/**
 * Keep scroll function simplest
 * @type {[type]}
 */
fn.scrollTo = supportCss3d
? function($el, pos) {
    $el.css({"transform": "translate3d(" + pos.x + "px," + pos.y + "px, 0)"});
}
: function($el, pos) {
    $el[0].style.margin = this.state.dir ? pos.y + "px" + " auto auto " + pos.x + "px" : pos.y + "px " + -pos.x + "px auto auto";
}

/**
 * Compatible get wheel delta
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 * @see https://developer.mozilla.org/en-US/docs/Web/Reference/Events/wheel?redirectlocale=en-US&redirectslug=DOM%2FMozilla_event_reference%2Fwheel
 */
fn.getDelta = function(e) {
    e = e.originalEvent || e;
    var delta = {
        delta: 0
        , x: 0
        , y: 0
    };

    // stupid bugs, but who cares
    // 1. early safari float bug: e.wheelDelta ==> Math.round(e.wheelDelta)
    // 2. opera 9 bug: e.wheelDelta ==> -e.wheelDelta
    delta.delta = e.wheelDelta !== undef ? e.wheelDelta / 120 : -(e.detail || 0) / 3;

    // Gecko
    if(e.axis) delta[e.axis === e.HORIZONTAL_AXIS ? "x" : "y"] = delta.delta;

    // Webkit
    else if(e.wheelDeltaX !== undef) {
        delta.x = e.wheelDeltaX / 120;
        delta.y = e.wheelDeltaY / 120;
    }

    // fallback
    else delta.y = delta.delta;
    return delta;
}

// TODO
fn.destroy = function() {
    var that = this;

    // Stop observer
/*    MutationObserver
    ? that.observer && that.observer.disconnect()
    : clearInterval(that.resizeTimer);*/

    that.resizeTimer && clearInterval(that.resizeTimer);
}


// jQuery plugin wraper
$.fn.extend({
    /**
     * plugin
     * 
     * @param {Object} argument comment
     */
    scrollable: function(args) {
        return this.each(function() {
            return new scroll(this, args);
        });
    }
});

}(window, document);