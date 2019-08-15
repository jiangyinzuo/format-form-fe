let genericQuestionBehavior = Behavior({
  behaviors: [],
  lifetimes: {
    attached() {
      console.log(this.properties.info)
    },
  },
  properties: {
    info: Object,
    order: Number
  },
  data: {
    _validate: true,
    _errMsg: '此题不能为空, 请输入',
  },

  methods: {
    
  }
})

export { genericQuestionBehavior }