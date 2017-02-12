/**
 * Created by Moudi on 2017/1/6.
 */
"use strict";
class GameCard {
    constructor(obj) {
        for (let k in obj) {
            this[k] = obj[k];
        }
        this.isDead = false;
        this.isNew = false;
    }

    attackP(obj, ele) {
        let randomSeed = Math.random();
        let att = this.attack * (randomSeed < this.CRI ? this.CS : 1);
        let newHealth = obj.health - att * (1 - (obj.defense / (400 + obj.defense)));
        notice('<span class="name">' + obj.name + '</span>' + '受到' + '<span class="name">' + this.name + '</span>' + '的攻击,造成' + att + '点伤害');
        obj.health = Math.round(newHealth);
        if (obj.health <= 0) {
            obj.health = 0;
            obj.isDead = true;
            notice('<span class="name">' + obj.name + '</span>' + '已经阵亡。');
        }
        shake(ele, 'left');
        return (randomSeed < this.CRI ? '暴击！' : 'ok');
    }
}

//全局变量区
let $cardC = $('#card-container'),
    $cs = $('li', $cardC);
let vm = null,
    showArr = [],
    gachaArr = [],
    attackerArr = [],
    defenderArr = [],
    showN = 0,
    s2Vm = null,
    g0Vm = null,
    lastSection = $('#section0');
let flipCount = {
    count: 0,
    obj: [],
    canFlip: true
};
let probability = {
        r: .6,
        sr: .3,
        ssr: .1
    },//r sr ssr
    rArr = [[], [], []];
let $attackers, $defenders,
    defen = [],
    attac = [];

window.onload = init;
function init() {
    $('#section0').style.display = 'flex';
    ctxCtrl.init('dot');
    initVue();
    initEvent();
    initData();
    setTimeout(function() {
        objCtrl.fadeOut($('.loader')[0]);
    }, 500)
}
function initVue() {
    vm = new Vue({
        el: '#card-container',
        data: {
            list: showArr,
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
            }
        }
    });
    s2Vm = new Vue({
        el: '#s2',
        data: {
            list: gachaArr
        }
    });
    g0Vm = new Vue({
        el: '#game-table-0',
        data: {
            aList: attackerArr,
            dList: defenderArr
        },
        watch: {
            aList() {
                // if ($attackers.length < 3) return;
                objCtrl.fadeIn($('.attacker-wrapper')[0]);
                objCtrl.fadeIn($('.defender-wrapper')[0]);
            }
        }
    })
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
            statSwitch(ev.target.parentNode.index);
            objCtrl.moveOut($nav);
            objCtrl.fadeIn($goBack);
        }
    });
    $goBack.onclick = function () {
        objCtrl.fadeOut(this);
        objCtrl.moveIn($nav);
    };
}
function initData() {
    for (let obj of cardsData) {
        if (obj.rarity.r) {
            rArr[0].push(obj);
        }
        else if (obj.rarity.sr) {
            rArr[1].push(obj);
        }
        else if (obj.rarity.ssr) {
            rArr[2].push(obj);
        }
    }
}
function statSwitch(stat) {
    switch (stat) {
        case 0:
            objCtrl.fadeOut(lastSection, function () {
                reset();
                $('#section0').style.display = 'flex';
                lastSection = $('#section0');
                changeBackground(3, function () {
                    $('#dot').style.background = 'linear-gradient(to bottom, #9cc2c9, #8468b8)';
                });
            });
            break;
        case 1:
            objCtrl.fadeOut(lastSection, function () {
                reset();
                $('#section1').style.display = 'flex';
                lastSection = $('#section1');
                changeBackground(0, function () {
                    for (let i = 0; i < 17; i++) {
                        setTimeout(function () {
                            showArr.push(new GameCard(cardsData[Math.floor(Math.random() * 16)]));
                        }, i * 150 + 600)
                    }
                });
            });
            break;
        case 2:
            objCtrl.fadeOut(lastSection, function () {
                reset();
                $('#section2').style.display = 'flex';
                lastSection = $('#section2');
                changeBackground(1, function () {
                    $('#section2').classList.add('ready');
                    let arrow = $('img', $('.touch')[0])[1];

                    function callback() {
                        $('#section2').classList.add('ready-1');
                        arrow.removeEventListener(getAnimationend(), callback);
                        initS2Event();
                    }

                    arrow.addEventListener(getAnimationend(), callback);
                });
            });
            break;
        case 3:
            objCtrl.fadeOut(lastSection, function () {
                reset();
                $('#game-table-0').style.display = 'flex';
                lastSection = $('#game-table-0');
                changeBackground(3, function () {
                    initG0Event();
                });
            });
            break;
        case 4:
            objCtrl.fadeOut(lastSection, function () {
                reset();
                $('#game-table-1').style.display = 'flex';
                lastSection = $('#game-table-1');
                changeBackground(2, function () {
                    flipGame.init();
                });
            });
            break;
    }
}
let flipGame = {
    MAX_CARD: 18,
    MAX_CARD_LINE: 6,
    _imgArr: [],
    init() {
        this._setArr();
        let $gt = $('#gt');
        $gt.innerHTML = '';
        for (let i = 0; i < this.MAX_CARD; i++) {
            setTimeout(() => {
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
            }, 100 * i)
        }
    },
    _setArr() {
        this._imgArr = [];
        let MAX_CP = this.MAX_CARD / 2;
        for (let i = 0; i < MAX_CP; i++) {
            let randomS = Math.floor(Math.random() * 22 + 1)
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
function initS2Event() {
    let isMoving = false;
    gacha(gachaArr, 5);
    let $book = $('.book')[0],
        $showCards = $('.wrapper', $('#s2')),
        $shadows = $('.shadow', $('#s2'));
    $book.onclick = function () {
        $showCards = $('.wrapper', $('#s2'));
        $shadows = $('.shadow', $('#s2'));
        init3dCard($showCards, $shadows);
        $('#section2').classList.add('gacha');
        $('.background')[0].children[1].classList.add('brightness');
        let arrow = $('img', $('.touch')[0])[1];
        let callback = function () {
            $('#s2').style.display = 'block';
            $('.touch')[0].style.display = 'none';
            arrow.removeEventListener(getAnimationend(), callback);
            showCard(showN);
            document.onclick = function (ev) {
                ev.preventDefault();
                showN++;
                if (showN >= $showCards.length) {
                    let obj = $showCards[$showCards.length - 1];
                    obj.classList.remove('show-card');
                    obj.classList.add('fade-out-card');
                    obj.isShow = false;
                    let callback = function () {
                        obj.style.display = '';
                        obj.classList.remove('fade-out-card');
                        obj.removeEventListener(getAnimationend(), callback);
                        showCardList();
                        document.onclick = null;
                        showN = 0;
                    };
                    obj.addEventListener(getAnimationend(), callback);
                    return;
                }
                showCard(showN);
            }
        };
        arrow.addEventListener(getAnimationend(), callback);
    };
    function showCard(no) {
        $showCards[no].isShow = true;
        isMoving = true;
        if (no == 0) {
            $showCards[no].classList.add('show-card');
            $showCards[no].style.display = 'block';
            let showEnd = function () {
                isMoving = false;
                $showCards[no].removeEventListener(getAnimationend(), showEnd);
            };
            $showCards[no].addEventListener(getAnimationend(), showEnd);
            return;
        }
        let obj = $showCards[no - 1];
        if (obj.isShow) {
            obj.classList.remove('show-card');
            obj.classList.add('fade-out-card');
            obj.isShow = false;
            let callback = function () {
                obj.style.display = '';
                obj.classList.remove('fade-out-card');
                $showCards[no].classList.add('show-card');
                $showCards[no].style.display = 'block';
                let showEnd = function () {
                    isMoving = false;
                    $showCards[no].removeEventListener(getAnimationend(), showEnd);
                };
                $showCards[no].addEventListener(getAnimationend(), showEnd);
                obj.removeEventListener(getAnimationend(), callback);
            };
            obj.addEventListener(getAnimationend(), callback);
        }
    }

    function showCardList() {
        for (let i = 0; i < $showCards.length; i++) {
            let obj = $showCards[i];
            obj.style.left = -110 * ($showCards.length / 2 - i) + 50 + '%';
            setTimeout(function () {
                objCtrl.fadeIn(obj);
            }, 100 * i)
        }
    }

    //卡牌3d效果
    function init3dCard($showCards) {
        for (let i = 0; i < $showCards.length; i++) {
            let obj = $showCards[i];
            let shadow = $shadows[i];
            obj.addEventListener('mouseenter', function (ev) {
                if (isMoving) return;
                ev.stopPropagation();
                let moveFn = function (ev) {
                    ev.stopPropagation();
                    let reP = {
                        x: ev.clientX - obj.getBoundingClientRect().left,
                        y: ev.clientY - obj.getBoundingClientRect().top
                    };
                    let rotateY = (obj.clientWidth / 2 - reP.x) / (obj.clientWidth / 2) * 20;
                    let rotateX = (reP.y - obj.clientHeight / 2) / (obj.clientHeight / 2) * 20;
                    let angle = Math.atan2(-(reP.x - obj.clientWidth / 2), -(obj.clientHeight / 2 - reP.y));
                    angle = angle * 180 / Math.PI;
                    if (rotateY > 20) rotateY = 20;
                    if (rotateX > 20) rotateX = 20;
                    obj.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.08, 1.08, 1.08)';
                    shadow.style.background = 'linear-gradient(' + angle + 'deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 80%)';
                };
                obj.addEventListener('mousemove', moveFn, true);
                let outFn = function () {
                    ev.stopPropagation();
                    obj.style.transform = 'none';
                    shadow.style.background = '';
                    obj.removeEventListener('mousemove', moveFn);
                    obj.removeEventListener('mouseout', outFn);
                };
                obj.addEventListener('mouseout', outFn, true);
            }, true);
        }
    }

}
function initG0Event() {
    document.onmousedown = function (ev) {
        ev.preventDefault();
    };
    $('#dot').style.background = 'linear-gradient(to bottom, rgb(167, 228, 239), rgb(245, 159, 167))';
    attackerArr.splice(0, attackerArr.length);
    defenderArr.splice(0, defenderArr.length);
    gacha(attackerArr, 3);
    gacha(defenderArr, 3);
    $attackers = $('li', $('.attacker')[0]);
    $defenders = $('li', $('.defender')[0]);
    notice('双击屏幕开始游戏');
    document.ondblclick = function () {
        notice('游戏开始');
        attackerRound(true);
        document.ondblclick = null;
    }
}
function changeBackground(no, cbk) {
    let $backgrounds = $('.background')[0].children;
    for (let i = 0; i < $backgrounds.length; i++) {
        if (i == no) continue;
        let obj = $backgrounds[i];
        obj.className = '';
        setTimeout(function () {
            obj.style.display = 'none';
        }, 1000)
    }
    $backgrounds[no].style.display = '';
    setTimeout(function () {
        $backgrounds[no].className = 'showIn';
        if (typeof cbk === 'function') cbk();
    }, 1000)
}
function reset() {
    let $showCards = $('.wrapper', $('#s2'));
    showArr.splice(0, showArr.length);
    $('#section2').className = '';
    $('#gt').innerHTML = '';
    $('.touch')[0].style.display = 'block';
    $('#s2').style.display = 'none';
    for (let i = 0; i < $showCards.length; i++) {
        let obj = $showCards[i];
        $showCards[i].classList.remove('show-card');
        obj.style.display = '';
    }
    showN = 0;
    gachaArr.splice(0, gachaArr.length);
    $('.attacker-wrapper')[0].style.display = '';
    $('.defender-wrapper')[0].style.display = '';
    $('.notice')[0].innerHTML = '';
}
function gacha(arr, num) {
    for (let i = 0; i < num; i++) {
        let randomSeed = Math.random();
        if (randomSeed >= (1 - probability.r)) {
            arr.push(new GameCard(rArr[0][Math.floor(Math.random() * rArr[0].length)]));
        }
        else if (randomSeed >= probability.ssr && randomSeed < probability.sr + probability.ssr) {
            arr.push(new GameCard(rArr[1][Math.floor(Math.random() * rArr[1].length)]));
    }
        else if (randomSeed < probability.ssr) {
            arr.push(new GameCard(rArr[2][Math.floor(Math.random() * rArr[2].length)]));
        }
    }
    return arr;
}
function attackerRound(onOff) {
    if (checkDead()) return;
    if (!onOff) {
        for (let i = 0; i < $attackers.length; i++) {
            $attackers[i].onmousedown = null;
        }
        setTimeout(function () {
            notice('敌方攻击回合');
            setTimeout(function () {
                defenderAi();
            }, 500)
        }, 500);

        return;
    }
    setTimeout(function () {
        notice('我方攻击回合');
    }, 500);
    let isMoving = false;
    for (let i = 0; i < $attackers.length; i++) {
        let obj = $attackers[i],
            attackObj = null;
        obj.index = i;
        obj.onmousedown = function (ev) {
            if (isMoving) return;
            if (attackerArr[obj.index].isDead) {
                return;
            }
            ev.preventDefault();
            let oldPos = obj.getBoundingClientRect(),
                oldOffsetPos = {
                    x: obj.offsetLeft,
                    y: obj.offsetTop
                },
                rePos = {
                    x: ev.clientX - oldPos.left - obj.offsetLeft,
                    y: ev.clientY - oldPos.top - obj.offsetTop
                };
            obj.classList.add('dragging');
            document.onmousemove = function (ev) {
                attackObj = null;
                let movePos = {
                        x: ev.clientX - oldPos.left,
                        y: ev.clientY - oldPos.top
                    },
                    left = movePos.x - rePos.x,
                    top = movePos.y - rePos.y;
                obj.style.left = left + 'px';
                obj.style.top = top + 'px';
                for (let j = 0; j < $defenders.length; j++) {
                    $defenders[j].index = j;
                }
                for (let j = 0; j < $defenders.length; j++) {
                    let obj1 = $defenders[j];
                    if (mt.mouseCollisionDetection(ev, obj1)) {
                        if (!defenderArr[obj1.index].isDead) {
                            obj1.classList.add('defense');
                        }
                    }
                    else {
                        obj1.classList.remove('defense');
                    }
                }
            };
            document.onmouseup = function (ev) {
                for (let j = 0; j < $defenders.length; j++) {
                    let obj1 = $defenders[j];
                    if (mt.mouseCollisionDetection(ev, obj1)) {
                        if (!defenderArr[obj1.index].isDead) {
                            attackObj = obj1;
                        }
                    }
                }
                if (attackObj) {
                    attackObj.classList.remove('defense');
                    attackerArr[obj.index].attackP(defenderArr[attackObj.index], attackObj);
                    attackerRound(false);
                    isMoving = true;
                    lMove(obj, {'left' : oldOffsetPos.x, 'top': oldOffsetPos.y}, 300, 'easeOut', function () {
                        isMoving = false;
                    });
                }
                else {
                    isMoving = true;
                    lMove(obj, {'left' : oldOffsetPos.x, 'top': oldOffsetPos.y}, 300, 'easeOut', function () {
                        isMoving = false;
                    });
                }
                obj.classList.remove('dragging');
                document.onmousemove = document.onmouseup = null;
            }
        }
    }
}
function notice(content) {
    let $notice = $('.notice')[0];
    let li = document.createElement('li');
    li.innerHTML = content;
    $notice.insertBefore(li, $notice.children[0]);
    $notice.children[0].classList.add('show');
}
function defenderAi() {
    let randomSeed1 = Math.floor(Math.random() * defen.length),
        randomSeed2 = Math.floor(Math.random() * attac.length),
        $d = $defenders[defen[randomSeed1].index],
        $a = $attackers[attac[randomSeed2].index],
        oldDoffsetPos = {
            x: $d.offsetLeft,
            y: $d.offsetTop
        },
        oldDPos = {
            x: $d.getBoundingClientRect().left,
            y: $d.getBoundingClientRect().top
        },
        aPos = {
            x: $a.getBoundingClientRect().left,
            y: $a.getBoundingClientRect().top
        };
    lMove($d, {'top': aPos.y - oldDPos.y + oldDoffsetPos.y, 'left': aPos.x - oldDPos.x + oldDoffsetPos.x}, 200, 'easeIn', function () {
        defen[randomSeed1].attackP(attac[randomSeed2], $a);
        lMove($d, {'top': oldDoffsetPos.y, 'left': oldDoffsetPos.x}, 200, 'easeOut');
        attackerRound(true);
    });
}
function checkDead() {
    attac = [];
    defen = [];
    for (let i = 0; i < attackerArr.length; i++) {
        let obj = attackerArr[i];
        let obj1 = defenderArr[i];
        obj.index = obj1.index = i;
        if (!obj.isDead) attac.push(obj);
        if (!obj1.isDead) defen.push(obj1);
    }
    if (attac.length == 0) {
        notice('游戏结束，防守方获胜！');
        return true;
    }
    if (defen.length == 0) {
        notice('游戏结束，攻击方获胜！');
        return true;
    }
    return false;
}