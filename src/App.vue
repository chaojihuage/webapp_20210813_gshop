<template>
  <div class="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  // import {reqFoodTypes} from './api/index.js'
  export default {
    components: {
      FooterGuide
    },
    // async mounted () {
    //   const result = await reqFoodTypes()
    //   console.log(result)
    // }
    mounted () {
      // this.$store.dispatch('getAddress')
      this.getAddress()
      this.getUserInfo()
    },
    methods: {
      ...mapActions(['getAddress', 'getUserInfo'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .app
        width 100%
        height 100%
        background #f5f5f5
</style>
