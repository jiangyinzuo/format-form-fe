// components/editPage/settings/settings.js
Component({
  lifetimes: {
    attached() {
      this.setData({
        setStartTime: this.properties.startTime !== '',
        setEndTime: this.properties.endTime !== ''
      })
    }
  },
  properties: {
    showSelectRes: Boolean,
    repeatFilling: Boolean,
    endTime: String,
    startTime: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    setStartTime: false,
    setEndTime: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    done() {
      this.triggerEvent('settingChanged', {
        showSelectRes: this.properties.showSelectRes,
        endTime: this.properties.endTime,
        startTime: this.properties.startTime,
        repeatFilling: this.properties.repeatFilling 
      }, {})
    },
    onChangeShowSelectRes(event) {
      this.properties.showSelectRes = event.detail.value
    },
    onChangeRepeatFilling(event) {
      this.properties.repeatFilling = event.detail.value
    },
    onChangeSetStartTime(event) {
      this.setData({
        setStartTime: event.detail.value
      })
    },
    onChangeStartTime(event) {
      this.properties.startTime = event.detail.value
    },
    onChangeSetEndTime(event) {
      this.setData({
        setEndTime: event.detail.value
      })
    },
    onChangeEndTime(event) {
      this.properties.endTime = event.detail.value
    }
  }
})
