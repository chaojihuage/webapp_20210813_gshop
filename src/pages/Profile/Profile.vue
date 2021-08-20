<template>
    <div class="profile">
        <HeaderTop title="我的"></HeaderTop>
        <router-link :to="userInfo._id?'/userinfo':'/login'" class="progile-user">
            <div class="progile-link">
                <img class="progile_image" src="./images/person.png">
                <div class="progile-message">
                    <a class="progile_sign" href="javascript:;">
                        <span v-if="!userInfo.phone">{{userInfo.name||userInfo._id||'登录/注册'}}</span>
                    </a>
                    <div class="progile_text">
                        <i class="iconfont icon-iconfontshouji"></i>
                        <span>{{userInfo.phone||'暂无绑定手机号'}}</span>
                    </div>
                </div>
                <div class="progile-more">
                    <a class="more">
                        <i class="iconfont icon-icon-keyboard"></i>
                    </a>
                </div>
            </div>
        </router-link>
        <div class="progile-number">
            <div class="number_left">
                <div class="number_left_top">
                    <span class="numbers">0.00</span>
                    <span class="unit">元</span>
                </div>
                <div class="number_left_bottom">
                    <span>我的余额</span>
                </div>
            </div>
            <div class="number_middle">
                <div class="number_left_top">
                    <span class="numbers">0</span>
                    <span class="unit">个</span>
                </div>
                <div class="number_left_bottom">
                    <span>我的优惠</span>
                </div>
            </div>
            <div class="number_right">
                <div class="number_left_top">
                    <span class="numbers">0</span>
                    <span class="unit">分</span>
                </div>
                <div class="number_left_bottom">
                    <span>我的积分</span>
                </div>
            </div>
        </div>
        <div class="lineCut"></div>
        <div class="me-order">
            <div class="me-order-position">
                <div class="order-left">
                    <i class="iconfont icon-orders"></i>
                    <span>我的订单</span>
                </div>
                <div class="order-right">
                    <a href="javascript:;" class="more">
                        <i class="iconfont icon-icon-keyboard"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="integral-shop">
            <div class="integral-shop-position">
                <div class="shop-left">
                    <i class="iconfont icon-bonus-s"></i>
                    <span>积分商城</span>
                </div>
                <div class="shop-right">
                    <a href="javascript:;" class="more">
                        <i class="iconfont icon-icon-keyboard"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="card-vip">
            <div class="card-vip-position">
                <div class="card-left">
                    <i class="iconfont icon-VIP"></i>
                    <span>硅谷外卖会员卡</span>
                </div>
                <div class="card-right">
                    <a href="javascript:;" class="more">
                        <i class="iconfont icon-icon-keyboard"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="lineCut"></div>
        <div class="service-center">
            <div class="service-center-position">
                <div class="service-left">
                    <i class="iconfont icon-uf_houses"></i>
                    <span>服务中心</span>
                </div>
                <div class="service-right">
                    <a href="javascript:;" class="more">
                        <i class="iconfont icon-icon-keyboard"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="lineCut"></div>
        <div class="outLogin" v-show="userInfo._id">
            <mt-button type="danger" class="outLoginBtn" @click="logout">退出登录</mt-button>
        </div>
    </div>
</template>

<script>
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
    import {mapState} from 'vuex'
    import {MessageBox, Toast} from 'mint-ui'
    export default {
        computed: {
            ...mapState(['userInfo'])
        },
        components: {
            HeaderTop
        },
        methods: {
            logout () {
                MessageBox.confirm('确认退出吗？').then(() => {
                    // 请求退出
                    this.$store.dispatch('logout')
                    Toast({
                        message: '登出完成',
                        duration: 1000})
                    // 刷新验证码
                }, () => {
                    console.log('点击了取消')
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .profile
        width 100%
        background-color rgb(245,245,245)
        overflow hidden
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
        .progile-user
            clearFix()
            display block
            margin-top 45.5px
            .progile-link
                clearFix()
                background #02a774
                padding 20px 10px
                .progile_image
                    float left
                    width 60px
                .progile-message
                    margin 5px 0 0 10px
                    float left
                    .progile_sign
                        margin-left 5px
                        margin-bottom 5px
                        font-size 16px
                        color #fff
                    .progile_text
                        font-size 14px
                        color #fff
                        .icon-iconfontshouji
                            vertical-align middle
                            font-size 18px
                        span
                            vertical-align middle
                .progile-more
                    float right
                    margin-top 18px
                    .more
                        color #fff
        .progile-number
            background-color #fff
            height 80px
            clearFix()
            bottom-border-1px(#e4e4e4)
            display flex
            flex-flow row nowrap
            text-align center
            .number_left
                width 33%
                margin-top 8px
                .number_left_top
                    .numbers
                        font-size 24px
                        font-weight bold
                        color #f2e642
                    .unit
                        font-size 14px
                .number_left_bottom
                    margin-top 5px
            .number_middle
                width 33%
                margin-top 8px
                .number_left_top
                    .numbers
                        font-size 24px
                        font-weight bold
                        color #02a774
                    .unit
                        font-size 14px
                .number_left_bottom
                    margin-top 5px
            .number_right
                width 33%
                margin-top 8px
                .number_left_top
                    .numbers
                        font-size 24px
                        font-weight bold
                        color #02a774
                    .unit
                        font-size 14px
                .number_left_bottom
                    margin-top 5px
        .me-order
            background-color #fff
            height 45px
            line-height 45px
            bottom-border-1px(#ccf0eb)
            .me-order-position
                clearFix()
                .order-left
                    margin-left 10px
                    float left
                    .icon-orders
                        color #75b4b8
                        vertical-align middle
                        font-size 16px
                    span
                        font-size 14px
                        vertical-align middle
                .order-right
                    margin-right 10px
                    float right
                    .more
                        color #a8d9dc
        .integral-shop
            background-color #fff
            height 45px
            line-height 45px
            clear both
            bottom-border-1px(#ccf0eb)
            .integral-shop-position
                clearFix()
                .shop-left
                    margin-left 10px
                    float left
                    .icon-bonus-s
                        color #c04d7b
                        vertical-align middle
                        font-size 16px
                    span
                        font-size 14px
                        vertical-align middle
                .shop-right
                    margin-right 10px
                    float right
                    .more
                        color #a8d9dc
        .card-vip
            background-color #fff
            height 45px
            line-height 45px
            clear both
            bottom-border-1px(#ccf0eb)
            .card-vip-position
                clearFix()
                .card-left
                    margin-left 10px
                    float left
                    .icon-VIP
                        color #c3e32d
                        vertical-align middle
                        font-size 16px
                    span
                        font-size 14px
                        vertical-align middle
                .card-right
                    margin-right 10px
                    float right
                    .more
                        color #a8d9dc
        .service-center
            background-color #fff
            height 45px
            line-height 45px
            clear both
            bottom-border-1px(#ccf0eb)
            .service-center-position
                clearFix()
                .service-left
                    margin-left 10px
                    float left
                    .icon-uf_houses
                        color #5ea299
                        vertical-align middle
                        font-size 16px
                    span
                        font-size 14px
                        vertical-align middle
                .service-right
                    margin-right 10px
                    float right
                    .more
                        color #a8d9dc
        .lineCut
            display block
            width 100%
            height 10px
        .outLogin
            .outLoginBtn
                width 100%
                font-size 16px
</style>
