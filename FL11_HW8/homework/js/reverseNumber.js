function reverseNumber(num) {
    const reverse = num.toString().split('').reverse();
    if (reverse[reverse.length - 1] === '-') {
        reverse.splice(-1, 1);
        return parseInt(reverse.join('')) * -1;
    }
    return parseInt(reverse.join(''));
}

console.log(reverseNumber(-100));
