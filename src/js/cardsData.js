/**
 * Created by Moudi on 2017/1/6.
 */
let cardsData = [
    {
        id: 1,
        name: '骑士',
        img: './src/img/r-1.png',
        des: '在黑暗时代选拔出来的精英骑士,拥有坚硬的盔甲。',
        rarity: {
            code: 1,
            r: true,
            sr: false,
            ssr: false
        }, // 1--r   2--sr   3--ssr
        attack: 100,
        defense: 500,
        health: 2000,
        CRI: .42, //暴击率
        CS: 1.48, //暴击伤害
        sta: 0 //0 -- normal  1 -- dead
    },
    {
        id: 2,
        name: '渔夫王',
        img: './src/img/r-5.jpg',
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
        img: './src/img/r-4.jpg',
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
        img: './src/img/r-3.jpg',
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
        img: './src/img/sr-1.jpg',
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
        img: './src/img/sr-3.jpg',
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
        img: './src/img/sr-4.jpg',
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
        img: './src/img/ssr-1.jpg',
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
    }
];