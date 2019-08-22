// components/formBoard/formBoard.js
import { IndexToDetailStore } from '../../../../dataStore/indexToDetail.js'

import {IndexStore} from '../../dataStore.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    form: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
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
