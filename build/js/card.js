/**
 * Created by Moudi on 2017/2/12.
 */
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameCard = function () {
    function GameCard(obj) {
        _classCallCheck(this, GameCard);

        for (var k in obj) {
            this[k] = obj[k];
        }
        this.isDead = false;
        this.isNew = false;
    }

    _createClass(GameCard, [{
        key: 'attackP',
        value: function attackP(obj, ele) {
            var randomSeed = Math.random();
            var att = parseInt(this.attack * (randomSeed < this.CRI ? this.CS : 1) * (1 - obj.defense / (400 + obj.defense)));
            var newHealth = obj.health - att;
            notice('<span class="name">' + obj.name + '</span>' + '受到' + '<span class="name">' + this.name + '</span>' + '的攻击,造成<span class="num">' + att + '</span>点伤害');
            obj.health = Math.round(newHealth);
            if (obj.health <= 0) {
                obj.health = 0;
                obj.isDead = true;
                notice('<span class="name">' + obj.name + '</span>' + '已经阵亡。');
            }
            shake(ele, 'left');
            return randomSeed < this.CRI ? '暴击！' : 'ok';
        }
    }]);

    return GameCard;
}();

//全局变量区


var $cardC = $('#card-container'),
    $cs = $('li', $cardC);
var vm = null,
    showArr = [],
    gachaArr = [],
    attackerArr = [],
    defenderArr = [],
    showN = 0,
    s2Vm = null,
    g0Vm = null,
    lastSection = $('#section0');
var flipCount = {
    count: 0,
    obj: [],
    canFlip: true
};
var probability = {
        r: .6,
        sr: .3,
        ssr: .1
    },
    //r sr ssr
    rArr = [[], [], []];
var $attackers = void 0,
    $defenders = void 0,
    defen = [],
    attac = [];

window.onload = init;
function init() {
    $('#section0').style.display = 'flex';
    ctxCtrl.init('dot');
    if (!document.cookie.split('=').some(function (item) {return item == 'isRead'})) {
        objCtrl.fadeIn($('.dialog-bg')[0]);
        objCtrl.fadeIn($('.dialog')[0]);
    }
    initVue();
    initEvent();
    initData();
    setTimeout(function () {
        objCtrl.fadeOut($('.loader')[0]);
    }, 500);
}
function initVue() {
    vm = new Vue({
        el: '#card-container',
        data: {
            list: showArr
        },
        methods: {
            spread: function spread() {
                if (isSpread) cm.reset();else cm.transform2d(cm.right);
            }
        },
        watch: {
            list: function list() {
                setTimeout(function () {
                    $cardC = $('#card-container');
                    $cs = $('li', $cardC);
                    if ($cs.length == 0) return;
                    objCtrl.addCard($cs[$cs.length - 1]);
                }, 0);
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
            aList: function aList() {
                // if ($attackers.length < 3) return;
                objCtrl.fadeIn($('.attacker-wrapper')[0]);
                objCtrl.fadeIn($('.defender-wrapper')[0]);
            }
        }
    });
}
function initEvent() {
    var $goBack = $('#return-main-nav'),
        $nav = $('nav')[0],
        $mainNav = $('.main-nav')[0],
        $lis = $('li', $mainNav);
    $('.btn1', $('.dialog')[0])[0].onclick = function () {
        document.cookie = 'isRead=true';
        objCtrl.fadeOut($('.dialog-bg')[0]);
        objCtrl.fadeOut($('.dialog')[0]);
    };
    for (var i = 0; i < $lis.length; i++) {
        $lis[i].index = i;
    }
    $mainNav.addEventListener('click', function (ev) {
        if (ev.target.nodeName == 'A') {
            for (var _i = 0; _i < $lis.length; _i++) {
                $lis[_i].classList.remove('active');
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
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = cardsData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var obj = _step.value;

            if (obj.rarity.r) {
                rArr[0].push(obj);
            } else if (obj.rarity.sr) {
                rArr[1].push(obj);
            } else if (obj.rarity.ssr) {
                rArr[2].push(obj);
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
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
                    initS1Event();
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
                    var arrow = $('img', $('.touch')[0])[1];

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
var flipGame = {
    MAX_CARD: 18,
    MAX_CARD_LINE: 6,
    _imgArr: [],
    init: function init() {
        var _this = this;

        this._setArr();
        var $gt = $('#gt');
        $gt.innerHTML = '';

        var _loop = function _loop(i) {
            setTimeout(function () {
                var li = document.createElement('li');
                var frontD = document.createElement('div');
                var backD = document.createElement('div');
                frontD.className = 'front';
                frontD.style.backgroundImage = 'url(./src/img/game/' + _this._imgArr[i] + '.png)';
                backD.className = 'back';
                li.appendChild(frontD);
                li.appendChild(backD);
                li.style.top = Math.floor(i / _this.MAX_CARD_LINE) * 140 + 'px';
                li.style.left = i % _this.MAX_CARD_LINE * 100 + 'px';
                li.gameData = _this._imgArr[i];
                li.isFlip = false;
                li.onclick = function () {
                    if (!flipCount.canFlip || this.isFlip) return;
                    flipCount.count++;
                    flipCount.obj.push(this);
                    this.classList.add('flipped');
                    li.isFlip = true;
                    if (flipCount.count == 2) {
                        if (flipCount.obj[0].gameData === flipCount.obj[1].gameData) {
                            for (var j = 0; j < flipCount.obj.length; j++) {
                                flipCount.obj[j].classList.add('right');
                            }
                            flipCount.count = 0;
                            flipCount.obj = [];
                        } else {
                            flipCount.canFlip = false;
                            setTimeout(function () {
                                for (var _j = 0; _j < flipCount.obj.length; _j++) {
                                    flipCount.obj[_j].classList.remove('flipped');
                                    flipCount.obj[_j].isFlip = false;
                                }
                                flipCount.canFlip = true;
                                flipCount.count = 0;
                                flipCount.obj = [];
                            }, 600);
                        }
                    }
                };
                $gt.appendChild(li);
                objCtrl.fadeIn($('li', $gt)[$('li', $gt).length - 1]);
            }, 100 * i);
        };

        for (var i = 0; i < this.MAX_CARD; i++) {
            _loop(i);
        }
    },
    _setArr: function _setArr() {
        this._imgArr = [];
        var MAX_CP = this.MAX_CARD / 2;
        for (var i = 0; i < MAX_CP; i++) {
            var randomS = Math.floor(Math.random() * 22 + 1);
            if (this._imgArr.indexOf(randomS) == -1) {
                this._imgArr.push(randomS);
            } else {
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
function initS1Event() {
    var $cNav = $('#click-navigation'),
        $addNum = $('.addNum', $cNav)[0],
        $btn = $('.btn', $cNav)[0];
    objCtrl.fadeIn($cNav);
    for (var i = 0; i < 17; i++) {
        setTimeout(function () {
            showArr.push(new GameCard(cardsData[Math.floor(Math.random() * cardsData.length)]));
        }, i * 150 + 600);
    }
    $btn.onclick = function () {
        var num = parseInt($addNum.value);
        if (isNaN(num)) {
            alert('请输入有效数字！');
        } else if (num > 100) {
            alert('输入数字过大！请检查');
        } else {
            cm.reset(function () {
                $addNum.value = '';
                for (var _i2 = 0; _i2 < num; _i2++) {
                    setTimeout(function () {
                        showArr.push(new GameCard(cardsData[Math.floor(Math.random() * cardsData.length)]));
                    }, _i2 * 150 + 600);
                }
            });
        }
    };
}
function initS2Event() {
    var isMoving = false;
    gacha(gachaArr, 5);
    var $book = $('.book')[0],
        $showCards = $('.wrapper', $('#s2')),
        $shadows = $('.shadow', $('#s2'));
    $book.onclick = function () {
        showN = 0;
        $showCards = $('.wrapper', $('#s2'));
        $shadows = $('.shadow', $('#s2'));
        init3dCard($showCards, $shadows);
        $('#section2').classList.add('gacha');
        $('.background')[0].children[1].classList.add('brightness');
        var arrow = $('img', $('.touch')[0])[1];
        var callback = function callback() {
            $('#s2').style.display = 'block';
            $('.touch')[0].style.display = 'none';
            arrow.removeEventListener(getAnimationend(), callback);
            showCard(showN);
            document.onclick = function (ev) {
                ev.preventDefault();
                showN++;
                if (showN >= $showCards.length) {
                    var _ret2 = function () {
                        var obj = $showCards[$showCards.length - 1];
                        obj.classList.remove('show-card');
                        obj.classList.add('fade-out-card');
                        obj.isShow = false;
                        var callback = function callback() {
                            obj.style.display = '';
                            obj.classList.remove('fade-out-card');
                            obj.removeEventListener(getAnimationend(), callback);
                            showCardList();
                            document.onclick = null;
                            showN = 0;
                        };
                        obj.addEventListener(getAnimationend(), callback);
                        return {
                            v: void 0
                        };
                    }();

                    if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
                }
                showCard(showN);
            };
        };
        arrow.addEventListener(getAnimationend(), callback);
    };
    function showCard(no) {
        $showCards[no].isShow = true;
        isMoving = true;
        if (no == 0) {
            var _ret3 = function () {
                $showCards[no].classList.add('show-card');
                $showCards[no].style.display = 'block';
                var showEnd = function showEnd() {
                    isMoving = false;
                    $showCards[no].removeEventListener(getAnimationend(), showEnd);
                };
                $showCards[no].addEventListener(getAnimationend(), showEnd);
                return {
                    v: void 0
                };
            }();

            if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
        }
        var obj = $showCards[no - 1];
        if (obj.isShow) {
            (function () {
                obj.classList.remove('show-card');
                obj.classList.add('fade-out-card');
                obj.isShow = false;
                var callback = function callback() {
                    obj.style.display = '';
                    obj.classList.remove('fade-out-card');
                    $showCards[no].classList.add('show-card');
                    $showCards[no].style.display = 'block';
                    var showEnd = function showEnd() {
                        isMoving = false;
                        $showCards[no].removeEventListener(getAnimationend(), showEnd);
                    };
                    $showCards[no].addEventListener(getAnimationend(), showEnd);
                    obj.removeEventListener(getAnimationend(), callback);
                };
                obj.addEventListener(getAnimationend(), callback);
            })();
        }
    }

    function showCardList() {
        var _loop2 = function _loop2(i) {
            var obj = $showCards[i];
            obj.style.left = -110 * ($showCards.length / 2 - i) + 50 + '%';
            setTimeout(function () {
                objCtrl.fadeIn(obj);
            }, 100 * i);
        };

        for (var i = 0; i < $showCards.length; i++) {
            _loop2(i);
        }
    }

    //卡牌3d效果
    function init3dCard($showCards) {
        var _loop3 = function _loop3(i) {
            var obj = $showCards[i];
            var shadow = $shadows[i];
            obj.addEventListener('mouseenter', function (ev) {
                if (isMoving) return;
                ev.stopPropagation();
                var moveFn = function moveFn(ev) {
                    ev.stopPropagation();
                    var reP = {
                        x: ev.clientX - obj.getBoundingClientRect().left,
                        y: ev.clientY - obj.getBoundingClientRect().top
                    };
                    var rotateY = (obj.clientWidth / 2 - reP.x) / (obj.clientWidth / 2) * 20;
                    var rotateX = (reP.y - obj.clientHeight / 2) / (obj.clientHeight / 2) * 20;
                    var angle = Math.atan2(-(reP.x - obj.clientWidth / 2), -(obj.clientHeight / 2 - reP.y));
                    angle = angle * 180 / Math.PI;
                    if (rotateY > 20) rotateY = 20;
                    if (rotateX > 20) rotateX = 20;
                    obj.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.08, 1.08, 1.08)';
                    shadow.style.background = 'linear-gradient(' + angle + 'deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 80%)';
                };
                obj.addEventListener('mousemove', moveFn, true);
                var outFn = function outFn() {
                    ev.stopPropagation();
                    obj.style.transform = 'none';
                    shadow.style.background = '';
                    obj.removeEventListener('mousemove', moveFn);
                    obj.removeEventListener('mouseout', outFn);
                };
                obj.addEventListener('mouseout', outFn, true);
            }, true);
        };

        for (var i = 0; i < $showCards.length; i++) {
            _loop3(i);
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
    };
}
function changeBackground(no, cbk) {
    var $backgrounds = $('.background')[0].children;

    var _loop4 = function _loop4(i) {
        if (i == no) return 'continue';
        var obj = $backgrounds[i];
        obj.className = '';
        setTimeout(function () {
            obj.style.display = 'none';
        }, 1000);
    };

    for (var i = 0; i < $backgrounds.length; i++) {
        var _ret7 = _loop4(i);

        if (_ret7 === 'continue') continue;
    }
    $backgrounds[no].style.display = '';
    setTimeout(function () {
        $backgrounds[no].className = 'showIn';
        if (typeof cbk === 'function') cbk();
    }, 1000);
}
function reset() {
    var $showCards = $('.wrapper', $('#s2'));
    showArr.splice(0, showArr.length);
    $('#section2').className = '';
    $('#gt').innerHTML = '';
    $('.touch')[0].style.display = 'block';
    $('#s2').style.display = 'none';
    $('#s2').innerHTML = '';
    document.onclick = null;
    for (var i = 0; i < $showCards.length; i++) {
        var _obj = $showCards[i];
        $showCards[i].classList.remove('show-card');
        _obj.style.display = '';
    }
    gachaArr.splice(0, gachaArr.length);
    $('.attacker-wrapper')[0].style.display = '';
    $('.defender-wrapper')[0].style.display = '';
    $('.notice')[0].innerHTML = '';
}
function gacha(arr, num) {
    for (var i = 0; i < num; i++) {
        var randomSeed = Math.random();
        if (randomSeed >= 1 - probability.r) {
            arr.push(new GameCard(rArr[0][Math.floor(Math.random() * rArr[0].length)]));
        } else if (randomSeed >= probability.ssr && randomSeed < probability.sr + probability.ssr) {
            arr.push(new GameCard(rArr[1][Math.floor(Math.random() * rArr[1].length)]));
        } else if (randomSeed < probability.ssr) {
            arr.push(new GameCard(rArr[2][Math.floor(Math.random() * rArr[2].length)]));
        }
    }
    return arr;
}
function attackerRound(onOff) {
    if (checkDead()) return;
    if (!onOff) {
        for (var i = 0; i < $attackers.length; i++) {
            $attackers[i].onmousedown = null;
        }
        setTimeout(function () {
            notice('敌方攻击回合');
            setTimeout(function () {
                defenderAi();
            }, 500);
        }, 500);

        return;
    }
    setTimeout(function () {
        notice('我方攻击回合');
    }, 500);
    var isMoving = false;

    var _loop5 = function _loop5(_i3) {
        var obj = $attackers[_i3],
            attackObj = null;
        obj.index = _i3;
        obj.onmousedown = function (ev) {
            if (isMoving) return;
            if (attackerArr[obj.index].isDead) {
                return;
            }
            ev.preventDefault();
            var oldPos = obj.getBoundingClientRect(),
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
                var movePos = {
                        x: ev.clientX - oldPos.left,
                        y: ev.clientY - oldPos.top
                    },
                    left = movePos.x - rePos.x,
                    top = movePos.y - rePos.y;
                obj.style.left = left + 'px';
                obj.style.top = top + 'px';
                for (var j = 0; j < $defenders.length; j++) {
                    $defenders[j].index = j;
                }
                for (var _j2 = 0; _j2 < $defenders.length; _j2++) {
                    var obj1 = $defenders[_j2];
                    if (mt.mouseCollisionDetection(ev, obj1)) {
                        if (!defenderArr[obj1.index].isDead) {
                            obj1.classList.add('defense');
                        }
                    } else {
                        obj1.classList.remove('defense');
                    }
                }
            };
            document.onmouseup = function (ev) {
                for (var j = 0; j < $defenders.length; j++) {
                    var obj1 = $defenders[j];
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
                    lMove(obj, { 'left': oldOffsetPos.x, 'top': oldOffsetPos.y }, 300, 'easeOut', function () {
                        isMoving = false;
                    });
                } else {
                    isMoving = true;
                    lMove(obj, { 'left': oldOffsetPos.x, 'top': oldOffsetPos.y }, 300, 'easeOut', function () {
                        isMoving = false;
                    });
                }
                obj.classList.remove('dragging');
                document.onmousemove = document.onmouseup = null;
            };
        };
    };

    for (var _i3 = 0; _i3 < $attackers.length; _i3++) {
        _loop5(_i3);
    }
}
function notice(content) {
    var $notice = $('.notice')[0];
    var li = document.createElement('li');
    li.innerHTML = content;
    $notice.insertBefore(li, $notice.children[0]);
    $notice.children[0].classList.add('show');
}
function defenderAi() {
    var randomSeed1 = Math.floor(Math.random() * defen.length),
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
    lMove($d, { 'top': aPos.y - oldDPos.y + oldDoffsetPos.y, 'left': aPos.x - oldDPos.x + oldDoffsetPos.x }, 200, 'easeIn', function () {
        defen[randomSeed1].attackP(attac[randomSeed2], $a);
        lMove($d, { 'top': oldDoffsetPos.y, 'left': oldDoffsetPos.x }, 200, 'easeOut');
        attackerRound(true);
    });
}
function checkDead() {
    attac = [];
    defen = [];
    for (var i = 0; i < attackerArr.length; i++) {
        var _obj2 = attackerArr[i];
        var obj1 = defenderArr[i];
        _obj2.index = obj1.index = i;
        if (!_obj2.isDead) attac.push(_obj2);
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

//cardMove
var lastOrigin = '50% 90%',
    isSpread = false;
var cm = {
    reset: function reset(cbk) {
        $cardC = $('#card-container');
        $cs = $('li', $cardC);
        var count = 0;
        var cbkFu = function cbkFu() {
            if (typeof cbk === 'function') cbk();
        };
        if (!isSpread) {
            cbkFu();
            return;
        }

        var _loop = function _loop(i) {
            var obj = $cs[i];
            obj.style.transition = '500ms';
            obj.style.transform = 'none';
            obj.style.transformOrigin = lastOrigin;
            var callback = function callback() {
                obj.style.transition = 'none';
                isSpread = false;
                obj.removeEventListener(getTransitionend(), callback);
                count++;
                if (count == $cs.length) {
                    cbkFu();
                }
            };
            obj.addEventListener(getTransitionend(), callback);
        };

        for (var i = 0; i < $cs.length; i++) {
            _loop(i);
        }
        return true;
    },
    transform2d: function transform2d(s) {
        s = s || this.defaultSettings;
        this.reset(function () {
            var _loop2 = function _loop2(i) {
                var obj = $cs[i];
                var centerCs = Math.floor($cs.length / 2);
                var rotateZ = s.center ? i <= centerCs ? (centerCs - i) * -(s.range / 2) / centerCs : (i - centerCs) * (s.range / 2) / centerCs : s.range / $cs.length * i + s.range / $cs.length;
                var translateX = s.translate || 0;
                if (s.direction == 'left') {
                    rotateZ = -rotateZ;
                    translateX = -translateX;
                }
                translateX = s.center ? i <= centerCs ? (centerCs - i) * -(translateX / 2) / centerCs : (i - centerCs) * (translateX / 2) / centerCs : translateX / $cs.length * i;
                obj.style.transformOrigin = lastOrigin = s.origin.x + '% ' + s.origin.y + '%';
                obj.style.transition = s.speed + 'ms ' + s.easing + ' transform';
                obj.style.transform = 'translate(' + translateX + 'px) rotate(' + rotateZ + 'deg)';
                var callback = function callback() {
                    obj.style.transition = 'none';
                    isSpread = true;
                    obj.removeEventListener(getTransitionend(), callback);
                    return obj;
                };
                obj.addEventListener(getTransitionend(), callback);
            };

            for (var i = 0; i < $cs.length; i++) {
                _loop2(i);
            }
        });
    },
    nextCard: function nextCard() {
        this.reset(function () {
            var obj = $cs[$cs.length - 1];
            obj.classList.add('next-animation');
            var callback = function callback() {
                obj.classList.remove('next-animation');
                $cardC.insertBefore(obj, $cardC.children[0]);
                obj.removeEventListener(getAnimationend(), callback);
                return obj;
            };
            obj.addEventListener(getAnimationend(), callback);
        });
    },
    prevCard: function prevCard() {
        this.reset(function () {
            var obj = $cs[0];
            obj.classList.add('prev-animation');
            var callback = function callback() {
                obj.classList.remove('prev-animation');
                $cardC.appendChild(obj);
                obj.removeEventListener(getAnimationend(), callback);
                return obj;
            };
            obj.addEventListener(getAnimationend(), callback);
        });
    },

    defaultSettings: {
        speed: 500,
        easing: 'ease-out',
        range: 10,
        translate: 300,
        direction: 'right',
        origin: { x: 50, y: 90 },
        center: false
    },
    right: {
        speed: 500,
        easing: 'ease-out',
        range: 90,
        direction: 'right',
        origin: { x: 50, y: 100 },
        center: true,
        translate: 60
    },
    left: {
        speed: 500,
        easing: 'ease-out',
        range: 90,
        direction: 'left',
        origin: { x: 50, y: 100 },
        center: true,
        translate: 60
    },
    horizontalSpread: {
        speed: 500,
        easing: 'ease-out',
        range: 100,
        direction: 'right',
        origin: { x: 50, y: 200 },
        center: true
    },
    rightSpread: {
        speed: 500,
        easing: 'ease-out',
        range: 20,
        direction: 'right',
        origin: { x: 50, y: 200 },
        center: false,
        translate: 300
    },
    leftSpread: {
        speed: 500,
        easing: 'ease-out',
        range: 20,
        direction: 'left',
        origin: { x: 50, y: 200 },
        center: false,
        translate: 300
    },
    rotate360: {
        speed: 500,
        easing: 'ease-out',
        range: 360,
        direction: 'left',
        origin: { x: 50, y: 90 },
        center: false
    },
    rotate330: {
        speed: 500,
        easing: 'ease-out',
        range: 330,
        direction: 'left',
        origin: { x: 50, y: 100 },
        center: true
    }
};

//canvas dot
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var Practicle = function () {
    function Practicle(color, radius) {
        _classCallCheck(this, Practicle);

        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.radius = radius;
        this.color = color;
    }

    _createClass(Practicle, [{
        key: "draw",
        value: function draw(ctx) {
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
    }, {
        key: "move",
        value: function move() {
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
    }, {
        key: "drawLine",
        value: function drawLine(otherDot) {
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
    }]);

    return Practicle;
}();

var ctxCtrl = {
    init: function init(selector) {
        canvas = document.getElementById(selector);
        ctx = canvas.getContext('2d');
        W = options.cW;
        H = options.cH;
        canvas.width = options.cW;
        canvas.height = options.cH;
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                    return setTimeout(callback, 20);
                };
        }
        this.initDots();
        this.update();
    },
    initDots: function initDots() {
        for (var i = 0; i < options.numDot; i++) {
            var oDot = new Practicle(options.dotColor, options.radDot);
            oDot.x = parseInt(Math.random() * W.toFixed(1));
            oDot.y = parseInt(Math.random() * H.toFixed(1));
            oDot.vx = Math.random() * options.vxRange;
            oDot.vy = Math.random() * options.vyRange;
            dots.push(oDot);
        }
    },
    update: function update() {
        ctx.clearRect(0, 0, W, H);
        dots.forEach(function (item) {
            item.move();
            item.draw(ctx);
        });
        for (var i = 0; i < options.numDot - 1; i++) {
            var oDotA = dots[i];
            for (var j = i + 1; j < options.numDot; j++) {
                var oDotB = dots[j];
                oDotA.drawLine(oDotB);
            }
        }
        window.requestAnimationFrame(ctxCtrl.update);
    }
};
window.onresize = function () {
    canvas.width = W = window.innerWidth;
    canvas.height = H = window.innerHeight;
};


//move function
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
            var v = Tween[fx](kkkTime, j[attr].startS, j[attr].move, duration);
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
var Tween = {
    linear: function (t, b, c, d) { //匀速
        return c * t / d + b;
    },
    easeIn: function (t, b, c, d) { //加速曲线
        return c * (t /= d) * t + b;
    },
    easeOut: function (t, b, c, d) { //减速曲线
        return -c * (t /= d) * (t - 2) + b;
    }
};

