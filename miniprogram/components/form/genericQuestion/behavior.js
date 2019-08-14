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
    
  },

  methods: {
    
  }
})

export { genericQuestionBehavior }