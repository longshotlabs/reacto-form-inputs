let nextId = 0

export function uniqueId(prefix = '') {
  nextId += 1
  return `${prefix}${nextId}`
}

export function isEmpty(value: unknown) {
  if (value == null) return true
  if (typeof value === 'string' || Array.isArray(value)) return value.length === 0
  if (value instanceof Map || value instanceof Set) return value.size === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return true
}

export function isEqual(left: unknown, right: unknown): boolean {
  if (Object.is(left, right)) return true
  if (left instanceof Date && right instanceof Date) return left.getTime() === right.getTime()
  if (Array.isArray(left) && Array.isArray(right)) {
    return (
      left.length === right.length && left.every((value, index) => isEqual(value, right[index]))
    )
  }
  if (left && right && typeof left === 'object' && typeof right === 'object') {
    const leftRecord = left as Record<string, unknown>
    const rightRecord = right as Record<string, unknown>
    const leftKeys = Object.keys(leftRecord)
    return (
      leftKeys.length === Object.keys(rightRecord).length &&
      leftKeys.every(
        (key) =>
          Object.prototype.hasOwnProperty.call(rightRecord, key) &&
          isEqual(leftRecord[key], rightRecord[key])
      )
    )
  }
  return false
}

export function union<T>(values: T[], additions: T[]) {
  return [...new Set([...values, ...additions])]
}

export function without<T>(values: T[], excluded: T) {
  return values.filter((value) => !Object.is(value, excluded))
}
