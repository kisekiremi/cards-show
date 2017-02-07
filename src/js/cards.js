/**
 * Created by Moudi on 2017/1/6.
 */
"use strict";
var $cardC = $('#card-container'),
    $cs = $('li', $cardC);
class Card {
    constructor(obj) {
        for (var k in obj) {
            this[k] = obj[k];
        }
        this.isDead = false;
        this.isNew = false;
    }
    attackP(obj) {
        console.log(obj.name + '受到' + this.name + '的攻击');
        let randomSeed = Math.random();
        let newHealth = obj.health - (this.attack * (randomSeed < this.CRI ? this.CS : 1)) * (1 - (obj.defense / (400 + obj.defense)));

        obj.health = Math.round(newHealth);
        if (obj.health <= 0) {
            obj.health = 0;
            obj.isDead = true;
        }
        return (randomSeed < this.CRI ? '暴击！' : 'ok');
    }
}

//全局变量区
let vm = null,
    testC = [];

init();
function init() {
    initVue();
    initEvent();
    // setTimeout(function() { //暂时模拟
        objCtrl.fadeOut($('.loader')[0]);
    // }, 1000)
}
function initVue() {
    for (let i = 0; i < 17; i++) {
        testC.push(new Card(cardsData[Math.floor(Math.random()*10)]));
    }
    vm = new Vue({
        el: '#card-container',
        data: {
            list: testC,
            stat: 0
        }
    });
}
function initEvent() {
    let $goBack = $('#return-main-nav'),
        $nav = $('nav')[0],
        $mainNav = $('.main-nav')[0],
        $lis = $('li', $mainNav);
    for (let i = 0; i < $lis.length; i++) {
        $lis[i].index = i;
    }
    $mainNav.addEventListener('click', function (ev) {
        if (ev.target.nodeName == 'A') {
            for (let i = 0; i < $lis.length; i++) {
                $lis[i].classList.remove('active');
            }
            ev.target.parentNode.classList.add('active');
            vm.stat = ev.target.parentNode.index;
            objCtrl.moveOut($nav);
            objCtrl.fadeIn($goBack);
        }
    });
    $goBack.onclick = function () {
        objCtrl.fadeOut(this);
        objCtrl.moveIn($nav);
    };
    $cardC.addEventListener('click', function (ev) {
        ev.stopPropagation();
        if (isSpread) {
            cm.reset();
        }
        else {
            cm.transform2d(cm.right);
        }
    }, false)
}