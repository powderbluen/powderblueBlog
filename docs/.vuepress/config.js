module.exports = {
    title: '杰尼龟的知识空间',
    base: '/powderblueBlog/',
    head: [],
    plugins: [
        // 著作权信息
        [
            'copyright',
            {
                authorName: '杰尼龟', // 选中的文字将无法被复制
                minLength: 30, // 如果长度超过  30 个字符
            },
        ],

        ["sakura", {
            num: 30,  // 默认数量
            show: true, //  是否显示
            zIndex: 9999,   // 层级
            img: {
                replace: false,  // false 默认图 true 换图 需要填写httpUrl地址
                httpUrl: '...'     // 绝对路径
            }
        }],

        //背景音乐
        [
            "@vuepress-reco/vuepress-plugin-bgm-player",
            {
                audios: [
                    // 网络文件示例
                    {
                        name: '강남역 4번 출구',
                        artist: 'Plastic / Fallin` Dild',
                        url: 'https://assets.smallsunnyfox.com/music/2.mp3',
                        cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
                    },
                ],
                // audios: [
                //     {
                //         //名字
                //         name: "高飞",
                //         //作者
                //         artist: "张杰",
                //         //地址
                //         url: "/gaofei.flac",
                //         //封面图片
                //         cover: "/zhangjie.jpg",
                //     },
                // ],
                // 是否默认缩小
                autoShrink: true,
                // 缩小时缩为哪种模式
                shrinkMode: "float",
                // 悬浮窗样式
                floatStyle: { bottom: "30px", "z-index": "999999" },
            },
        ],

        //光标效果
        ['cursor-effects', {
            size: 2, // size of the particle, default: 2
            shape: 'star', // ['star' | 'circle'], // shape of the particle, default: 'star'
            zIndex: 999999999, // z-index property of the canvas, default: 999999999
        }],

        [
            'posts-encrypt',
            {
                route: '/auth',
                passwd: '123456',
                encryptInDev: true,
                expires: 1000 * 60
            }
        ]

    ],

    themeConfig: {
        displayAllHeaders: true, // 默认值：false
        // 添加导航栏
        nav: [
            { text: '主页', link: '/' },
            {
                text: '前端三剑客', items: [
                    { text: 'HTMLandCSS', link: '/ThreeSwordsman/HTMLandCSS-Topic/' },
                    { text: 'JavaScript', link: '/ThreeSwordsman/JavaScript-Topic/' },
                    { text: 'LESSandSCSS', link: '/ThreeSwordsman/LESSandSCSS/' },
                ]
            },
            {
                text: 'Vue',
                items: [
                    { text: 'Vue2基础面视题', link: '/vue/vue-know/' },
                    { text: 'Vue难点面视题', link: '/vue/vue-hard/' },
                    { text: 'Vue3', link: '/vue/Vue3/' },
                ]
            },
            {
                text: '综合',
                items: [
                    { text: '常见面试题', link: '/Comprehensive/CommonTopic/' },
                    { text: '常见面试题2', link: '/Comprehensive/Rendering/' },
                    { text: '权限控制怎么做', link: '/Comprehensive/RBAC/' },
                    { text: '项目经验', link: '/Comprehensive/ProjectExperience/' },
                ]
            },
            // { text: '个人简历', link: '/personal/resume/' },
        ],
        sidebar: [
        ],
        sidebarDepth: 2,
        lastUpdated: 'Last Updated'
    },
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
}