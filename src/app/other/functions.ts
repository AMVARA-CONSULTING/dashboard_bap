
/**
 * Classifies an array collection based on a property name
 * @param array An array containing other arrays
 * @param prop Property name to classify
 */
export function classifyByProperty(array: any[], prop: string) {
    return array.reduce((r, a) => {
        r[a[prop]] = r[a[prop]] || [];
        r[a[prop]].push(a);
        return r;
    }, {});
}

/**
 * Sums values of an array collection
 * @param array An array containing other arrays
 * @param i A number defining the index of the desired value to make the sum
 */
export function sumByIndex(array: any[], i: number): number {
    return array.reduce((a, b) => a + parseInt(b[i], 10), 0);
}

/**
 * Sums values of an array collection
 * @param array An array containing other arrays
 * @param prop Property name to use
 */
export function sumByProperty(array: any[], prop: string): number {
    return array.reduce((a, b) => a + parseInt(b[prop], 10), 0);
}
