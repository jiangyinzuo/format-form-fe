// components/dashBoard/essay/essay.js
Component({
  properties: {
    validator: {
      type: Object,
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
