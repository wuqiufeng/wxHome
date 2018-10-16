// pages/my/my.js

import { ClassicModel } from '../../models/classic.js'
import { BookModel } from '../../models/book.js'


let bookModel = new BookModel()

let classicModel = new ClassicModel()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: true,
    userInfo: null,
    myBooksCount: 0,
    classics: [],
  },

  onPreviewTap(event) {
    console.log(event)
    wx.navigateTo({
      url: '/pages/classic-detail/index?cid=' + event.detail.cid + '&type=' + event.detail.type
    })
  },

  onGetUserInfo(event) {
    let userInfo = event.detail.userInfo
    console.log(userInfo)
    if (userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo: userInfo
      })
    }
  },

  hasGottenUserInfo: function () {
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (data) => {
              this.setData({
                hasUserInfo: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          this.setData({
            hasUserInfo: false
          })
        }
      }
    })
  },

  getMyFavor: function () {
    classicModel.getMyFavor((data) => {
      this.setData({
        classics: data
      })
    })
  },


  onJumpToAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  getMyBookCount() {
    const bookCount = bookModel.getMyBookCount()
    bookCount.then(res=>{
      // console.log(res)
      this.setData({
        myBooksCount: res.count
      })
    })
    // console.log("12122222")
    // bookModel.getMyBookCount((data) => {
    //   console.log(data)
    //   this.setData({
    //     myBooksCount: data.count
    //   })
    // })

    // console.log(this.data.myBooksCount)
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getMyFavor()
    this.hasGottenUserInfo()
    this.getMyBookCount()
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