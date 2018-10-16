// pages/login/login.js

import {
  LoginModel
} from '../../models/login.js'
let loginModel = new LoginModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  onSubmit: function(event) {
    console.log(event)
    let account = event.detail.value.email
    let secret = event.detail.value.password

    const token = loginModel.getToken(account, secret)
    token.then(res => {
        console.log(res)
        wx.setStorageSync('token', res.token)
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        })

        wx.switchTab({
          url: '../classic/classic'
        })
      },
      error => {
        wx.showToast({
          title: '登录失败',
          icon: 'cancel',
          duration: 2000
        })
      }
    )

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})