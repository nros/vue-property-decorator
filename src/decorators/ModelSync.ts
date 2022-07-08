import Vue, { PropOptions } from 'vue'
import { Constructor } from 'vue/types/options'
import { applyMetadata } from '../helpers/metadata'
import { createDecorator } from '../helpers/createDecorator'

/**
 * decorator of synced model and prop
 * @param propName the name to interface with from outside, must be different from decorated property
 * @param  event event name
 * @param options options
 * @return PropertyDecorator
 */
export function ModelSync(
  propName: string,
  event?: string,
  options: PropOptions | Constructor[] | Constructor = {},
): PropertyDecorator {
  return (target: any, key: string | symbol) => {
    applyMetadata(options, target, key.toString())
    createDecorator((componentOptions, k) => {
      ;(componentOptions.props || ((componentOptions.props = {}) as any))[
        propName
      ] = options
      componentOptions.model = { prop: propName, event: event || k.toString() }
      ;(componentOptions.computed || (componentOptions.computed = {}))[k.toString()] = {
        get() {
          return (this as any)[propName]
        },
        set(value) {
          // @ts-ignore
          this.$emit(event, value)
        },
      }
    })(target, key)
  }
}
