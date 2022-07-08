import Vue, { PropOptions } from 'vue'
import { Constructor } from 'vue/types/options'
import { applyMetadata } from '../helpers/metadata'
import { createDecorator } from '../helpers/createDecorator'

/**
 * decorator of a synced prop
 * @param propName the name to interface with from outside, must be different from decorated property
 * @param options the options for the synced prop
 * @return PropertyDecorator | void
 */
export function PropSync(
  propName: string,
  options: PropOptions | Constructor[] | Constructor = {},
): PropertyDecorator {
  return (target: any, key: string | symbol) => {
    applyMetadata(options, target, key.toString())
    createDecorator((componentOptions, k) => {
      ;(componentOptions.props || (componentOptions.props = {} as any))[
        propName
      ] = options
      ;(componentOptions.computed || (componentOptions.computed = {}))[k.toString()] = {
        get() {
          return (this as any)[propName]
        },
        set(this: Vue, value) {
          this.$emit(`update:${propName}`, value)
        },
      }
    })(target, key)
  }
}
