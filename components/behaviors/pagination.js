const paginationBeh = Behavior({
    data: {
        dataArray: [],
        total: null,
        noneResult: false,
        loading:false
    },

    methods: {
        setMoreData(dataArray) {
            const tempArray = this.data.dataArray.concat(dataArray)
            this.setData({
                dataArray: tempArray
            })
        },

        getCurrentStart() {
            return this.data.dataArray.length
        },

        setTotal(total) {
            this.data.total = total
            if (total == 0) {
                this.setData({
                    noneResult: true,
                    dataArray:[]
                })
            }
        },

        hasMore() {
            if (this.data.dataArray.length >= this.data.total) {
                return false
            }
            else {
                return true
            }
        },

        initialize() {
            this.setData({
                dataArray: [],
                noneResult: false,
                loading:false
            })
            this.data.total = null
        },

        isLocked() {
            return this.data.loading ? true : false
        },

        locked() {
            // this.data.loading = true
            this.setData({
                loading: true
            })
        },

        unLocked() {
            // this.data.loading = false
            this.setData({
                loading: false
            })
        },

    }

})

export { paginationBeh }