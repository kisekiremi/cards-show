/**
 * Created by Moudi on 2017/1/11.
 */
//TODO: 使用class代替js直接操作css
var cm = {
    reset: function () {
        for (var i = 0; i < cs.length; i++) {
            var obj = cs[i];
            obj.style.transition = '500ms';
            obj.style.transform = 'none';
            obj.style.transformOrigin = '50% 90%';
            ~function (obj) {
                setTimeout(function () {
                    obj.style.transition = '';
                }, 1000);
            }(obj)
        }
        return true;
    },
    transform2d: function (s) {
        s = s || cm.defaultSettings;
        for (var i = 0; i < cs.length; i++) {
            var obj = cs[i];
            obj.style.transition = '500ms';
            var centerCs = Math.floor(cs.length/2);
            var rotateZ = s.center ? (i <= centerCs ? (centerCs - i) * - (s.range/2)/centerCs : (i - centerCs) * (s.range/2)/centerCs) : (s.range/cs.length) * i;
            var translateX = s.translate || 0;
            if (s.direction == 'left') {
                rotateZ = -rotateZ;
                translateX = -translateX;
            }
            translateX = s.center ? (i <= centerCs ? (centerCs - i) * - (translateX/2)/centerCs : (i - centerCs) * (translateX/2)/centerCs) : translateX/cs.length * i;
            obj.style.transition = s.speed + 'ms ' + s.easing + 'translate rotate';
            obj.style.transform = 'rotateZ(' + rotateZ + 'deg) translate(' + translateX + 'px)';
            obj.style.transformOrigin = s.origin.x + '% ' + s.origin.y + '%';
        }
    },
    defaultSettings: {
        speed: 500,
        easing : 'ease-out',
        range : 10,
        translate: 300,
        direction : 'right',
        origin : { x : 50, y : 50 },
        center: false
    }
}