/**
 @description: 获取样式封装
 @augments:    name    需要获取元素的选择器  #box .qwe tag
 obj        获取obj下的元素  默认为document
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
     @augments:    {obj		需要修改的对象}
     {name	需要添加的类名}

     */
    addCN: function (obj, cName) {
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
     @augments:    obj        需要修改的对象
     name    需要删除的类名

     */
    removeCN: function (obj, cName) {
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
     @augments:    {obj:需要拖拽的对象}
     */
    drag: function (obj) {
        obj.onmousedown = function (ev) {
            obj.style.transition = '';//test
            var ev = ev || event;
            ev.preventDefault();
            var reL = ev.clientX - obj.getBoundingClientRect().left;
            var reT = ev.clientY - obj.getBoundingClientRect().top;
            var disL = obj.offsetParent.getBoundingClientRect().left;
            var disT = obj.offsetParent.getBoundingClientRect().top;
            document.onmousemove = function (ev) {
                var ev = ev || event;
                obj.style.left = ev.clientX - disL - reL + 'px';
                obj.style.top = ev.clientY - disT - reT + 'px';
            };
            document.onmouseup = function () {
                document.onmousemove = document.onmouseup = null;
            };
        };
    },
    /**
     @description: 碰撞检测
     @augments:    {obj1, 拖动元素; obj2, 被碰撞元素}
     */
    collisionDetection: function (obj1, obj2) {
        var pos1 = obj1.getBoundingClientRect();
        var pos2 = obj2.getBoundingClientRect();
        return pos1.right < pos2.left || pos1.bottom < pos2.top || pos1.left > pos2.right || pos1.top > pos2.bottom ? false : true;
    },
    /**
     @description: 鼠标滚轮事件
     @augments:    {obj, 绑定鼠标滚轮事件的对象; upFn, 向上滚动事件; downFn, 向下滚动事件；}
     */
    mouseWheel: function (obj, upFn, downFn) {
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
            if (ev.wheelDelta) {//chrome/IE
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
    fadeOut(obj, cbk) {
        obj.classList.add('fade-out-animation');
        let callback = () => {
            obj.classList.remove('fade-out-animation');
            obj.style.display = 'none';
            obj.removeEventListener(getAnimationend(), callback);
            if (typeof cbk === 'function') cbk();
            return;
        };
        obj.addEventListener(getAnimationend(), callback);
        return obj;
    },
    fadeIn(obj, cbk, isFlex) {
        if (isFlex) obj.style.display = 'flex';
        else obj.style.display = 'block';
        obj.classList.add('fade-in-animation');
        let callback = () => {
            obj.classList.remove('fade-in-animation');
            if (isFlex) obj.style.display = 'flex';
            else obj.style.display = 'block';
            obj.removeEventListener(getAnimationend(), callback);
            if (typeof cbk === 'function') cbk();
            return;
        };
        obj.addEventListener(getAnimationend(), callback);
        return obj;
    },
    moveOut(obj) {
        obj.style.left = -window.innerWidth / 5 + 'px';
        obj.style.flex = 0;
        obj.classList.add('fade-out-animation');
        let callback = () => {
            obj.classList.add('hidden');
            obj.classList.remove('fade-out-animation');
            obj.style.left = -window.innerWidth / 5 + 'px';
            obj.style.flex = 0;
            obj.removeEventListener(getAnimationend(), callback);
            return;
        };
        obj.addEventListener(getAnimationend(), callback);
        return obj;
    },
    moveIn(obj) {
        obj.classList.remove('hidden');
        obj.classList.add('fade-in-animation');
        let callback = () => {
            obj.classList.remove('fade-in-animation');
            obj.style.left = 0;
            obj.style.display = 'flex';
            obj.style.flex = 1;
            obj.removeEventListener(getAnimationend(), callback);
            return;
        };
        obj.addEventListener(getAnimationend(), callback);
        return obj;
    },
    addCard(obj) {
        obj.classList.add('add-animation');
        let callback = () => {
            obj.classList.remove('add-animation');
            obj.removeEventListener(getAnimationend(), callback);
            return;
        };
        obj.addEventListener(getAnimationend(), callback);
        return obj;
    }
};

/**
 * @description: 抖动函数
 * @augments:    obj 需要抖动的元素
 *                attr 抖动属性值
 *                endFn 回调函数
 * */
function shake(obj, attr, endFn) {
    var arr = [];
    var timer = null;
    var n = 0;
    if (!obj.num) {
        obj.num = parseFloat(getComputedStyle(obj)[attr]);
    }
    //拿到一组数字，抖动的幅度。
    for (var i = 20; i > 0; i -= 2) {
        arr.push(i, -i);
    }
    arr.push(0);
    //用定时器来实现抖动效果。
    clearInterval(timer);
    timer = setInterval(function () {
        n++;
        if (n > arr.length - 1) {
            clearInterval(timer);
            endFn && endFn();
        }
        obj.style[attr] = arr[n] + obj.num + 'px';
    }, 30);
}