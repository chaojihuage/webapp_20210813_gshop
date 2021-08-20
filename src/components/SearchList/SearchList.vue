<template>
    <div>
        <section class="list" v-if="!noSearchShops">
            <ul class="list_container">
                <!--:to="'/shop?id='+item.id"---->
                <router-link tag="li" :to="{path:'/shop',query:{id:item.id}}" class="list_li" v-for="(item, index) in searchShops" :key="index">
                    <section class="item_left">
                        <img :src="imgBaseUrl+item.image_path" class="restaurant_img">
                    </section>
                    <section class="item_right">
                        <div class="item_right_text">
                            <p>
                                <span>{{item.name}}</span>
                            </p>
                            <p>月售{{item.month_sales||item.recent_order_num}}单</p>
                            <p>{{item.delivery_fee||item.float_minimum_order_amount}}元起送/距离{{item.distance}}公里</p>
                        </div>
                    </section>
                </router-link>
            </ul>
        </section>
        <div class="search_none" v-else>
            <span>很抱歉! 无搜索结果</span>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default{
        data () {
            return {
                imgBaseUrl: '//www.test2.com',
                noSearchShops: false
            }
        },
        computed: {
            ...mapState(['searchShops'])
        },
        watch: {
            searchShops (value) {
                if (!value.length) {
                    this.noSearchShops = true
                } else {
                    this.noSearchShops = false
                }
            }
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import "../../common/stylus/mixins.styl"
    .list
        width 100%
        height 100%
        .list_container
            width 100%
            .list_li
                display flex
                flex-flow row nowrap
                padding 5px
                bottom-border-1px(rgba(255,128,194,.2))
                &:last-child
                    border-none()
                    margin-bottom 0
                .item_left
                    display block
                    box-sizing border-box
                    width 23%
                    height 60px
                    padding-right 10px
                    text-align center
                    .restaurant_img
                        display block
                        width 100%
                        height 100%
    .search_none
        width 100%
        text-align center
        vertical-align middle
        span
            display inline-block
            font-size 16px
            letter-spacing 1px
</style>
