let nextId = 0

const uniqueIds = new Map()

const uniqueId = (u) => {
  if (uniqueIds.has(u)) {
    return uniqueIds.get(u)
  }
  uniqueIds.set(u, nextId)
  return nextId++
}

export default uniqueId
