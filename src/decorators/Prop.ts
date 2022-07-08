import Vue, { PropOptions } from 'vue'
import { Constructor } from 'vue/types/options'
import { applyMetadata } from '../helpers/metadata'
import { createDecorator } from '../helpers/createDecorator'

/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
export function Prop(options: PropOptions | Constructor[] | Constructor = {}): PropertyDecorator {
  return (target: any, key: string | symbol) => {
    applyMetadata(options, target, key.toString())
    createDecorator((componentOptions, k) => {
      ;(componentOptions.props || ((componentOptions.props = {}) as any))[
        k
      ] = options
    })(target, key)
  }
}
