// components/dashBoard/essay/essay.js
Component({
  lifetimes: {
    attached() {
      // String(['', '']) returns ',' 
      if (this.properties.validator === ',') {
        this.setData({
          validator: 'text'
        })
      }
    }
  },
  properties: {
    validator: {
      type: String,
      value: 'text'
    }
  },

  data: {
  },

  methods: {
    onTypeChange(event) {
      this.properties.validator = event.detail.value
    }
  }
})
