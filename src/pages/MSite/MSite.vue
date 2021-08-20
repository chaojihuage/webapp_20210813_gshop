<template>
    <div class="msite">
        <!--首页头部-->
        <HeaderTop :title="address.name">
            <router-link class="header_search" slot="left" to="/search">
                <i class="iconfont icon-sousuo"></i>
            </router-link>
            <router-link class="header_login" slot="right" :to="userInfo._id?'/userinfo':'/login'">
                <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
                <i class="iconfont icon-geren" v-else></i>
            </router-link>
        </HeaderTop>
        <!--首页导航-->
        <nav class="msite_nav">
            <div class="swiper-container" v-if="categorys.length">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
                        <a href="javascript:;" class="link_to_food" v-for="(category, index) in categorys" :key="index">
                            <div class="food_container">
                                <img :src="baseImageUrl+category.image_url">
                            </div>
                            <span>{{category.title}}</span>
                        </a>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <img src="./images/msite_back.svg" alt="back" v-else>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
            <div class="shop_header">
                <i class="iconfont icon-catalog"></i>
                <span class="shop_header_title">附近商家</span>
            </div>
            <ShopList/>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
    import ShopList from '../../components/ShopList/ShopList.vue'
    import {mapState} from 'vuex'
    export default {
        data () {
            return {
                baseImageUrl: '//www.test2.com'
            }
        },
        components: {
            HeaderTop,
            ShopList
        },
        mounted () {
            this.$store.dispatch('getCategorys')
            this.$store.dispatch('getShops')
        },
        computed: {
            ...mapState(['address', 'categorys', 'userInfo']),
            // 根据一维数组生成一个2维数组，小数组中元素最大为8
            categorysArr () {
                const {categorys} = this
                // 准备一个空的2维数组
                const arr = []
                // 准备一个小数组（最大为8）
                let minArr = []
                // 遍历categorys
                categorys.forEach(c => {
                    // 小数组放大树组中
                    if (minArr.length === 0) {
                        arr.push(minArr)
                    }
                    // 向小数组中添加
                    minArr.push(c)
                    // 小数组满了重置
                    if (minArr.length === 8) {
                        minArr = []
                    }
                })
                return arr
            }
        },
        watch: {
            categorys (value) { // categorys 数组中有数据了，在异步更新界面之前执行
                // 使用setTimeout可以实现效果，但不是太好
                // setTimeout(() => {
                //     // 创建一个Swiper实例对象，来实现轮播
                //     new Swiper('.swiper-container', {
                //         observer: true, // 修改swiper自己或子元素时，自动初始化swiper
                //         observeParents: true, // 修改swiper的父元素时，自动初始化swiper
                //         loop: true, // 可以循环轮播
                //         pagination: '.swiper-pagination',
                //         paginationClickable: true,
                //         paginationHide: false,
                //         speed: 1000, // 速度 越小越快
                //         autoplay: 5000 // 延迟 5秒
                //     })
                // }, 100)
                // 界面更新就立即创建Swiper对象
                this.$nextTick(() => { // 一旦完成界面更新，立即调用（词条语句要写在数据更新之后）
                    // 创建一个Swiper实例对象，来实现轮播
                    new Swiper('.swiper-container', {
                        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
                        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
                        loop: true, // 可以循环轮播
                        pagination: '.swiper-pagination', // 小圆点类名样式
                        paginationClickable: true, // 允许点击小圆点切换
                        paginationHide: false, // 小圆点隐藏关闭
                        speed: 1000, // 速度 越小越快
                        autoplay: 5000 // 延迟 5秒
                    })
                })
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .msite
        width 100%
        .header
            background-color #02a774
            position fixed
            z-index 100
            left 0
            top 0
            width 100%
            height 45px
            .header_search
                position absolute
                left 15px
                top 40%
                transform translateY(-50%)
                width 10%
                height 50%
                .icon-sousuo
                    font-size 25px
                    color #fff
            .header_title
                position absolute
                top 50%
                left 50%
                transform translate(-50%,-50%)
                width 50%
                color #fff
                text-align center
                .header_title_text
                    font-size 20px
                    color #fff
                    display block
            .header_login
                font-size 14PX
                color #fff
                position absolute
                right 15px
                top 50%
                transform translateY(-50%)
                .header_login_text
                    color #fff
        .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            width 100%
            .swiper-container
                width 100%
                height 100%
                overflow auto
                .swiper-wrapper
                    display flex
                    flex-flow column wrap
                    .swiper-slide
                        display flex
                        flex-flow row wrap
                        >a
                            width 25%
                            margin-top 10px
                            text-align center
                            .food_container
                                img
                                    width 60%
                                span
                                    font-size 14px
                .swiper-pagination
                    .swiper-pagination-bullet-active
                        background-color: #52B54B
        .msite_shop_list
            overflow hidden
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            z-index 200
            .shop_header
                padding 10px 10px 0
                .shop_icon
                    margin-left 5px
                    color #999
                .shop_header_title
                    color #999
                    font-size 14px
                    line-height 20px
</style>
