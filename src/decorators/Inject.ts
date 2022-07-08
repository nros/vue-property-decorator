import { InjectKey } from 'vue/types/options'
import { createDecorator } from '../helpers/createDecorator'

export type InjectOptions = { from?: InjectKey; default?: any }
/**
 * decorator of an inject
 * @param from key
 * @return PropertyDecorator
 */

export function Inject(options?: InjectOptions | InjectKey): PropertyDecorator {
  return createDecorator((componentOptions, key) => {
    if (typeof componentOptions.inject === 'undefined') {
      componentOptions.inject = {}
    }
    if (!Array.isArray(componentOptions.inject)) {
      componentOptions.inject[key.toString()] = options || key
    }
  })
}
