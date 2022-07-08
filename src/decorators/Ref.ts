import Vue from 'vue'
import { createDecorator } from '../helpers/createDecorator'

/**
 * decorator of a ref prop
 * @param refKey the ref key defined in template
 */
export function Ref(refKey?: string): PropertyDecorator {
  return createDecorator((options, key) => {
    options.computed = options.computed || {}
    options.computed[key.toString()] = {
      cache: false,
      get(this: Vue) {
        return this.$refs[refKey || key.toString()]
      },
    }
  })
}
