<template>
    <div class="shop_container">
        <ul class="shop_list" v-if="shops.length">
            <li class="shop_li border-1px" v-for="(shop, index) in shops"
            :key="index" @click="$router.push('/shop')">
                <a>
                    <div class="shop_left">
                        <img class="shop_img" :src="baseImageUrl+shop.image_path">
                    </div>
                    <div class="shop_right">
                        <section class="shop_detail_header">
                            <div class="shop_top">
                                <div class="shop_top_title">
                                    <span>品牌</span>
                                </div>
                                <div class="shop_top_text">
                                    <span class="ellipsis">{{shop.name}}</span>
                                </div>
                            </div>
                            <div class="shop_middle">
                                <Star :score="shop.rating" :size="24"/>
                                <span class="mark">{{shop.rating}}</span>
                                <span>月售{{shop.recent_order_num}}单</span>
                            </div>
                            <div class="shop_fotter">
                                <span>￥{{shop.float_minimum_order_amount}}起送/配送费约￥{{shop.float_delivery_fee}}</span>
                            </div>
                        </section>
                        <section class="shop_honor">
                            <div class="honor">
                                <span class="supports" v-for="(support, index) in shop.supports" :key="index">{{support.icon_name}}</span>
                            </div>
                            <div class="honor_descript">
                                <div class="descript_position">
                                    <span>{{shop.delivery_mode.text}}</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </a>
            </li>
        </ul>
        <ul v-else>
            <li v-for="item in 6" :key="item">
                <img src="./images/shop_back.svg" alt="back">
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Star from '../Star/Star.vue'
    export default{
        data () {
            return {
                baseImageUrl: '//www.test2.com'
            }
        },
        components: {
            Star
        },
        computed: {
            ...mapState(['shops'])
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import "../../common/stylus/mixins.styl"
    .shop_container
        .shop_list
            .shop_li
                bottom-border-1px(#f1f1f1)
                width 100%
                >a
                    clearFix()
                    display block
                    box-sizing border-box
                    padding 15px 8px
                    width 100%
                    .shop_left
                        float left
                        box-sizing border-box
                        width 23%
                        height 75px
                        padding-right 10px
                        .shop_img
                            display block
                            width 100%
                            height 100%
                    .shop_right
                        float right
                        width 77%
                        height 75px
                        .shop_detail_header
                            float left
                            display flex
                            flex-flow column
                            width 70%
                            .shop_top
                                display flex
                                flex-flow row nowrap
                                width 100%
                                .shop_top_title
                                    text-align center
                                    margin 5px
                                    width 30%
                                    >span
                                        padding 3px
                                        background-color #e1d755
                                .shop_top_text
                                    width 70%
                                    >span
                                        display block
                                        font-size 20px
                                        font-weight bold
                            .shop_middle
                                display flex
                                flex-flow row nowrap
                                .mark
                                    color #e1d755
                                span
                                    font-size 16px
                            .shop_fotter
                                span
                                    font-size 16px
                        .shop_honor
                            margin-top 10px
                            margin-right 10px
                            float right
                            .honor
                                .supports
                                    border 1px solid rgba(255,128,194,.2)
                            .honor_descript
                                .descript_position
                                    span
                                        background-color rgba(255,128,194,.3)
</style>
