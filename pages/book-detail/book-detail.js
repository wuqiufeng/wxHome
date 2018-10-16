// pages/book-detail/book-detail.js

import {
  BookModel
} from '../../models/book.js'

import { LikeModel } from '../../models/like.js'

const likeModel = new LikeModel()
const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    likeStatus: false,
    comments: [],
    likeCount: 0,
    posting: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    const bid = options.bid
    // console.log(bid)
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)    

    // 全部完成后执行then,并行 .race竞争
    Promise.all([detail,comments,likeStatus])
    .then(res=>{
      console.log(res)
      this.setData({
        book: res[0],
        comments:res[1].comments,
        likeStatus:res[2].like_status,
        likeCount:res[2].fav_nums,
      })

      wx.hideLoading()
    })
    

    // detail.then(res => {
    //   console.log(res)
    //   this.setData({
    //     book: res
    //   })
    // })

    // likeStatus.then(res => {
    //   console.log(res)
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // })

    // comments.then(res => {
    //   console.log(res)
    //   this.setData({
    //     comments: res.comments
    //   })
    // })
  },

  onLike: function (event) {
    // console.log(event)
    const behavior = event.detail.behavior
    likeModel.like(behavior, this.data.book.id, 400)
  },

  onFakePost: function (event) {
    this.setData({
      posting: true,
    })
  },

  onCancel: function (event) {
    this.setData({
      posting: false,
    })
  },

  onPost: function (event) {
    
    const content = event.detail.text || event.detail.value

    // if (!content || content.match(/^\s+$/)) {
    //   console.log("111111")
    //   return
    // }


    if (!content) {
      console.log("111111")
      return
    }

    if (content.length > 12) {
      wx.showToast({
        title: "短评最多12个字",
        icon: "none"
      })
    }

    bookModel.postComment(this.data.book.id, content)
      .then(res=>{
        wx.showToast({
          title:'+1',
          icon:'none'
        }) 

        this.data.comments.unshift({
          content:content,
          nums:1,
        })

        this.setData({
          comments:this.data.comments,
          posting:false,
        })

      })
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