/**
 * @description: JS Movement.
 * @author Reddy.Huang,i@0u0b.com.
 * @version 	0.3.4
 * 
 * 2016/12/2	Created original version.
 * 2016/12/5	Support opacity.
 * 2016/12/7	Support multiple attributes.
 * 				Support multiple move ways.
 * 				Add shake function.
 * 2016/12/9	Fix some bugs in lMove function.
 * */

/**
@description: 定时线性移动
@augments:	obj 需要移动的元素
			attr 需要改变的样式 键值对 的形式  eg.{left: 200, top: 300}
			duration 定时时间
			endFn 回调函数
*/
function lMove(obj, attrs, duration, fx, endFn) {
	var j = {};
	var oldTime = new Date().getTime();
	if(typeof fx == 'function') {
		endFn = fx;
		fx = 'linear';
	}
	else {
		fx = fx || 'linear';
	}
	for(var attr in attrs) {
		j[attr] = {};
		j[attr].startS = parseFloat(getComputedStyle(obj)[attr]);
		j[attr].move = attrs[attr] - j[attr].startS;
	}
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var kkkTime = new Date().getTime() - oldTime;
		if (kkkTime >= duration) {
			kkkTime = duration;
		}
		for(var attr in j) {
			var now = parseFloat(getComputedStyle(obj)[attr]);
			var v = Tween[fx](kkkTime, j[attr].startS, j[attr].move, duration)
			if(attr == 'opacity') {
				obj.style[attr] = v;
			} else {
				obj.style[attr] = v + 'px';
			}
		}
		if (kkkTime >= duration) {
			clearInterval(obj.timer);
			if(typeof endFn == 'function') {
				endFn && endFn();
			}
		}
	}, 20)
}
/*
t: 已运动时间（ 需要计算）
b: 起始位置（ 直接获取）
c: 要运动距离（ 需要计算）
d: 运动时间(传入)
*/
var Tween = {
	linear: function(t, b, c, d) { //匀速
		return c * t / d + b;
	},
	easeIn: function(t, b, c, d) { //加速曲线
		return c * (t /= d) * t + b;
	},
	easeOut: function(t, b, c, d) { //减速曲线
		return -c * (t /= d) * (t - 2) + b;
	},
	easeBoth: function(t, b, c, d) { //加速减速曲线
		if((t /= d / 2) < 1) {
			return c / 2 * t * t + b;
		}
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d) { //加加速曲线
		return c * (t /= d) * t * t * t + b;
	},
	easeOutStrong: function(t, b, c, d) { //减减速曲线
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d) { //加加速减减速曲线
		if((t /= d / 2) < 1) {
			return c / 2 * t * t * t * t + b;
		}
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p) { //正弦衰减曲线（弹动渐入）
		if(t === 0) {
			return b;
		}
		if((t /= d) == 1) {
			return b + c;
		}
		if(!p) {
			p = d * 0.3;
		}
		if(!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},
	elasticOut: function(t, b, c, d, a, p) { //正弦增强曲线（弹动渐出）
		if(t === 0) {
			return b;
		}
		if((t /= d) == 1) {
			return b + c;
		}
		if(!p) {
			p = d * 0.3;
		}
		if(!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	},
	elasticBoth: function(t, b, c, d, a, p) {
		if(t === 0) {
			return b;
		}
		if((t /= d / 2) == 2) {
			return b + c;
		}
		if(!p) {
			p = d * (0.3 * 1.5);
		}
		if(!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		if(t < 1) {
			return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
				Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		}
		return a * Math.pow(2, -10 * (t -= 1)) *
			Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
	},
	backIn: function(t, b, c, d, s) { //回退加速（回退渐入）
		if(typeof s == 'undefined') {
			s = 1.70158;
		}
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},
	backOut: function(t, b, c, d, s) {
		if(typeof s == 'undefined') {
			s = 3.70158; //回缩的距离
		}
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	backBoth: function(t, b, c, d, s) {
		if(typeof s == 'undefined') {
			s = 1.70158;
		}
		if((t /= d / 2) < 1) {
			return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		}
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d) { //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d - t, 0, c, d) + b;
	},
	bounceOut: function(t, b, c, d) {
		if((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		} else if(t < (2 / 2.75)) {
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
		} else if(t < (2.5 / 2.75)) {
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
		}
		return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
	},
	bounceBoth: function(t, b, c, d) {
		if(t < d / 2) {
			return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
	}
};

/**
 * @description: 抖动函数
 * @augments:	obj 需要抖动的元素
 * 				attr 抖动属性值 
 * 				endFn 回调函数
 * */
function shake(obj,attr,endFn){
    var arr=[];
    var timer=null;
    var n=0;
    if(!obj.num){
        obj.num=parseFloat(getComputedStyle(obj)[attr]);
    }
    //拿到一组数字，抖动的幅度。
    for(var i=20;i>0;i-=2){
        arr.push(i,-i);
    }
    arr.push(0);
    //用定时器来实现抖动效果。
    clearInterval(timer);
    timer=setInterval(function(){
        n++;
        if(n>arr.length-1){
            clearInterval(timer);
            endFn&&endFn();
        }
        obj.style[attr]=arr[n]+obj.num+'px';
    },30);
}


/** 
@description: 圆形移动
@augments:	obj 需要移动的元素
 			r	圆形半径
 			x,y	偏移
 			spd	旋转速度
*/
function cycloidMove(obj, r, x, y, speed) {
	var deg = 0;
	clearInterval(timer);
	var timer = setInterval(function() {
		obj.style.left = r * Math.cos(Math.PI / 180 * deg) + x + 'px';
		obj.style.top = r * Math.sin(Math.PI / 180 * deg) + y + 'px';
		deg += Math.floor(Math.random() * speed + 3);
	}, 20)
}