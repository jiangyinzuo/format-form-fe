function makePromise(func, params = {}) {
  return new Promise((resolve, reject) => {
    Object.assign(params, {
      success: res => resolve(res),
      fail: err => resolve(err)
    })
    func(params)
  })
}

export {makePromise}