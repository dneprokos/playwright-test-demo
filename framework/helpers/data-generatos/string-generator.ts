export function generateRandomString(symbolsCount: number): string {
    const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < symbolsCount; i++) {
      const randomIndex = Math.floor(Math.random() * symbols.length);
      randomString += symbols.charAt(randomIndex);
    }

    return randomString;
}