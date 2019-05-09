
const formatTime = date => {

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const HTTP="httpfsafsa";


/*
* 图片预览
* @param 
* @e Dom
*/
function showpic(e, picList) {
  var url = picList;
    // url.push(e.currentTarget.dataset.url)
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: url
      // 需要预览的图片http链接列表
    })
}


function getImgUrl(fileId){
  wx.cloud.getTempFileURL({
    fileList: [fileId],
    success: res => {
      uploadImg(res.fileList[0].tempFileURL)
    },
    fail: err => {
      // handle error
    }
  })
}


/*
* 上传图片
* @param 
* @fileURL 图片的网址
*/
function uploadImg(fileURL) {
  wx.cloud.init({
    traceUser: true,
    env: 'yargs-jsdemo01'
  })
  const db = wx.cloud.database();
  const _ = db.command

  db.collection('album').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
      title: "111",
      author: "yargs",
      description: '该图片暂无详细',
      systm: new Date(),
      remake: "",
      type: "album",
      tempFileURL: fileURL,
      is: true
    },
    success(res) {
      return res;
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
      wx.hideLoading();
    }
  })

}

/*
* 设置背景颜色
* @param 
* @fileURL 图片的网址
*/
function setBgColor(color){
wx.setBackgroundColor({
  backgroundColorTop: color, // 顶部窗口的背景色为白色
  backgroundColor: color, // 窗口的背景色为白色
  backgroundColorBottom: color, // 底部窗口的背景色为白色
})
}

/*
* 获取二维码
*/
function sweepCode(){
  var that = this;
  var show;
  uni.scanCode({
    success: (res) => {
      this.show = res.result;
      uni.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
    },
    fail: (res) => {
      uni.showToast({
        title: '失败',
        icon: 'success',
        duration: 2000
      })
    },
    complete: (res) => {
    }
  })
}


/*
* 获取用户权限
* @param
*/
function getAuthor() {
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      var latitude = res.latitude
      var longitude = res.longitude
      var speed = res.speed
      var accuracy = res.accuracy
    }
  })
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.userLocation']) {
        openSetting();
      }
    }
  })
}

/*
* 获取地图
* @param
*/
function map(){
  wx.getLocation({
    type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    success: function (res) {
      var latitude = res.latitude
      var longitude = res.longitude
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        name: "我的位置",
        address: "黄泉路444号",
        scale: 28
      })
    }
  })
}


/*
* 指纹解锁
* @param
*/
function fingerLock() {
  wx.showLoading({
    title: '加载中',
  })
  if (wx.canIUse('checkIsSupportSoterAuthentication')) { // 检测当前微信版本是否支持调用指纹相关接口
    wx.checkIsSupportSoterAuthentication({
      success(res) {
        if (res.supportMode[0] == 'fingerPrint') { // 写法不严谨，正确写法应该是遍历数组查找
          // 在此具体调用指纹识别
          console.log("指纹识别")
          console.log(res)

          wx.hideLoading();
          wx.startSoterAuthentication({
            requestAuthModes: ['fingerPrint'],
            challenge: '123456',
            authContent: '请用指纹解锁',
            success(res) {
               wx.navigateTo({
                url: '/pages/user/password/password',
              })
              // res 中包含授权数据，需要进一步验证正确性
            },
            fail(res) {
              console.log('用户取消了指纹识别，或调用出现错误');
             wx.redirectTo({
               url: '/pages/user/user',
             })
            }
          })

        } else {
          console.log('当前设备不支持指纹识别')
        }

      }
    })
  }

}



/*
* 拨打电话
* @param
*/
function callphone(phone) {
  wx.makePhoneCall({
    phoneNumber: phone //仅为示例，并非真实的电话号码
  })
}







module.exports = {
  formatTime: formatTime,

  HTTP: HTTP,
  showpic: showpic, //图片预览插件
  sweepCode: sweepCode, //扫描二维码插件
  map:map, //获取地图
  callphone: callphone, //拨打电话
  setBgColor: setBgColor, //设置背景颜色
  fingerLock: fingerLock,
  getAuthor: getAuthor,
  getImgUrl: getImgUrl

}

