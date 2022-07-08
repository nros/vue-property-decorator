import type { ComponentOptions } from 'vue'
import type Vue from 'vue'

import { createDecorator as originCreateDecorator } from 'vue-class-component'

export function createDecorator(
    callback: (options: ComponentOptions<Vue>, key: string | symbol) => void,
): PropertyDecorator;
export function createDecorator(
    callback: <T>(
        options: ComponentOptions<Vue>, key: string | symbol, descriptor: TypedPropertyDescriptor<T>,
    ) => void,
): MethodDecorator;
export function createDecorator(
    callback: (options: ComponentOptions<Vue>, key: string | symbol, parameterIndex: number) => void,
): ParameterDecorator;

export function createDecorator(
    callback: (options: ComponentOptions<Vue>, key: string | symbol, descriptorOrNumber: any) => void,
): ClassDecorator | PropertyDecorator | MethodDecorator | ParameterDecorator {
    return originCreateDecorator(callback);
}
