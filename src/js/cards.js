/**
 * Created by Moudi on 2017/1/6.
 */
"use strict";
var $cardC = $('#card-container'),
    $cs = $('li', $cardC);
class Card {
    constructor(obj) {

    }
}

class GameCard {
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
        testC.push(new GameCard(cardsData[Math.floor(Math.random() * 10)]));
    }
    vm = new Vue({
        el: '#card-container',
        data: {
            list: testC,
            stat: 0
        },
        methods: {
            spread() {
                if (isSpread) cm.reset();
                else cm.transform2d(cm.right);
            }
        },
        watch: {
            list() {
                setTimeout(function () {
                    $cardC = $('#card-container');
                    $cs = $('li', $cardC);
                    if ($cs.length == 0) return;
                    objCtrl.addCard($cs[$cs.length - 1]);
                }, 0)
            },
            stat() {
                //TODO: 完成stat值切换
                switch (this.stat) {
                    case 1:
                        objCtrl.fadeOut($('#game-table-1'), function () {
                            $('#section1').style.display = 'flex';
                        });
                        cm.reset(function () {
                            testC.splice(0, testC.length);//vue.js 中不能通过 = [] 更新视图 要使用这个方法清空
                            for (let i = 0; i < 10; i++) {
                                setTimeout(function () {
                                    testC.push(new GameCard(cardsData[Math.floor(Math.random() * 11)]));
                                }, i * 100 + 600)
                            }
                        });
                        break;
                    case 4:
                        objCtrl.fadeOut($('#section1'), function () {
                            $('#game-table-1').style.display = 'flex';
                        });
                        initCardGame();
                        break;
                }

            }
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
}
function initCardGame() {
    //TODO: 第二次进入时浏览器卡死
    flipGame.init();
}
var flipCount = {
    count: 0,
    obj: [],
    canFlip: true
};
var flipGame = {
    MAX_CARD: 18,
    MAX_CARD_LINE: 6,
    _imgArr: [],
    init() {
        this._setArr();
        let $gt = $('#gt');
        for (let i = 0; i < this.MAX_CARD; i++) {
            setTimeout ( () => {
                let li = document.createElement('li');
                let frontD = document.createElement('div');
                let backD = document.createElement('div');
                frontD.className = 'front';
                frontD.style.backgroundImage = 'url(./src/img/game/' + this._imgArr[i] + '.png)';
                backD.className = 'back';
                li.appendChild(frontD);
                li.appendChild(backD);
                li.style.top = Math.floor(i / this.MAX_CARD_LINE) * 140 + 'px';
                li.style.left = i % this.MAX_CARD_LINE * 100 + 'px';
                li.gameData = this._imgArr[i];
                li.isFlip = false;
                li.onclick = function () {
                    if (!flipCount.canFlip || this.isFlip) return;
                    console.log(flipCount);
                    flipCount.count++;
                    flipCount.obj.push(this);
                    this.classList.add('flipped');
                    li.isFlip = true;
                    if (flipCount.count == 2) {
                        if (flipCount.obj[0].gameData === flipCount.obj[1].gameData) {
                            for (let j = 0; j < flipCount.obj.length; j++) {
                                flipCount.obj[j].classList.add('right');
                            }
                            flipCount.count = 0;
                            flipCount.obj = [];
                        }
                        else {
                            flipCount.canFlip = false;
                            setTimeout(function () {
                                for (let j = 0; j < flipCount.obj.length; j++) {
                                    flipCount.obj[j].classList.remove('flipped');
                                    flipCount.obj[j].isFlip = false;
                                }
                                flipCount.canFlip = true;
                                flipCount.count = 0;
                                flipCount.obj = [];
                            }, 600)
                        }

                    }
                };
                $gt.appendChild(li);
                objCtrl.fadeIn($('li', $gt)[$('li', $gt).length - 1]);
            }, 100 * i + 600)
        }
    },
    _setArr() {
        let MAX_CP = this.MAX_CARD / 2;
        for (var i = 0; i < MAX_CP; i++) {
            let randomS = Math.floor(Math.random() * 10 + 1)
            if (this._imgArr.indexOf(randomS) == -1) {
                this._imgArr.push(randomS);
            }
            else {
                i--;
            }
        }
        this._imgArr = this._imgArr.concat(this._imgArr);
        this._imgArr.sort(function () {
            return Math.random() - .5;
        });
        return this._imgArr;
    }
};
function aaaaa() {
    cm.reset(function () {
        for (let i = 0; i < 10; i++) {
            setTimeout(function () {
                testC.push(new GameCard(cardsData[Math.floor(Math.random() * 10)]));
            }, i * 100 + 600)
        }
    });
}