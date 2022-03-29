export function round(number: number) {
    return Math.round(number * 100) / 100;
}

export function stringToFloat(text: string): number {
    return parseFloat(text.replace(',', '.'));
}
