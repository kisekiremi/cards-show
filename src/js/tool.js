/**
@description: 获取样式封装
@augments:	name	需要获取元素的选择器  #box .qwe tag
			obj		获取obj下的元素  默认为document
*/
function $(name, obj) {
	obj = obj || document;
	if (name.charAt(0) == '.') {
		var arr = [];
		var eles = obj.getElementsByTagName('*');
		for (var i = 0; i < eles.length; i++) {
			var s = eles[i].className.split(' ');
			for (var j = 0; j < s.length; j++) {
			    if (s[j] == name.slice(1)) {
			    	arr.push(eles[i]);
			    }
			}
		}
		return arr;
		//return obj.getElementsByClassName(name.slice(1)); 兼容性有问题 最好获取tagName做处理
	}
	else if (name.charAt(0) == '#') {
		return obj.getElementById(name.slice(1)); 
	}
	else {
		return obj.getElementsByTagName(name);
	}
}
var mt = mt || {};

mt = {
    /**
     @description: 添加类名 classList
     @augments:	{obj		需要修改的对象}
     			{name	需要添加的类名}

     */
	addCN: function(obj, cName) {
        if (!obj.className) {
            obj.className = cName;
        } else {
            for (var i = 0; i < obj.className.split(' ').length; i++) {
                if (obj.className.split(' ')[i] == cName) {
                    return;
                }
            }
            obj.className += ' ' + cName;
        }
        return true;
	},
    /**
     @description: 删除类名
     @augments:	obj		需要修改的对象
     			name	需要删除的类名

     */
	removeCN: function(obj, cName) {
        if (!obj.className) {
            obj.className = cName;
        } else {
            for (var i = 0; i < obj.className.split(' ').length; i++) {
                if (obj.className.split(' ')[i] == cName) {
                    return;
                }
            }
            obj.className += ' ' + cName;
        }
        return true;
	},
    /**
     @description: 拖拽
     @augments:	{obj:需要拖拽的对象}
     */
    drag: function(obj) {
    	obj.onmousedown = function(ev) {
    		obj.style.transition = '';//test
    	    var ev = ev || event;
    	    ev.preventDefault();
    	    var reL = ev.clientX - obj.getBoundingClientRect().left;
    	    var reT = ev.clientY - obj.getBoundingClientRect().top;
    	    var disL = obj.offsetParent.getBoundingClientRect().left;
    	    var disT = obj.offsetParent.getBoundingClientRect().top;
    	    document.onmousemove = function(ev) {
    	        var ev = ev || event;
    	        obj.style.left = ev.clientX - disL - reL + 'px';
                obj.style.top = ev.clientY - disT - reT + 'px';
    	    };
    	    document.onmouseup = function() {
                document.onmousemove = document.onmouseup = null;
    	    };
    	};
	},
	/**
	 @description: 碰撞检测
	 @augments:	{obj1, 拖动元素; obj2, 被碰撞元素}
	*/
	collisionDetection: function(obj1, obj2) {
		var pos1 = obj1.getBoundingClientRect();
		var pos2 = obj2.getBoundingClientRect();
		return pos1.right < pos2.left || pos1.bottom < pos2.top || pos1.left > pos2.right || pos1.top > pos2.bottom ? false : true;
	},
    /**
     @description: 鼠标滚轮事件
     @augments:	{obj, 绑定鼠标滚轮事件的对象; upFn, 向上滚动事件; downFn, 向下滚动事件；}
     */
	mouseWheel: function(obj, upFn, downFn) {
		if (obj.length) {
            obj.forEach(function (item) {
                item.onmousewheel = fn;
                item.addEventListener('DOMMouseScroll', fn);
            })
		}
		else {
            obj.onmousewheel = fn;
            obj.addEventListener('DOMMouseScroll', fn);
		}
		function fn(ev) {
			var isDown = null;
			if(ev.wheelDelta) {//chrome/IE
				isDown = ev.wheelDelta > 0 ? false : true;
			}
			else {//Firefox
				isDown = ev.detail > 0 ? true : false;
			}
			if (isDown) {//向下
				if (typeof downFn === "function") {
					downFn && downFn();
				}
            }
			else {//向上
                if (typeof upFn === "function") {
					upFn && upFn();
                }
			}
			ev.preventDefault();
		}
	}
};
function getAnimationend() {
    let div = document.createElement('div'),
        style = div.style,
        animationNames = ['animation', 'WebkitAnimation', 'OAnimation', 'msAnimation', 'MozAnimation'],
        animationName = (() => {
            for (let key of animationNames) {
                if (style[key] !== undefined) return key;
            }
            return false;
        })(),
        aniEndName = {
            animation: 'animationend',
            WebkitAnimation: 'webkitAnimationEnd',
            OAnimation: 'oAnimationEnd',
            msAnimation: 'MSAnimationEnd',
            MozAnimation: 'mozAnimationEnd'
        }[animationName];
    div = style = animationNames = animationName = null;
    return aniEndName;
}
function getTransitionend() {
    let div = document.createElement('div'),
        style = div.style,
        transitionNames = ['transition', 'WebkitTransition', 'OTransition', 'msTransition', 'MozTransition'],
        transitionName = (() => {
            for (let key of transitionNames) {
                if (style[key] !== undefined) return key;
            }
            return false;
        })(),
        traEndName = {
            transition: 'transitionend',
            WebkitTransition: 'webkitTransitionEnd',
            OTransition: 'oTransitionEnd',
            msTransition: 'MSTransitionEnd',
            MozTransition: 'mozTransitionEnd'
        }[transitionName];
    div = style = transitionNames = transitionName = null;
    return traEndName;
}
var objCtrl = {
    fadeOut(obj) {
        obj.classList.add('fade-out-animation');
        let callback = () => {
            obj.classList.remove('fade-out-animation');
            obj.style.display = 'none';
            obj.removeEventListener(getAnimationend(), callback);
            return;
        };
        obj.addEventListener(getAnimationend(), callback);
        return this;
    },
    fadeIn(obj) {
        obj.style.display = 'block';
        obj.classList.add('fade-in-animation');
        let callback = () => {
            obj.classList.remove('fade-in-animation');
            obj.style.display = 'block';
            obj.removeEventListener(getAnimationend(), callback);
            return;
        };
        obj.addEventListener(getAnimationend(), callback);
        return this;
    }
};