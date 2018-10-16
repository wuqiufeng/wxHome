// components/search/index.js
import { KeywordModel } from '../../models/keyword.js'

import { BookModel } from '../../models/book.js'

import { paginationBeh } from '../../components/behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()


Component({

  behaviors: [paginationBeh],
  /**
   * 组件的属性列表 
   */
  properties: {
    more: {
      type: String,
      observer: 'loadMore',
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    // dataArray: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter:false,
    noneResult: false
  },

  attached() {
    // const historyWords = keywordModel.getHistory()
    // const hotWords = keywordModel.gethot()

    this.setData({
      historyWords: keywordModel.getHistory(),
    })
    // console.log(this.data.historyWords)

    keywordModel.gethot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
    // hotWords.then(res => {
    //   console.log(res.hot)
    //   this.setData({
    //     hotWords: res.hot
    //   })
    // })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      
      let q = event.detail.value || event.detail.text
      this.setData({
        q: q
      })
      bookModel.search(0, q).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },

    onCancel: function (event) {
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },

    onDelete(event) {
      this.initialize()
      this._closeResult()
    },

    loadMore(event) {
      console.log("load more" + this.data.q)

      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }

      // let length = this.data.dataArray.length
      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q)
          .then(res => {
            // const tempArray = this.data.dataArray.concat(res.books)
            // this.setData({
            //   dataArray: tempArray
            // })
            this.setMoreData(res.books)
            this.unLocked()
          },()=>{
            this.unLocked()
          })
      }
    },


    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q:''
      })
    },

    


    _showLoadingCenter(){
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter(){
      this.setData({
        loadingCenter: false
      })
    }

    // scroll-view | Page onReachBottom
  }
})
