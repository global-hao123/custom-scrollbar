var $=window.jQuery||window.require&&require("common:widget/ui/jquery/jquery.js");$&&function(WIN,DOC,undef){var supportCss3d="WebKitCSSMatrix"in WIN&&"m11"in new WebKitCSSMatrix,scroll=function(el,args){var that=this;that.el=el;that.$el=$(el);that.$parent=that.$el.parent();that.state={};that.args=$.extend({wheelSpeed:20,pressDelay:200,dir:"",autoHide:true,customClass:"",controller:{barX:"bar-x",barY:"bar-y",thumbX:"thumb-x",thumbY:"thumb-y"}},args);that.init()},fn=scroll.prototype;fn.init=function(){var that=this;that.initLayout();that.args.onInit&&that.args.onInit.call(that)};fn.updateSize=function(){var that=this,$el=that.$el,$parent=that.$parent,state=$.extend(that.state,{dir:that.args.dir==="ltr",autoHide:that.args.autoHide==1,H:$parent.height(),h:$el.outerHeight(),W:$parent.width(),w:$el.outerWidth(),x:0,y:0}),thumbSize=function(outer,inner){return Math.floor(Math.min(Math.pow(outer,2)/inner,outer))};that.state=$.extend(state,{offset_x:Math.max(state.w-state.W,0),offset_y:Math.max(state.h-state.H,0),_w:thumbSize(state.W,state.w),_h:thumbSize(state.H,state.h)})};fn.initLayout=function(){var that=this,$el=that.$el,$parent=that.$parent,$wrap=that.$wrap=$("<div>"),style={},state;that.args.dir=that.args.dir||function(el,dir){return el.currentStyle?el.currentStyle[dir]:WIN.getComputedStyle(el,null).getPropertyValue(dir)||"ltr"}(that.el,"direction");that.updateSize();$.map(that.args.controller,function(v,k){$wrap.append(that.state["$"+k]=$('<div class="mod-scroll_'+v+'"></div>'))});state=that.state;state.$thumbX.css({width:state._w+"px"});state.$thumbY.css({height:state._h+"px"});style[state.dir?"right":"left"]=0;state.$barY.css(style);state.$thumbY.css(style);style={};style[state.dir?"left":"right"]=0;state.$thumbX.css(style);if($parent.css("position")==="static")$parent.css({position:"relative"});if(state.autoHide){$wrap.css({display:"none"});$parent.on("mouseenter",function(){$wrap.css({display:"block"})}).on("mouseleave",function(){!state.draging&&$wrap.css({display:"none"})})}$parent.css({overflow:"hidden"}).append($wrap).on("mousewheel",function(e){e.preventDefault();that.wheelHandle.call($el,e,that)}).on("resize",function(e){});$wrap.addClass("mod-scroll "+that.args.customClass).on("mousedown",function(e){e.preventDefault();that.mouseHandle.call(e.target,e,that)})};fn.mouseHandle=function(e,that){var $target=$(this),state=that.state,axis="x",n=state.w,N=state.W,pos={x:0,y:0},$thumb=state.$thumbX,isPressing=!1,pressed=0,tmp,pressing=function(){var offset;state[axis]=that.fixPos(state[axis]+N*((axis==="y"?e.pageY-$target.offset().top>Math.max(parseFloat(state.$thumbY.css("marginTop")),state.$thumbY.position().top):e.pageX-$target.offset().left>Math.max(parseFloat(state.$thumbX.css("marginLeft")),state.$thumbX.position().left))?-1:1),axis);that.scrollTo(that.$el,{x:state.x,y:state.y});pos[axis]=Math.floor(-state[axis]*N/n);that.scrollTo($thumb,pos);offset=(axis==="x"?e.pageX-$target.offset().left:e.pageY-$target.offset().top)-pos[axis];offset=offset>0?offset>(axis==="x"?state._w:state._h):offset<0;that.args.onScroll&&that.args.onScroll.call(that);if(!offset){isPressing=!1;pressed=1;that.args.onEndPress&&that.args.onEndPress.call(that)}isPressing&&setTimeout(function(){isPressing&&pressing()},that.args.pressDelay)};if(this===state.$thumbY[0]||this===state.$barY[0]){axis="y";n=state.h;N=state.H;$thumb=state.$thumbY}if(this===state.$thumbX[0]||this===state.$thumbY[0]){tmp={x:e.pageX,y:e.pageY,h:Math.max(parseFloat($target.css("marginTop")),$target.position().top),w:Math.max(parseFloat($target.css("marginLeft")),$target.position().left)};if(!state.dir)tmp.w=tmp.w-state._w;state.draging=!0;$(DOC).on("mousemove.scroll",function(e){state[axis]=that.fixPos(-n*(axis==="y"?tmp.h+e.pageY-tmp.y:tmp.w+e.pageX-tmp.x)/N,axis);that.args.onStartDrag&&that.args.onStartDrag.call(that);that.scrollTo(that.$el,{x:state.x,y:state.y});pos[axis]=Math.floor(-state[axis]*N/n);that.scrollTo($thumb,pos);that.args.onScroll&&that.args.onScroll.call(that)})}else if(this===state.$barX[0]||this===state.$barY[0]){isPressing=!0;that.args.onStartPress&&that.args.onStartPress.call(that);pressing()}$(DOC).on("mouseup.scroll",function(){$(this).off("mousemove.scroll").off("mouseup.scroll");!pressed&&that.args.onEndPress&&that.args.onEndPress.call(that);isPressing=!1;state.draging=!1;that.args.onEndDrag&&that.args.onEndDrag.call(that)})};fn.wheelHandle=function(e,that){var state=that.state,$el=$(that.el),fixNum=function(axis){return that.state[axis]=that.fixPos(that.state[axis]+that.getDelta(e)[axis]*that.args.wheelSpeed,axis)};that.scrollTo(that.$el,{x:fixNum("x"),y:fixNum("y")});that.scrollTo(state.$thumbY,{x:0,y:Math.floor(-state.y*state.H/state.h)});that.scrollTo(state.$thumbX,{x:Math.floor(-state.x*state.W/state.w),y:0});that.args.onWheel&&that.args.onWheel.call(that);that.args.onScroll&&that.args.onScroll.call(that)};fn.fixPos=function(n,axis){var min=Math.min,max=Math.max,N=-this.state["offset_"+axis];if(!this.state.dir&&axis==="x"){min=Math.max;max=Math.min;N=-N}return Math.floor(max(min(n,0),N))};fn.scrollTo=supportCss3d?function($el,pos){$el.css({transform:"translate3d("+pos.x+"px,"+pos.y+"px, 0)"})}:function($el,pos){$el[0].style.margin=this.state.dir?pos.y+"px"+" auto auto "+pos.x+"px":pos.y+"px "+-pos.x+"px auto auto"};fn.getDelta=function(e){e=e.originalEvent||e;var delta={delta:0,x:0,y:0};delta.delta=e.wheelDelta!==undef?e.wheelDelta/120:-(e.detail||0)/3;if(e.axis)delta[e.axis===e.HORIZONTAL_AXIS?"x":"y"]=delta.delta;else if(e.wheelDeltaX!==undef){delta.x=e.wheelDeltaX/120;delta.y=e.wheelDeltaY/120}else delta.y=delta.delta;return delta};fn.destroy=function(){};$.fn.extend({scrollable:function(args){return this.each(function(){return new scroll(this,args)})}})}(window,document);