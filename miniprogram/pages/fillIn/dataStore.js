class FillInStore {
  /**
   * data for preview scene
   */
  static formTemp = {}

  static getFormTemp() {
    return FillInStore.formTemp
  }

  static setFormTemp(formTemp) {
    FillInStore.formTemp = formTemp
  }
}

export {FillInStore}