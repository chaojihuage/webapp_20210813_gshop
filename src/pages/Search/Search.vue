<template>
    <div>
        <div class="search">
            <HeaderTop title="搜索"></HeaderTop>
            <form class="search_form" @submit.prevent="search">
                <input type="search" name="search" placeholder="请输入商家或美食名称" class="search_input" autocomplete="off" v-model="keyword">
                <input type="submit" name="submit" class="search_submit">
            </form>
        </div>
        <SearchList ref="searchlist"/>
    </div>
</template>

<script>
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
    import SearchList from '../../components/SearchList/SearchList.vue'
    export default {
        data () {
            return {
                keyword: ''
            }
        },
         components: {
            HeaderTop,
            SearchList
        },
        methods: {
            search () {
                // 得到搜索关键字
                const keyword = this.keyword.trim()
                // 进行搜索
                if (keyword) {
                    // this.$refs.searchlist.noSearchShops = false
                    this.$store.dispatch('searchShops', keyword)
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .search
        width 100%
        overflow hidden
        margin-bottom 10px
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
        .search_form
            clearFix()
            margin-top 45px
            background-color #fff
            padding 12px 8px
            .search_input
                height 35px
                padding 0 4px
                border none
                border-radius 10px
                font-weight bold
                outline none
                background-color rgba(55,202,169,.1)
                text-indent 5px
                font-size 14px
                width 80%
                margin-right 5px
                &::-moz-placeholder
                    color #4fb826
                &::-webkit-input-placeholder
                    color #4fb826
                &:-moz-placeholder
                    color #4fb826
                &:-ms-input-placeholder
                    color #4fb826
            .search_submit
                outline none
                border none
                border-radius 3px
                height 35px
                width 17%
                color #fff
                font-size: 16px
                background-color #02a774
</style>
