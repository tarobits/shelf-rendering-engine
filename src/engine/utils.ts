export function between(num: number, min: number, max: number): boolean {
    return (num >= min && num <= max);
}

export function removeEmptyFromArray(arr: Array<any>): Array<any> {
    return arr.filter(v => v !== undefined);
}