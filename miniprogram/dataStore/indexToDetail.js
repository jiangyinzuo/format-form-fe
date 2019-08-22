class IndexToDetailStore {
  static formData
  setFormData(formData) {
    IndexToDetailStore.formData = formData
  }
  getFormData() {
    return IndexToDetailStore.formData
  }
}

export {IndexToDetailStore}