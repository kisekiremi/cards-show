/**
 * Created by Moudi on 2017/1/6.
 */
"use strict";
var cardC = $('#card-container'),
    cs = $('li', cardC);
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
let testC = [];

init();
function init() {
    initVue();
    initEvent();
    setTimeout(function() { //暂时模拟
        objCtrl.fadeOut($('.loader')[0]);
    }, 1000)
}
function initVue() {
    testC.push(new Card(cardsData[0]));
    testC.push(new Card(cardsData[1]));
    testC.push(new Card(cardsData[2]));
    testC.push(new Card(cardsData[3]));
    testC.push(new Card(cardsData[4]));
    testC.push(new Card(cardsData[5]));
    testC.push(new Card(cardsData[6]));
    testC.push(new Card(cardsData[7]));
    testC.push(new Card(cardsData[0]));
    testC.push(new Card(cardsData[1]));
    testC.push(new Card(cardsData[2]));
    testC.push(new Card(cardsData[3]));
    testC.push(new Card(cardsData[4]));
    testC.push(new Card(cardsData[5]));
    testC.push(new Card(cardsData[2]));
    testC.push(new Card(cardsData[3]));
    testC.push(new Card(cardsData[4]));
    let cardComponents = {
        props: ['card'],
        template:
            `
            <li class="cards" :class="{neww: card.isNew, dead: card.isDead}"  v-on:mousedown.prevent >
                <em></em>
                <img :src="card.img" alt="">
                <div class="info">
                    <h4>{{ card.name }}</h4>
                    <!--<p>{{ card.des }}</p>-->
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
}
function initEvent() {
}
