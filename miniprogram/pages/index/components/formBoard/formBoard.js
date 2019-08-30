// components/formBoard/formBoard.js
import { IndexToDetailStore } from '../../../../dataStore/indexToDetail.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    form: Object,
    scene: {
      type: String,
      value: 'launched'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tips: {
      'ended': '已结束',
      'underway': '',
      'draft': '草稿'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showDetail() {
      let store = new IndexToDetailStore()
      store.setFormData(this.properties.form)
    }
  }
})
