export const sumDigitsFromString = (str) => {
    if (typeof str === 'string' && str.length) {
        let sum = 0;
        let numbers = str.match(/\d+/g).map(Number);
        for (let i = 0; i < numbers.length; i++) {
            sum += numbers[i]
        }
        return sum;
    } return 0
}