<template>
    <div class="order">
        <HeaderTop title="订单列表"></HeaderTop>
        <div class="order_no_login">
            <img src="./images/dog.png">
            <h3>登录后查看外卖订单</h3>
            <router-link to="/login">
                <button>立即登录</button>
            </router-link>
        </div>
    </div>
</template>

<script>
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
    export default {
        components: {
            HeaderTop
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .order
        width 100%
        background-color #fff
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
        .order_no_login
            padding-top 140px
            width 60%
            margin 0 auto
            text-align center
            >img
                display block
                width 100%
                height 10%
                opacity 0.8
                margin-bottom 30px
            >h3
                font-size 16px
                color #2bb524
                margin-bottom 20px
            button
                outline none
                border none
                background-color #2bb524
                border-radius 5px
                height 30px
                width 70px
                color #fff
</style>
