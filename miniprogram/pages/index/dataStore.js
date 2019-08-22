class IndexStore{
  static tab = 'launched'
  getTab() {
    return IndexStore.tab
  }
  setTab(val) {
    IndexStore.tab = val
  }
}

export {IndexStore}