// component/formId.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    formIdString: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    submitFun: function (e) {
      console.time("aaaa")
      if (e.currentTarget.dataset.end != true) {
        this.setData({
          formIdString: this.data.formIdString ? this.data.formIdString + "," + e.detail.formId : e.detail.formId
        })
      } else {
        console.timeEnd("aaaa")
        this.triggerEvent('myEvent', { formIdString: this.data.formIdString })
      }
    }
  }
})
