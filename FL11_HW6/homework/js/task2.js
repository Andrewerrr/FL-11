const a = parseInt(prompt('Enter a'));
const b = parseInt(prompt('Enter b'));
const c = parseInt(prompt('Enter c'));
const isTriangle = a > 0 && b > 0 && c > 0 && a + b > c && a + c > b && b + c > a;
const isTriangleEquivalent = isTriangle && a === b && a === c;
const isTriangleIsosceles = isTriangle && !isTriangleEquivalent && (a === b || a === c);
const isTriangleNormal = isTriangle && a !== b && a !== c && c !== a;
if (!isTriangle) {
    console.log('Triangle doesn’t exist');
}
if (isTriangleEquivalent) {
    console.log('Equivalent triangle');
}
if (isTriangleIsosceles) {
    console.log('Isosceles triangle');
}
if (isTriangleNormal) {
    console.log('Normal triangle');
}
