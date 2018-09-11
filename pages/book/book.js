// pages/book/book.js

import { BookModel } from '../../models/book.js'


let bookModel = new BookModel()


Page({


  // 纯粹callback return 递归
  // promise 代码风格 多个异步一起返回
  // async await ES2017
  // 链式调用API 


  /**
   * 页面的初始数据
   */
  data: {
    books:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getHotList()
      .then(res => {
        console.log(res)
        this.setData({
          books:res,
        })
        return bookModel.getMyBookCount()
      })
      .then(res => {
        console.log(res)
        return bookModel.getMyBookCount()
      })
      .then(res => {
        console.log(res)
        return bookModel.getMyBookCount()
      })



    // const hotList = bookModel.getHotList()
    // hotList.then(
    //   res => {
    //     console.log(res)
    //     // const count = bookModel.getMyBookCount()
    //     bookModel.getMyBookCount()
    //       .then(res => {
    //         console.log(res)
    //         bookModel.getMyBookCount()
    //           .then(res => {
    //             console.log(res)
    //           })
    //       })
    //   }
    // ) 



    // pending resolve  reject 
    // 进行中   已成功    已失败    凝固
    // const promise = new Promise((resolve, reject) => { 
    //   wx.getSystemInfo({
    //     // success: (res) => {
    //     //   resolve(res)
    //     // },
    //     // fail: (error) => {
    //     //   reject(error)
    //     // }
    //     success:res=>resolve(res),
    //     fail:error=>reject(error),
    //   })
    // })

    // // promise.then(
    // //   (res) => {
    // //   console.log(res)
    // // }, (error) => {
    // //   console.log(error)
    // // })
    // promise.then(
    //   res=>console.log(res),
    //   error=>console.log(error)
    // )

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