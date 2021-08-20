<template>
    <section class="loginContainer">
        <div class="loginInner">
            <div class="login_header">
                <h2 class="login_logo">硅谷外卖</h2>
                <div class="login_header_title">
                    <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
                    <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
                </div>
            </div>
            <div class="login_content">
                <form @submit.prevent="login">
                    <div v-if="loginWay" class="on">
                        <section class="login_message">
                            <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" ref="phoneInput">
                            <button :disabled="!rightPhone" class="get_verification"
                            :class="{right_phone:rightPhone}" @click.prevent="getCode">
                                {{computeTime ? `已发送(${computeTime}s)` : "获取验证码"}}</button>
                        </section>
                        <section class="login_verification">
                            <input type="tel" maxlength="8" placeholder="验证码" v-model="code" ref="codeInput">
                        </section>
                        <section class="login_hint">
                            温馨提示：未注册硅谷外卖账号的手机号，登录时将自动注册，且代表已同意
                            <a href="javascript:;">《用户服务协议》</a>
                        </section>
                    </div>
                    <div v-else class="on">
                        <section>
                            <section class="login_message">
                                <input type="text" maxlength="11" placeholder="手机/邮箱/用户" v-model="name" ref="nameInput">
                            </section>
                            <section class="login_verification2">
                                <input type="password" maxlength="8" placeholder="密码" v-if="!showPwd" v-model="pwd" ref="pwdInput1">
                                <input type="text" maxlength="8" placeholder="密码" v-else v-model="pwd" ref="pwdInput2">
                                <div class="switch_botton" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                                    <div class="switch_circle" :class="{right:showPwd}"></div>
                                    <span class="switch_text">{{showPwd?'abc':''}}</span>
                                </div>
                            </section>
                            <section class="login_message">
                                <input maxlength="11" placeholder="验证码" v-model="captcha" ref="captchaInput">
                                <img class="get_verification" src="http://localhost:5000/captcha" alt="captcha" @click="getCaptcha" ref="captcha">
                            </section>
                        </section>
                    </div>
                    <button class="login_submit">登录</button>
                </form>
                <a href="javascript:;" class="about_us">关于我们</a>
            </div>
            <a href="javascript:;" class="go_back" @click="$router.back()">
                <i class="iconfont icon-jiantou"></i>
            </a>
        </div>
        <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip(num)"/>
    </section>
</template>
<script>
    import AlertTip from '../../components/AlertTip/AlertTip.vue'
    import {reqSendCode, reqPwdLogin, reqSmsLogin} from '../../api'
    export default{
        data () {
            return {
                loginWay: true, // true代表短信登录
                showPwd: false, // 是否显示密码
                phone: '', // 手机号
                computeTime: 0, // 计时的时间
                name: '',
                pwd: '', // 密码
                code: '', // 短信验证码
                captcha: '', // 图形验证码
                alertText: '', // 提示文本
                alertShow: false, // 是否显示提示框
                num: 0
            }
        },
        computed: {
            rightPhone () {
                return /^1\d{10}/.test(this.phone)
            }
        },
        methods: {
            // 异步获取短信验证码
            async getCode () {
                // 如果当前没有计时
                if (!this.computeTime) {
                    // 启动倒计时
                    this.computeTime = 30
                    this.intervalId = setInterval(() => {
                        this.computeTime--
                        if (this.computeTime <= 0) {
                            this.computeTime = 0
                            clearInterval(this.intervalId)
                        }
                    }, 1000)
                    // 发送ajax请求（向指定手机号发送验证码）
                    const result = await reqSendCode(this.phone)
                    if (result.code === 1) {
                        // 显示提示
                        this.showAlert(result.msg)
                        // 停止倒计时
                        if (this.computeTime) {
                            this.computeTime = 0
                            clearInterval(this.intervalId)
                            this.intervalId = undefined
                        }
                    }
                }
            },
            showAlert (alertText, num) {
                this.alertShow = true
                this.alertText = alertText
                this.num = num
            },
            // 异步登录
            async login () {
                let result
                // 前台表单验证
                if (this.loginWay) { // 短信登录
                    const {rightPhone, phone, code} = this
                    if (!rightPhone) {
                        // 手机号不正确
                        this.showAlert('手机号不正确', 1)
                        return
                    } else if (!/^\d{6}$/.test(code)) {
                        // 验证码必须是6位数字
                        this.showAlert('验证码必须是6位数字', 2)
                        return
                    }
                    // 发送ajax请求短信登录
                    result = await reqSmsLogin(phone, code)
                } else {
                    const {name, pwd, captcha} = this
                    if (!name) {
                        // 用户名必须指定
                        this.showAlert('用户名必须指定', 3)
                        return
                    } else if (!pwd) {
                        // 密码必须指定
                        this.showAlert('密码必须指定', 4)
                        return
                    } else if (!captcha) {
                        // 验证码必须指定
                        this.showAlert('验证码必须指定', 5)
                        return
                    }
                    // 发送ajax请求密码登录
                    result = await reqPwdLogin({name, pwd, captcha})
                }
                // 点击登录后停止计时
                if (this.computeTime) {
                    this.computeTime = 0
                    clearInterval(this.intervalId)
                    this.intervalId = undefined
                }
                // 根据结果数据处理
                if (result.code === 0) {
                    const user = result.data
                    // 将user保存到vuex的state
                    this.$store.dispatch('recordUser', user)
                    // 去个人中心界面
                    this.$router.replace('/profile')
                } else {
                    const msg = result.msg
                    // 显示警告提示
                    this.showAlert(msg)
                    // 显示图片验证码
                    this.getCaptcha()
                    this.captcha = ''
                }
            },
            // 关闭警告框
            closeTip (num) {
                this.alertShow = false
                this.alertText = ''
                if (num === 1) {
                    this.$refs.phoneInput.focus()
                } else if (num === 2) {
                    this.$refs.codeInput.focus()
                } else if (num === 3) {
                    this.$refs.nameInput.focus()
                } else if (num === 4) {
                    if (!this.showPwd) {
                        this.$refs.pwdInput1.focus()
                    } else {
                        this.$refs.pwdInput2.focus()
                    }
                } else if (num === 5) {
                    this.$refs.captchaInput.focus()
                }
                this.num = 0
            },
            // 获取一个新的图片验证码
            getCaptcha () {
                // 每次指定的src要不一样，不是ajax请求没有跨域问题
                this.$refs.captcha.src = 'http://localhost:5000/captcha?time=' + Date.now()
            }
         },
        components: {
            AlertTip
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import "../../common/stylus/mixins.styl"
    .loginContainer
        width 100%
        height 100%
        background #fff
        .loginInner
            padding-top 60px
            width 80%
            margin 0 auto
            .login_header
                .login_logo
                    font-size 40px
                    font-weight bold
                    color #02a774
                    text-align center
                .login_header_title
                    padding-top 40px
                    text-align center
                    >a
                        color #333
                        font-size 14px
                        padding-bottom 4px
                        &:first-child
                            margin-right 40px
                        &.on
                            color #02a774
                            font-weight 700
                            border-bottom 2px solid #02a774
            .login_content
                text-align: center
                >form
                    >div
                        display none
                        &.on
                            display block
                        input
                            clearFix()
                            margin-top 10px
                            width 100%
                            height 40px
                            text-indent 10px
                            font-size 14px
                            margin-bottom 10px
                            border none
                            border 1px solid rgba(120,120,120,.2)
                            letter-spacing 1px
                        .login_message
                            position relative
                            button
                                position absolute
                                top 10px
                                right 0px
                                border none
                                height 40px
                                line-height 40px
                                width 80px
                            img
                                position absolute
                                width 100px
                                top 13px
                                right 10px
                            .get_verification
                                &.right_phone
                                    color black
                        .login_verification2
                            position relative
                            .switch_botton
                                display inline-block
                                right 5px
                                top 23px
                                position absolute
                                width 46px
                                height 16px
                                border 1px solid #ddd
                                border-radius 10px
                                .switch_text
                                    color #ddd
                                &.on
                                    background-color #02a774
                                .switch_circle
                                    position absolute
                                    top -1px
                                    left -1px
                                    width 16px
                                    height 16px
                                    border 1px solid #ddd
                                    border-radius 50%
                                    background #fff
                                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                                    transition transform .3s
                                    &.right
                                        transform translateX(30px)
                        .login_hint
                            width 100%
                            font-size 12px
                            color #02a774
                            word-spacing 5px
                            letter-spacing 1.64px
                    .login_submit
                        width 100%
                        clearFix()
                        margin-top 30px
                        height 35px
                        border none
                        border-radius 5px
                        background-color #1FA709
                        color #fff
                        font-size 14px
                        margin-bottom 20px
                .about_us
                    margin 0 auto
                    width 60px
                    display inline-block
                    font-size 12px
                    height 20px
                    text-align center
            .go_back
                position absolute
                top 10px
                left 10px
                display inline-block
                width 30px
                height 30px
                text-align center
                line-height 30px
                color #02a774
</style>
