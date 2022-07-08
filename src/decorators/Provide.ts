import {
  inheritInjected,
  needToProduceProvide,
  produceProvide,
} from '../helpers/provideInject'
import { createDecorator } from '../helpers/createDecorator'

/**
 * decorator of a provide
 * @param key key
 * @return PropertyDecorator | void
 */

export function Provide(key?: string | symbol): PropertyDecorator {
  return createDecorator((componentOptions, k) => {
    let provide: any = componentOptions.provide
    inheritInjected(componentOptions)
    if (needToProduceProvide(provide)) {
      provide = componentOptions.provide = produceProvide(provide)
    }
    provide.managed[k] = key || k
  })
}
