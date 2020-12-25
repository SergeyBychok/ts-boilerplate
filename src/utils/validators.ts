type ValidatorType = (value: string | number | boolean) => string

interface ISchema {
  [key: string]: ValidatorType | Array<ValidatorType>
}

export function validator<T>(schema: ISchema, values: T) {
  return Object.entries(schema).reduce((acc, [field, rule]) => {
    if (typeof rule === 'function') {
      const hasError = rule(values[field])
      if (hasError) {
        acc[field] = hasError
        return acc
      }
    } else if (Array.isArray(rule)) {
      for (const ruleItem of rule) {
        const hasError = ruleItem(values[field])
        if (hasError) {
          acc[field] = hasError
          break
        }
      }
      return acc
    }
    return acc
  }, {})
}

export function minLength(length = 1) {
  return (value: string) => (value.length < length ? `Minimum length is ${length}` : '')
}

export function maxLength(length = 64) {
  return (value: string) => (value.length > length ? `Maximum length is ${length}` : '')
}
export function isEmail(value: string) {
  return !/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/gi.test(value) ? 'Incorrect email' : ''
}

export function isRequired(errorText = 'Required') {
  return (value: boolean | string | number) => {
    switch (typeof value) {
      case 'boolean':
        return !value ? errorText : ''

      case 'string':
        return !value.length ? errorText : ''

      case 'number':
        return !String(value).length ? errorText : ''

      default:
        return errorText
    }
  }
}

export function isDateMask(value: string) {
  return !/^(20|21|19)[0-9]{2}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(value) && 'Incorrect date format'
}

export function isPassword(value = '') {
  return (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()_+\\\-=[\]{};':",./<>?`~]{8,}$/.test(value) &&
    'Password too simple'
  )
}

export function spaceCheck(value: '') {
  return /\s/.test(value) ? 'Spaces forbidden' : ''
}
