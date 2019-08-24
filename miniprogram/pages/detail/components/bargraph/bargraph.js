// pages/detail/components/bargraph/bargraph.js
Component({
  lifetimes: {
    attached() {
      console.log(this.properties.question)
      for (let i in this.properties.statisticalRes.res) {
        this.data.total += this.properties.statisticalRes.res[i]
      }
      if (this.data.total === 0) {
        this.properties.statisticalRes.res.forEach(e => {
          this.data.rate.push('0.0%')
        })
      } else {
        this.properties.statisticalRes.res.forEach(e => {
          let _number = Number((e / this.data.total) * 100).toFixed(1)
          this.data.rate.push(_number + '%')
        })
      }

      this.setData({
        total: this.data.total,
        rate: this.data.rate
      })
      console.log(this.data.total, this.data.rate)
    }
  },
  properties: {
    question: Object,
    statisticalRes: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    total: 0,
    rate: []
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
