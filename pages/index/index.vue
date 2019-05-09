<template>

	<view class="page">
		<view class='head'>
			<image src="/static/images/menu.png" class="meun" bindtap='showview' />

			<view class='headright'>
				<image src="/static/images/rote.png" class="myrotate"></image>
				<text>当前位置：</text>
				<text class='nowcity' bindtap='goIndexList'>昆明市</text>
			</view>

		</view>
		
	

		<swiper class="slidet" indicator-dots="true" autoplay="true" interval="3000" duration="1000" circular="true">
			
			
			<swiper-item  v-for="(item,index) in arr" :key="item.id">
				<image :src="item"   class="slide-image"/>
			</swiper-item>
		</swiper>


		<scroll-view class='loT' scroll-x="true">
			<view class='loT1'>
				<image class='lo' src='/static/images/lo_1.png'></image>
				<image class='lo' src='/static/images/lo_2.png'></image>
				<image class='lo' src='/static/images/lo_3.png'></image>
				<image class='lo' src='/static/images/lo_4.png'></image>
				<image class='lo' src='/static/images/lo_5.png'></image>
				<image class='lo' src='/static/images/lo_6.png'></image>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
			
				arr: ["/static/images/swiper1.jpg", "/static/images/swiper2.jpg", "/static/images/swiper3.jpg", "/static/images/swiper4.jpg"],
	

			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	@import "static/css/main.scss";
	.page { 
		position:absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: $m_color;
	}

	.myrotate {
		width: 35rpx;
		height: 35rpx;
		margin-right: 10rpx;
		animation-name: myfirst;
		/*动画的名称 */
		animation-duration: 2000ms;
		/*动画从开始到结束的时间*/
		animation-timing-function: linear;
		/*动画执行快慢的参数*/
		animation-iteration-count: infinite;
		/*动画执行多少次的参数*/
		/*以下是兼容ios所需，参数意义与上相同*/
		-webkit-animation-name: myfirst;
		-webkit-animation-duration: 2000ms;
		-webkit-animation-timing-function: linear;
		-webkit-animation-iteration-count: infinite;
	}

	@keyframes myfirst {

		/*开始转的角度*/
		from {
			transform: rotate(0deg);
		}

		/*结束的角度*/
		to {
			transform: rotate(360deg);
		}
	}

	/*兼容ios*/
	@-webkit-keyframes myfirst {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	/* 主页 */
	.home {
		position: absolute;
		width: 750rpx;
		height: 100%;
		background-color: #134272;
		z-index: 1;
		transition: All 0.4s ease;
		-webkit-transition: All 0.4s ease;
	}

	/* 遮罩层 */
	.bg {
		display: none;
		position: fixed;
		top: 0%;
		left: 70%;
		width: 100%;
		height: 100%;
		background-color: #000000;
		z-index: 1001;
		-moz-opacity: 0.3;
		opacity: 0.30;
		transition: width 2s;
		filter: alpha(opacity=30);
	}

	/* 侧滑栏 */
	.page_tab {
		height: 100%;
		width: 750rpx;
		position: fixed;
		background-color: #144980;
		color: #9fc8f3;
		z-index: 0;
	}



	.userinfo {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.userinfo-avatar {
		width: 128rpx;
		height: 128rpx;
		margin: 20rpx;
		border-radius: 50%;
	}

	.userinfo-nickname {
		color: #aaa;
	}

	.usermotto {
		margin-top: 200px;
	}

	.pic {
		width: 70px;
		height: 70px;
	}

	.slidet {
		width: 750rpx;
		height: 750rpx;
	}

	.slide-image {
		width: 750rpx;
		height: 750rpx;
	}



	.meun {
		width: 50rpx;
		height: 50rpx;
	}

	.head {
		width: 730rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		color: #397bbf;
		font-size: 30rpx;
		margin: 25rpx 10rpx;
	}

	.headright {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.nowcity {
		color: #77ace2;
	}

	.mymap {
		position: absolute;
		left: 0rpx;
		right: 0rpx;
		height: 900rpx;
	}


	.lo {
		width: 150rpx;
		height: 150rpx;
		margin: 20rpx;
	}

	.loT {
		width: 750rpx;
		height: 200rpx;
	}

	.loT1 {
		width: 1140rpx;
		height: 200rpx;
	}

	.page_tab_item {
		height: 100rpx;
		width: 500rpx;
		padding-left: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.page_tab-line {
		height: 3rpx;
		background-color: #25629f;
	}
</style>
