function getMin() {
    let min = arguments[0];
    const argLength = arguments.length;
    for (let i = 1; i < argLength; i++) {
        if (arguments[i] < min) {
            min = arguments[i];
        }
    }
    return min;
}

console.log(getMin(100, 500, 1));
