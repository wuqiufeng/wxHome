import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'


let classicModel = new ClassicModel()
let likeModel = new LikeModel()


Page({

    /**
     * 页面的初始数据
     */
    data: {
        test: 1,
        classic: null,
        latest:true,
        first:false,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        classicModel.getLatest((res) => {
            this.setData({
                test:2,
                classic:res  
            })
            console.log(this.data)
        })



        // http.request({
        //     url: 'classic/latest',
        //     success: (res) => {
        //         console.log(res)
        //     }
        // })

        // console.log(this.data.test)
        // // let that = this

        // wx.request({
        //   url: 'http://bl.7yue.pro/v1/classic/latest',
        //   header: {
        //     appkey: "98HcsgdJ3mx4Ufcm"
        //   },
        //   // success:function(res){
        //   success: (res) => {
        //     // console.log(that.data.test),
        //     console.log(this.data.test),
        //       console.log(res)
        //   }
        // })
    },
    

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // let promise = new Promise((resolve, reject) => {
        //   wx.request({
        //     url: 'http://bl.7yue.pro/v1/classic/latest',
        //     header: {
        //       appkey: "98HcsgdJ3mx4Ufcm"
        //     },
        //     success: (res) => {
        //       resolve(res)
        //     }
        //   })
        // })
        // promise.then((res)=>{
        //   console.log(res)
        // })
    },

    onLike:function(event){
        // console.log(event)
        let behavior = event.detail.behavior
        likeModel.like(behavior,this.data.classic.id,
        this.data.classic.type)
    },


   

    onNext:function(event){
        this._updateClassic('next')
    },

    onPrevious:function(event){
        this._updateClassic('previous')
    },

    _updateClassic:function(nextOrPrevious){
        let index = this.data.classic.index
        classicModel.getClassic(index,nextOrPrevious,(res)=>{
            // console.log(res)
            this.setData({
                classic:res,
                latest:classicModel.isLaster(res.index),
                first:classicModel.isFirst(res.index),
            })
        })
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