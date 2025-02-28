/**
 * Type for valid path segments in deep object traversal
 * Can be string (for object properties), number (for array indices),
 * function (for array filtering), or string array (for picking multiple properties)
 */
type PathSegment = string | number | ((item: any) => boolean) | string[]

/**
 * Type for the complete path specification
 * Can be either a dot-separated string or an array of path segments
 */
type Path = string | PathSegment[]

/**
 * Traverses or modifies a deeply nested object structure
 * @template T - The type of the root object
 * @template V - The type of the value to set (when in set mode)
 * @param obj - The object to traverse
 * @param path - The path to follow in the object
 * @param value - Optional value to set at the specified path
 * @returns The value at the specified path, or the modified object if setting a value
 */
export default function deepDive<T extends object, V = any>(obj: T = {} as T, path: Path = [], value?: V): any {
    const pathArray = typeof path === 'string' ? path.split('.') : Array.isArray(path) ? path : []

    /**
     * Recursively gets a value from a nested object structure
     * @param obj - The object to traverse
     * @param pathArray - Array of path segments to follow
     * @returns The value at the specified path or null if not found
     */
    const get = (obj: any, pathArray: PathSegment[]): any => {
        return pathArray.reduce((item: any, prop: PathSegment) => {
            if (item && prop != null) {
                if (Array.isArray(item)) {
                    if (typeof prop === 'function') {
                        return item.filter(prop)
                    } else if (typeof prop === 'number') {
                        return item[prop]
                    } else if (Array.isArray(prop)) {
                        return item.map((node: any) =>
                            prop.reduce((returnObj: any, key: string) => {
                                returnObj[key] = node[key]
                                return returnObj
                            }, {}),
                        )
                    } else {
                        return item.map((node: any) => node[prop])
                    }
                }
                return item[prop as string]
            }
            return null
        }, obj)
    }

    if (value === undefined) {
        return get(obj, pathArray)
    } else {
        const [lastProp] = pathArray.slice(-1)
        const node = get(obj, pathArray.slice(0, -1))

        if (Array.isArray(node)) {
            if (typeof lastProp === 'number') {
                node[lastProp] = value
            } else if (Array.isArray(lastProp)) {
                if (Array.isArray(value)) {
                    node.forEach((item: any) => lastProp.forEach((prop: string, i: number) => (item[prop] = value[i])))
                } else if (typeof value === 'function') {
                    node.forEach((item: any) => lastProp.forEach((prop: string, i: number) => (item[prop] = value(prop, i))))
                } else {
                    node.forEach((item: any) => lastProp.forEach((prop: string) => (item[prop] = value)))
                }
            } else {
                node.forEach((item: any) => (item[lastProp as string] = value))
            }
            return obj
        } else if (node && typeof node === 'object') {
            node[lastProp as string] = value
            return obj
        } else {
            return null
        }
    }
}
