import { WritableComputedRef, computed, getCurrentInstance } from "vue";

export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export const useVmodel = <T>(props: Prettify<any>, key = "modelValue", emit: (...args: any[]) => any): WritableComputedRef<T> => {
    const vm = getCurrentInstance();
    const _emit = emit || vm?.emit;
    return computed<T>({
        get: () => props[key] as T,
        set: (v) => _emit(`update:${key}`, v)
    });
}
