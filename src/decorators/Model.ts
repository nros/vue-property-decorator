import Vue, { PropOptions } from 'vue'
import { Constructor } from 'vue/types/options'
import { applyMetadata } from '../helpers/metadata'
import { createDecorator } from '../helpers/createDecorator'

/**
 * decorator of model
 * @param  event event name
 * @param options options
 * @return PropertyDecorator
 */
export function Model(
  event?: string,
  options: PropOptions | Constructor[] | Constructor = {},
): PropertyDecorator {
  return (target: any, key: string | symbol) => {
    applyMetadata(options, target, key.toString())
    createDecorator((componentOptions, k) => {
      ;(componentOptions.props || ((componentOptions.props = {}) as any))[
        k
      ] = options
      componentOptions.model = { prop: k.toString(), event: event || k.toString() }
    })(target, key)
  }
}
