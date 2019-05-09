<template>
    <view class="content">
        <view class="btn-row">
            <button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
            <button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
        </view>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
        computed: {
            ...mapState(['hasLogin', 'forcedLogin'])
        },
        methods: {
            ...mapMutations(['logout']),
            bindLogin() {
                uni.navigateTo({
                    url: '../login/login',
                });
            },
            bindLogout() {
                this.logout();
                /**
                 * 如果需要强制登录跳转回登录页面
                 */
                if (this.forcedLogin) {
                    uni.reLaunch({
                        url: '../login/login',
                    });
                }
            }
        },
		onLoad(){
			 if (!this.hasLogin) {
			    uni.showModal({
			        title: '未登录',
			        content: '您未登录，需要登录后才能继续',
			        /**
			         * 如果需要强制登录，不显示取消按钮
			         */
			        showCancel: !this.forcedLogin,
			        success: (res) => {
			            if (res.confirm) {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
			                if (this.forcedLogin) {
			                    uni.reLaunch({
			                        url: '../login/login'
			                    });
			                } else {
			                    uni.navigateTo({
			                        url: '../login/login'
			                    });
			                }
			            }
			        }
			    });
			}
			
		}
    }
</script>

<style>

</style>
