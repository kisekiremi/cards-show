/**
 * Created by Moudi on 2017/1/6.
 */
var cardC = document.getElementById('card-container'),
    cs = cardC.getElementsByTagName('li');



init();
function init() {
    var zindex = 1000;
    for (var i = 0; i < cards.length; i++) {
        createCard(cards[i], zindex++);
    }
}
function createCard(obj, zindex) {
    var li = document.createElement('li'),
        em = document.createElement('em'),
        img = document.createElement('img'),
        infoD = document.createElement('div'),
        h4 = document.createElement('h4'),
        des = document.createElement('p'),
        propertyD = document.createElement('div'),
        attackI = document.createElement('i'),
        defenseI = document.createElement('i'),
        span1 = document.createElement('span'),
        span2 = document.createElement('span'),
        backFD = document.createElement('div'),
        text = document.createTextNode('|');
    img.src = obj.img;
    h4.innerHTML = obj.name;
    des.innerHTML = obj.des;
    infoD.appendChild(h4);
    infoD.appendChild(des);
    infoD.className = 'info';
    attackI.innerHTML = obj.attack;
    attackI.className = 'attack';
    span1.innerHTML = obj.health;
    span2.innerHTML = obj.defense;
    defenseI.appendChild(span1);
    defenseI.appendChild(text);
    defenseI.appendChild(span2);
    defenseI.className = 'defense';
    propertyD.appendChild(attackI);
    propertyD.appendChild(defenseI);
    propertyD.className = 'property';
    backFD.className = 'backface';
    li.appendChild(em);
    li.appendChild(img);
    li.appendChild(infoD);
    li.appendChild(propertyD);
    li.appendChild(backFD);
    li.className = 'cards ' + obj.rarity;
    li.style.zIndex = zindex;
    mt.drag(li);
    cardC.appendChild(li);
}
// test0.onclick = function() {
//     cm.reset();
// };
// test1.onclick = function() {
//     cm.transform2d({
//         speed: 500,
//         easing : 'ease-out',
//         range : 10,
//         translate: 300,
//         direction : 'left',
//         origin : { x : 50, y : 50 },
//         center: false
//     })
// };
// test2.onclick = function() {
//     cm.transform2d({
//         speed: 500,
//         easing : 'ease-out',
//         range : 360,
//         translate: 200,
//         direction : 'left',
//         origin : { x : 50, y : 90 },
//         center: true
//     })
// };
// test3.onclick = function() {
//     cm.transform2d({
//         speed: 500,
//         easing : 'ease-out',
//         range : 90,
//         translate: 400,
//         direction : 'left',
//         origin : { x : 50, y : 90 },
//         center: true
//     })
// };
// test4.onclick = function() {
//     cm.transform2d({
//         speed: 500,
//         easing : 'ease-out',
//         range : 90,
//         translate: 100,
//         direction : 'left',
//         origin : { x : 50, y : 90 },
//         center: false
//     })
// };

function attack(attacker, victim) {
    var battle = [];
    var randomSeed = Math.random();
    battle.push(attacker, victim);
    console.log('战斗开始：' + battle[0].name + '，生命：' + battle[0].health + '护盾:' + battle[0].defense + '||' + battle[1].name + '，生命：' + battle[1].health + '护盾:' + battle[1].defense);
    console.log(battle[1].name + "受到来自" + battle[0].name + "的攻击");
    if (battle[0].CRI > randomSeed) {
        var atc = battle[0].attack * battle[0].CS;
        console.log("攻击造成暴击，攻击力上升" + battle[0].CS*100 + '%');
    }
    else {
        var atc = battle[0].attack;
    }
    if (battle[1].defense - atc * battle[0].SBR <= 0) {
        atc -=  battle[1].defense;
        battle[1].defense = 0;
        console.log(battle[1].name + '护盾失效');
        battle[0].SBR = 0;
    }
    console.log("攻击造成" + battle[1].name + "失去了" + atc * (1 - battle[0].SBR) + '生命' + '，盾受损' + atc * battle[0].SBR);
    battle[1].health -= atc * (1 - battle[0].SBR);
    battle[1].defense -= atc * battle[0].SBR;
    console.log('战斗结束：' + battle[0].name + '，生命：' + battle[0].health + '护盾:' + battle[0].defense + '||' + battle[1].name + '，生命：' + battle[1].health + '护盾:' + battle[1].defense);
    return battle;
}

/*<li class="cards">
     <em></em>
     <img src="img/r-1.png" alt="">
     <div class="info">
         <h4>骑士</h4>
         <p>在黑暗时代选拔出来的精英骑士,拥有坚硬的盔甲。</p>
     </div>
     <div class="property">
         <i class="attack">100</i>
         <i class="defense"><span>1000</span>|<span>200</span></i>
     </div>
 </li>*/

function test() {
    for (var i = 0; i < cs.length; i++) {
        var obj = cs[i];
        obj.style.transition = '1s';
        obj.style.transform = 'translateX(' + 0 + 'px) rotateZ(' + i * (360/cs.length) + 'deg)';
        obj.style.transformOrigin = '20% 120%';
    }
}
function rot() {
    for (var i = 0; i < cs.length; i++) {
        var obj = cs[i];
        obj.style.transition = '1s';
        obj.style.transform = 'rotateY(' + i * (360/cs.length) + 'deg) translateZ(300px)';
        obj.style.transformOrigin = '50% 50%';
    }
}
function rrr() {
    cardC.style.transition = '9s';
    cardC.style.transform = 'rotateY(360deg)';
    cardC.style.transformOrigin = '50% 50%';
}