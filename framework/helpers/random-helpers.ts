export class RandomHelper {
    getRandomValueFromArray(array: string [] | number [] | boolean []): string | number | boolean {
        const index = Math.floor(Math.random() * array.length);
        return array[index];
    }

    getRandomIndex(max: number): number {
        return Math.floor(Math.random() * max);
    }
}