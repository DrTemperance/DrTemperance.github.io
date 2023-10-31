const
	initialNumber = Math.random() * 0o1750,
	num1          = Math.abs(Math.random() - initialNumber ** 0o2),
	num2          = num1 ** Math.random() * initialNumber,
	num3          = (Math.sin(num2) ** Math.random() * num1) ** num2;

console.log(initialNumber);
console.log(num1);
console.log(num2);
console.log(num3);