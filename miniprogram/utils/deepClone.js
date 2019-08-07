function deepClone(obj) {
  if (typeof obj !== 'object') {
    throw "obj must be Object."
  }
  if (obj == null) return undefined
  let isArray = Array.isArray(obj)
  let objClone = isArray ? [] : {}
  for (let key in obj) {
    if (typeof obj.key === 'object' && obj.key != null) {
      objClone[key] = deepClone(obj)
    } else {
      objClone[key] = obj[key]
    }
  }
  return objClone
}

export {deepClone}
