function pipe() {
    let currentResult = arguments[0];
    const argLength = arguments.length;
    for (let i = 1; i < argLength; i++) {
        currentResult = arguments[i](currentResult);
    }
    return currentResult;
}

function addOne(x) {
    return x + 1;
}

console.log(pipe(1, addOne, addOne));
