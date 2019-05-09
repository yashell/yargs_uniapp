<template>
	<view class='map' >
		<map id="myMap" class='myMap' show-location='true' :markers='markers'
		 :polyline="polyline" :longitude="longitude" :latitude="latitude"></map>

		<cover-image class='bus_loc' src='/static/images/map_1.png'  @click='moveToLocation'></cover-image>
		<cover-image class='bus_route' src='/static/images/map_route.png' @click="line" ></cover-image>
		<cover-image class='bus_site' src='/static/images/map_site.png'></cover-image>
		<cover-image class='bus_code' src='/static/images/map_SweepCode.png' @click='sweepCode'></cover-image>


		<cover-view class="bus_city">
			<cover-image class='bus_city_loc' src='/static/images/loc.png'></cover-image>
			{{city}}
		</cover-view>



		<cover-view class="bus">
			<cover-view class='bus_top'>
				<cover-view class='bus_top_left'>簸箕乡</cover-view>
				<cover-view class='bus_top_mid'>30公里</cover-view>
				<cover-view class='bus_top_left'>威信客运站</cover-view>
			</cover-view>
			<cover-view class='bus_bot'>

				<cover-view class='bus_del_T'>
	 			<cover-view class='bus_del_one'  v-for="(item,index) in List" :key="item.id" >
	 				<cover-view class='bus_del_left'>
	 					<cover-view>运</cover-view>
	 					<cover-view>输</cover-view>
	 					<cover-view>中</cover-view>
	 				</cover-view>
	 				<cover-view class='bus_del_right'>
	 					<cover-view class='bus_del_right_A'>{{item.VIN}}</cover-view>
	 					<cover-view class='bus_del_right_B'>{{item.SaleSeats}}/{{item.Seating}}座</cover-view>
	 				</cover-view>
	 
	 
	 			</cover-view>
	 		</cover-view>

			</cover-view>
		</cover-view>

	</view>



</template>

<script>
	var mapHTTP = "https://apis.map.qq.com";
	var mapKey = "6ZCBZ-5ZIKF-VAWJ4-NKQI2-6PN6J-UXF4O"
	var dataHTTP = "https://llyapi.laiyunyou.cn/NKOrderManage/NK_Station/GetNKInfo"
	const util = require('../../utils/util.js');
	export default {
		data() {
			return {
				city: "定位中",
				longitude: 102.6621401310,
				latitude: 25.0585733749,
				markers: [], //点
				polyline: [], //线
				inpoints: [], //地图飞的范围
				List: [],

			}
		},
		methods: {
			/**
			 * 通过经纬度获取城市名
			 */
			loadcity() {
				var that = this;
				uni.getLocation({
					success: function(res) {
						console.log(res)
						var longitude = res.longitude
						var latitude = res.latitude
						uni.request({
							url: mapHTTP + '/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&get_poi=0&key=' + mapKey,
							data: {},
							header: {
								'Content-Type': 'application/json'
							},
							success: function(res) {
								console.log(res)
								that.city = res.data.result.address_component.city
								// success  
							},
							fail: function() {
								page.setData({
									currentCity: "获取定位失败"
								});
							},
						})


					},
					fail: function(res) {
						console.log("未获得地理位置信息")
						console.log(res)
					}

				})



			},

			/**
			 * 绘线
			 */
			drawLine() {

				uni.showLoading({
					title: '加载中',
				})
				var that = this;
				uni.request({
					url: dataHTTP,
					data: {
						beginStationId: 820,
						endStationId: 152
					},
					header: {
						'Content-Type': 'application/json'
					},
					success: function(res) {
						// success  

						uni.hideLoading();

						console.log(res)


						var points = []

						var arrA = res.data.resultdata.NK_RouteInfo.DrawingPoint;
						var arrB = arrA.split(";");


						for (var i = 0; i < arrB.length; i++) {
							var arrC = arrB[i];
							var arrD = arrC.split(",");
							var obj = {
								longitude: arrD[0],
								latitude: arrD[1],
							}
							points.push(obj)
						}

						console.log(points)
						var polyline = [{
							points: points,
							color: "#2894f8",
							width: 4,
						}]


						var mapC = uni.createMapContext('myMap')
						mapC.includePoints({
							padding: [80, 0, 200, 0],
							points: [{
									longitude: points[0].longitude,
									latitude: points[0].latitude
								},
								{
									longitude: points[points.length - 1].longitude,
									latitude: points[points.length - 1].latitude
								}
							]
						})


						//赋值
						that.List = res.data.resultdata.NKCarList;
						that.polyline = polyline;
						that.inpoints = [{
								longitude: points[0].longitude,
								latitude: points[0].latitude
							},
							{
								longitude: points[points.length - 1].longitude,
								latitude: points[points.length - 1].latitude
							}
						];






						that.markers = [{
								iconPath: "/static/images/map_start.png",
								id: 0,
								latitude: points[0].latitude,
								longitude: points[0].longitude,
								width: 12,
								height: 12,
								callout: {
									content: res.data.resultdata.NK_RouteInfo.BeginStationName, //文本
									bgColor: "#ffffff", //背景色
									borderColor: "#cccccc", //边框色
									borderWidth: 1, //边框宽度
									textAlign: "center", //文本对齐方式
									padding: 3, //文本边缘留白
									borderRadius: 1, //边框圆角
									display: "ALWAYS",
								}
							},
							{
								iconPath: "/static/images/map_end.png",
								id: 1,
								latitude: points[points.length - 1].latitude,
								longitude: points[points.length - 1].longitude,
								width: 12,
								height: 12,
								callout: {
									content: res.data.resultdata.NK_RouteInfo.EndStationName, //文本
									bgColor: "#ffffff", //背景色
									borderColor: "#cccccc", //边框色
									borderWidth: 1, //边框宽度
									textAlign: "center", //文本对齐方式
									padding: 3, //文本边缘留白
									borderRadius: 1, //边框圆角
									display: "ALWAYS",

								}
							}
						];



					},
					fail: function() {
						page.setData({
							currentCity: "获取定位失败"
						});
					},
				})

			},

			/**
			 * 点地图上的路线
			 */
			 line:function(){
				uni.createMapContext('myMap').includePoints({
			  padding: [80, 0, 200, 0],
			  points: this.inpoints
			})
			},
				/**
			 * 点地图自己的定位
			 */
			  moveToLocation: function() {
    uni.createMapContext('myMap').moveToLocation()
  },
		/**
	* 点地图自己的定位
	*/
	sweepCode: function(e) {
		 util.sweepCode();
  },

		},
		onLoad() {

			this.loadcity();
			this.drawLine();
		}

	}
</script>

<style scoped lang="scss">
	@import "static/css/main.scss";


	.map {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		flex: 1;

	}

	.myMap {
		width: 100%;
		height: 100%;
	}

	.bus_loc {
		position: absolute;
		left: 30rpx;
		bottom: 270rpx;
		width: 75rpx;
		height: 75rpx;
	}

	.bus_route {
		position: absolute;
		right: 20rpx;
		top: 30rpx;
		width: 75rpx;
		height: 75rpx;
	}

	.bus_site {
		position: absolute;
		right: 20rpx;
		top: 135rpx;
		width: 75rpx;
		height: 75rpx;
	}

	.bus_code {
		position: absolute;
		right: 20rpx;
		top: 240rpx;
		width: 75rpx;
		height: 75rpx;
	}

	.bus_city {
		position: absolute;
		left: 30rpx;
		top: 30rpx;
		width: 110rpx;
		height: 72rpx;
		line-height: 72rpx;
		font-size: 30rpx;
		border-radius: 15rpx;
		background-color: rgba(255, 255, 255, .8);
		border: 1rpx solid #ccc;
		padding-left: 60rpx;
		overflow: hidden;
	}

	.bus_city_loc {
		position: absolute;
		top: 10rpx;
		left: 0rpx;
		width: 50rpx;
		height: 50rpx;
	}

	.bus {
		width: 690rpx;
		height: 200rpx;
		position: absolute;
		left: 30rpx;
		/* box-shadow: 0 0 5px #666; */
		bottom: 50rpx;
		border: 1upx solid #666666;
		background-color: rgba(255, 255, 255, .9);
		display: flex;
		flex-direction: column;

	}

	.bus_top {
		width: 690rpx;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		/* box-shadow: 0 0 5px #666; */

		background-color: rgba(255, 255, 255, .9);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.bus_top_left {
		width: 200rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 26rpx;


	}

	.bus_top_mid {
		font-size: 22rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 100rpx;
		flex-grow: 1;
		color: #666666;

	}

	.bus_del {
		position: absolute;
		z-index: 999999;
		bottom: 50rpx;
		left: 50rpx;
		width: 650rpx;
		height: 110rpx;
		display: flex;
		flex-direction: row;
	}

	.bus_bot {
		width: 650rpx;
		height: 110rpx;
		margin-left: 20rpx;
		overflow-x: auto;
		overflow-y: hidden;


	}

	.bus_del_T {
		width: 890rpx;
		height: 90rpx;
		float: left;
	}

	.bus_del_one {
		width: 200rpx;
		height: 80rpx;
		font-size: 36rpx;
		float: left;
		text-align: left;
		border: 1rpx solid #134272;
		line-height: 80rpx;
		margin-right: 20rpx;
		display: flex;

		flex-direction: row;
	}

	.bus_del_left {
		width: 40rpx;
		height: 80rpx;
		font-size: 20rpx;
		text-align: center;
		line-height: 26rpx;
		color: #ffffff;
		background-color: #134272;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.bus_del_right {
		width: 145rpx;
		height: 80rpx;
		display: flex;
		margin-left: 15rpx;
		flex-direction: column;
		justify-content: center;
	}

	.bus_del_right_A {
		font-size: 30rpx;
		color: #000000;
		line-height: 45rpx;
		font-weight: bold;
		height: 45rpx;
	}

	.bus_del_right_B {
		font-size: 22rpx;
		color: #b5b5b5;
		line-height: 30rpx;
		height: 35rpx;
	}
</style>
