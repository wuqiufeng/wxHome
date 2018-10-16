// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale: 18,
    latitude: "",
    longitude: "",
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createMapContext 获取 map 上下文
    // this.mapCtx = wx.createMapContext('myMap')

    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy


        console.log(latitude)
        console.log(longitude)
        console.log(speed)
        console.log(accuracy)

        this.setData({
          latitude: latitude,
          longitude: longitude,
        })
      }

    })
  },

  // wx.chooseLocation({
  //   success:(res)=>{
  //     console.log(res.address)
  //   }
  // })

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})