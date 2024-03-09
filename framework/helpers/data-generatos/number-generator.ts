export function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomNumberArray(length: number, min: number, max: number): number[] {
    return Array.from({ length }, () => generateRandomNumber(min, max));
}


