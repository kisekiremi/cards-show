/**
 * Created by Moudi on 2017/1/6.
 */
let cardsData = [
    {
        id: 1,
        name: '骑士',
        img: './src/img/card/r-1.png',
        des: '在黑暗时代选拔出来的精英骑士,拥有坚硬的盔甲。',
        rarity: {
            code: 1,
            r: true,
            sr: false,
            ssr: false
        }, // 1--r   2--sr   3--ssr
        attack: 100,
        defense: 100,
        health: 200,
        CRI: .42, //暴击率
        CS: 1.48, //暴击伤害
        sta: 0 //0 -- normal  1 -- dead
    },
    {
        id: 2,
        name: '渔夫王',
        img: './src/img/card/r-5.jpg',
        des: '骑士虽然单体就已经很强大了，利用特异的因子，诞生出拥有派生之力的骑士的意义更大。',
        rarity: {
            code: 1,
            r: true,
            sr: false,
            ssr: false
        }, // 1--r   2--sr   3--ssr
        attack: 170,
        defense: 107,
        health: 2000,
        CRI: .12, //暴击率
        CS: 1.48, //暴击伤害
        sta: 0 //0 -- normal  1 -- dead
    },
    {
        id: 3,
        name: '罗宾汉',
        img: './src/img/card/r-4.jpg',
        des: '从在不列颠森林里徘徊的女性提取因子而制造的复制品原来的人物是在『夏伍德森林』里架弓的弓箭手。',
        rarity: {
            code: 1,
            r: true,
            sr: false,
            ssr: false
        }, // 1--r   2--sr   3--ssr
        attack: 0,
        defense: 0,
        health: 0,
        CRI: 0, //暴击率
        CS: 0, //暴击伤害
        sta: 0 //0 -- normal  1 -- dead
    },
    {
        id: 4,
        name: '加荷里斯',
        img: './src/img/card/r-3.jpg',
        des: '虽然有着优秀的战斗力，但是一旦冲动就很难自我控制，通过彻底的攻击甚至会把没有抵抗的对手也杀害。',
        rarity: {
            code: 1,
            r: true,
            sr: false,
            ssr: false
        }, // 1--r   2--sr   3--ssr
        attack: 0,
        defense: 0,
        health: 0,
        CRI: 0, //暴击率
        CS: 0, //暴击伤害
        sta: 0 //0 -- normal  1 -- dead
    },
    {
        id: 5,
        name: '基安蒂',
        img: './src/img/card/sr-1.jpg',
        des: '离开湖之后，和普通的人类结婚作为一个主妇幸福地生活在镇上。但是…因为战争爆发又被迫踏上战场。',
        rarity: {
            code: 2,
            r: false,
            sr: true,
            ssr: false
        }, // 1--r   2--sr   3--ssr
        attack: 0,
        defense: 0,
        health: 0,
        CRI: 0, //暴击率
        CS: 0, //暴击伤害
        sta: 0 //0 -- normal  1 -- dead
    },
    {
        id: 6,
        name: '高文',
        img: './src/img/card/sr-3.jpg',
        des: '与兰斯洛特一起，是为了辅佐王而制造的专用特殊骑士在亚瑟那代是最早的骑士。',
        rarity: {
            code: 2,
            r: false,
            sr: true,
            ssr: false
        }, // 1--r   2--sr   3--ssr
        attack: 0,
        defense: 0,
        health: 0,
        CRI: 0, //暴击率
        CS: 0, //暴击伤害
        sta: 0 //0 -- normal  1 -- dead
    },
    {
        id: 7,
        name: '须佐之男',
        img: './src/img/card/sr-4.jpg',
        des: '活跃于东方国度的剑士。她的武器以那片土地上的宝剑为原型，据说拥有可以操纵雷的力量。',
        rarity: {
            code: 2,
            r: false,
            sr: true,
            ssr: false
        }, // 1--r   2--sr   3--ssr
        attack: 0,
        defense: 0,
        health: 0,
        CRI: 0, //暴击率
        CS: 0, //暴击伤害
        sta: 0 //0 -- normal  1 -- dead
    },
    {
        id: 8,
        name: '缇斯特',
        img: './src/img/card/ssr-1.jpg',
        des: '掌管时间的妖精抚养的少女，性格保守，但在敞开心怀的人面前会欢笑哭泣,显露表情丰富的少女一面。',
        rarity: {
            code: 3,
            r: false,
            sr: false,
            ssr: true
        }, // 1--r   2--sr   3--ssr
        attack: 0,
        defense: 0,
        health: 0,
        CRI: 0, //暴击率
        CS: 0, //暴击伤害
        sta: 0 //0 -- normal  1 -- dead
    },
    {
        id: 9,
        name: '竹姬',
        img: './src/img/card/ssr-2.jpg',
        des: '身穿美丽的和服，遥望月夜的身姿足以迷惑所有人。然而进入她的房子的人都会进入超空间而迷路，无法活着从里面逃脱。',
        rarity: {
            code: 3,
            r: false,
            sr: false,
            ssr: true
        }, // 1--r   2--sr   3--ssr
        attack: 0,
        defense: 0,
        health: 0,
        CRI: 0, //暴击率
        CS: 0, //暴击伤害
        sta: 0 //0 -- normal  1 -- dead
    },
    {
        id: 10,
        name: '天鹅座',
        img: './src/img/card/sr-5.jpg',
        des: '从天鹅座的群星的光辉中提炼出和天津四配对的骑士。',
        rarity: {
            code: 2,
            r: false,
            sr: true,
            ssr: false
        }, // 1--r   2--sr   3--ssr
        attack: 0,
        defense: 0,
        health: 0,
        CRI: 0, //暴击率
        CS: 0, //暴击伤害
        sta: 0 //0 -- normal  1 -- dead
    },
    {
        id: 11,
        name: '李尔德',
        img: './src/img/card/r-6.jpg',
        des: '每天都会爱惜地磨他闪闪发光的大斧。喜欢战斗，把对外敌的战斗作为最大的乐趣。',
        rarity: {
            code: 1,
            r: true,
            sr: false,
            ssr: false
        }, // 1--r   2--sr   3--ssr
        attack: 0,
        defense: 0,
        health: 0,
        CRI: 0, //暴击率
        CS: 0, //暴击伤害
        sta: 0 //0 -- normal  1 -- dead
    },
    {
        id: 12,
        name: '艾多尔利亚',
        img: './src/img/card/r-7.jpg',
        des: '因为太喜欢古代兵器所以在自己的身体里也埋入了改造的古代兵器机械。',
        rarity: {
            code: 1,
            r: true,
            sr: false,
            ssr: false
        }, // 1--r   2--sr   3--ssr
        attack: 0,
        defense: 0,
        health: 0,
        CRI: 0, //暴击率
        CS: 0, //暴击伤害
        sta: 0 //0 -- normal  1 -- dead
    },
    {
        id: 13,
        name: '乌莉特',
        img: './src/img/card/r-8.jpg',
        des: '被优秀的骑士所制造，由于魔法的力量，获得了凌驾于一般骑士之上的战斗能力。',
        rarity: {
            code: 1,
            r: true,
            sr: false,
            ssr: false
        }, // 1--r   2--sr   3--ssr
        attack: 0,
        defense: 0,
        health: 0,
        CRI: 0, //暴击率
        CS: 0, //暴击伤害
        sta: 0 //0 -- normal  1 -- dead
    },
    {
        id: 14,
        name: '加西亚',
        img: './src/img/card/sr-6.jpg',
        des: '一名无可匹敌的强大骑士，具有一定战斗能力。是个不率真并且有点性格扭曲的孩子。',
        rarity: {
            code: 2,
            r: false,
            sr: true,
            ssr: false
        }, // 1--r   2--sr   3--ssr
        attack: 0,
        defense: 0,
        health: 0,
        CRI: 0, //暴击率
        CS: 0, //暴击伤害
        sta: 0 //0 -- normal  1 -- dead
    },
    {
        id: 15,
        name: '兰斯洛特',
        img: './src/img/card/sr-7.jpg',
        des: '跟随亚瑟时间最长的骑士，已经被植入基本的骑士道精神。',
        rarity: {
            code: 2,
            r: false,
            sr: true,
            ssr: false
        }, // 1--r   2--sr   3--ssr
        attack: 0,
        defense: 0,
        health: 0,
        CRI: 0, //暴击率
        CS: 0, //暴击伤害
        sta: 0 //0 -- normal  1 -- dead
    },
    {
        id: 16,
        name: '橄榄石',
        img: './src/img/card/sr-8.jpg',
        des: '湖中所制造的「死神」试作品。制造出之后立刻从设施逃走，不确定是否是真正掌管死亡的死神。',
        rarity: {
            code: 2,
            r: false,
            sr: true,
            ssr: false
        }, // 1--r   2--sr   3--ssr
        attack: 0,
        defense: 0,
        health: 0,
        CRI: 0, //暴击率
        CS: 0, //暴击伤害
        sta: 0 //0 -- normal  1 -- dead
    }
];