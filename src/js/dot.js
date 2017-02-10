"use strict";
var dots = [],
    canvas = null,
    ctx = null,
    W = null,
    H = null,
    options = {
        cW: window.innerWidth,
        cH: window.innerHeight,
        numDot: 100,
        radDot: 3,
        dotColor: "rgba(255, 255, 255, .7)",
        lineDist: 70,
        lineColor: ["rgba(255, 255, 255, .4)", "rgba(246, 170, 207, .4)", "rgba(246, 71, 82, .4)"],
        vxRange: 1,
        vyRange: 1
    };

class Practicle {
    constructor(color, radius) {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.radius = radius;
        this.color = color;
        this.lineCount = 0;
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
    move() {
        this.x += this.vx;
        this.y += this.vy;

        //碰撞检测
        if (this.x + this.radius > W) {
            this.x = W - this.radius;
            this.vx *= -1;
        } else if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.vx *= -1;
        }
        if (this.y + this.radius > H) {
            this.y = H - this.radius;
            this.vy *= -1;
        } else if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.vy *= -1;
        }
    }
    drawLine(otherDot) {
        var dx = otherDot.x - this.x,
            dy = otherDot.y - this.y,
            dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < options.lineDist) {
            ctx.save();
            ctx.strokeStyle = options.lineColor[1];
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(otherDot.x, otherDot.y);
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        }
    }
}

var ctxCtrl = {
    init(selector) {
        canvas = document.getElementById(selector),
            ctx = canvas.getContext('2d');
        W = options.cW;
        H = options.cH;
        canvas.width = options.cW;
        canvas.height = options.cH;
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return setTimeout(callback, 20);
            });
        }
        this.initDots();
        this.update();
    },
    initDots() {
        for (let i = 0; i < options.numDot; i++) {
            let oDot = new Practicle(options.dotColor, options.radDot);
            oDot.x = parseInt(Math.random() * W.toFixed(1));
            oDot.y = parseInt(Math.random() * H.toFixed(1));
            oDot.vx = Math.random() * (options.vxRange) - options.vxRange / 2;
            oDot.vy = Math.random() * (options.vyRange) - options.vyRange / 2;
            dots.push(oDot);
        }
    },
    update() {
        ctx.clearRect(0, 0, W, H);
        dots.forEach(function (item) {
            item.move();
            item.draw(ctx);
        });
        for (var i = 0; i < options.numDot - 1; i++) {
            let oDotA = dots[i];
            for (var j = i + 1; j < options.numDot; j++) {
                let oDotB = dots[j];
                oDotA.drawLine(oDotB);
            }
        }
        window.requestAnimationFrame(ctxCtrl.update);
    }
};
window.onresize = function () {
    canvas.width = W = window.innerWidth;
    canvas.height = H = window.innerHeight;
}