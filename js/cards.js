/**
 * Created by Moudi on 2017/1/6.
 */
var cardC = document.getElementById('card-container'),
    cs = cardC.getElementsByTagName('li');
class Card {
    constructor(obj) {
        for (var k in obj) {
            this[k]= obj[k];
        }
        this.isDead = false;
        this.isNew = false;
    }
    attackP(obj) {
        console.log(obj.name + '受到' + this.name + '的攻击');
        let randomSeed = Math.random();
        let newHealth = obj.health - (this.attack * (randomSeed < this.CRI ? this.CS : 1)) * (1 - (obj.defense/(400+obj.defense)));

        obj.health = Math.round(newHealth);
        if (obj.health <= 0) {
            obj.health = 0;
            obj.isDead = true;
        }
        return (randomSeed < this.CRI ? '暴击！' : 'ok');
    }
}

//全局变量区
let testC = [];

init();
function init() {
    testC.push(new Card(cardsData[0]));
    testC.push(new Card(cardsData[1]));
    let cardComponents = {
        props: ['card'],
        template:
            `
            <li class="cards" :class="{neww: card.isNew, dead: card.isDead, r: true}"  v-on:mousedown.prevent >
                <em></em>
                <img :src="card.img" alt="">
                <div class="info">
                    <h4>{{ card.name }}</h4>
                    <p>{{ card.des }}</p>
                </div>
                <div class="property">
                    <i class="attack">{{ card.attack }}</i>
                    <i class="defense"><span>{{ card.health }}</span></i>
                </div>
                <div class="backface"></div>
            </li>
            `
    };
    new Vue({
        el: '#card-container',
        data: {
            list: testC
        },
        components: {
            'card-c': cardComponents
        }
    });
    setTimeout(function() { //暂时模拟
        document.getElementsByClassName('loader')[0].fadeOut();
    }, 2000)
}

function getAnimationed() {
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

Object.prototype.fadeOut = function () {
    this.classList.add('fade-out-animation');
    let callback = () => {
        this.classList.remove('fade-out-animation');
        this.style.display = 'none';
        this.removeEventListener(getAnimationed(), callback);
        return;
    }
    this.addEventListener(getAnimationed(), callback);
};