/**
 * Created by Moudi on 2017/1/11.
 */
var lastOrigin = '50% 90%',
    isSpread = false;
var cm = {
    reset(cbk) {
        $cardC = $('#card-container');
        $cs = $('li', $cardC);
        let count = 0;
        let cbkFu = () => {
            if (typeof cbk === 'function') cbk();
        };
        if (!isSpread) {
            cbkFu();
            return;
        }
        for (let i = 0; i < $cs.length; i++) {
            let obj = $cs[i];
            obj.style.transition = '500ms';
            obj.style.transform = 'none';
            obj.style.transformOrigin = lastOrigin;
            let callback = () => {
                obj.style.transition = 'none';
                isSpread = false;
                obj.removeEventListener(getTransitionend(), callback);
                count++;
                if (count == $cs.length) {
                    cbkFu();
                }
            };
            obj.addEventListener(getTransitionend(), callback);
        }
        return true;
    },
    transform2d(s) {
        s = s || this.defaultSettings;
        this.reset(function () {
            for (let i = 0; i < $cs.length; i++) {
                let obj = $cs[i];
                let centerCs = Math.floor($cs.length / 2);
                let rotateZ = s.center ? (i <= centerCs ? (centerCs - i) * - (s.range / 2) / centerCs : (i - centerCs) * (s.range / 2) / centerCs) : (s.range / $cs.length) * i + (s.range / $cs.length);
                let translateX = s.translate || 0;
                if (s.direction == 'left') {
                    rotateZ = -rotateZ;
                    translateX = -translateX;
                }
                translateX = s.center ? (i <= centerCs ? (centerCs - i) * -(translateX / 2) / centerCs : (i - centerCs) * (translateX / 2) / centerCs) : translateX / $cs.length * i;
                obj.style.transformOrigin = lastOrigin = s.origin.x + '% ' + s.origin.y + '%';
                obj.style.transition = s.speed + 'ms ' + s.easing + ' transform';
                obj.style.transform = 'translate(' + translateX + 'px) rotate(' + rotateZ + 'deg)';
                let callback = () => {
                    obj.style.transition = 'none';
                    isSpread = true;
                    obj.removeEventListener(getTransitionend(), callback);
                    return obj;
                };
                obj.addEventListener(getTransitionend(), callback);
            }
        });
    },
    defaultSettings: {
        speed: 500,
        easing: 'ease-out',
        range: 10,
        translate: 300,
        direction: 'right',
        origin: {x: 50, y: 90},
        center: false
    },
    right: {
        speed: 500,
        easing: 'ease-out',
        range: 90,
        direction: 'right',
        origin: {x: 50, y: 100},
        center: true,
        translate: 60
    },
    left: {
        speed: 500,
        easing: 'ease-out',
        range: 90,
        direction: 'left',
        origin: {x: 50, y: 100},
        center: true,
        translate: 60
    },
    horizontalSpread: {
        speed: 500,
        easing: 'ease-out',
        range: 100,
        direction: 'right',
        origin: {x: 50, y: 200},
        center: true
    },
    rightSpread: {
        speed: 500,
        easing: 'ease-out',
        range: 20,
        direction: 'right',
        origin: {x: 50, y: 200},
        center: false,
        translate: 300
    },
    leftSpread: {
        speed: 500,
        easing: 'ease-out',
        range: 20,
        direction: 'left',
        origin: {x: 50, y: 200},
        center: false,
        translate: 300
    },
    rotate360: {
        speed: 500,
        easing: 'ease-out',
        range: 360,
        direction: 'left',
        origin: {x: 50, y: 90},
        center: false
    },
    rotate330: {
        speed: 500,
        easing: 'ease-out',
        range: 330,
        direction: 'left',
        origin: {x: 50, y: 100},
        center: true
    }
};