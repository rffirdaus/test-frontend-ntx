function calculateTax(income, age, dependents) {
  if (typeof income !== 'number' || income < 0) return "Invalid income";
  if (typeof age !== 'number' || age < 0) return "Invalid age";
  if (typeof dependents !== 'number' || dependents < 0) return "Invalid dependents";

  if (age < 18) return "Not eligible for tax";

  let taxRate;
  if (income <= 10000) {
    taxRate = 0.10;
  } else if (income <= 50000) {
    taxRate = 0.20;
  } else {
    taxRate = 0.30;
  }

  let tax = income * taxRate;

  if (age >= 65) {
    tax *= 0.80; // 20% discount
  }

  tax -= dependents * 500; // $500 deduction per dependent
  tax = Math.max(tax, 0); // Minimum tax is $0

  return tax;
}

// Contoh penggunaan:
console.log(calculateTax(60000, 70, 2)); // Output: 12400
console.log(calculateTax(6000, 30, 1));  // Output: 100
console.log(calculateTax(-5000, 30, 1)); // Output: "Invalid income"
console.log(calculateTax(6000, 10, 1));  // Output: "Not eligible for tax"