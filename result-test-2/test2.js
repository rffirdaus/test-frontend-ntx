function calculateShippingCost(destination, weight, priority) {
  if (destination !== "domestic" && destination !== "international") return "Invalid destination";
  if (typeof weight !== 'number' || weight <= 0) return "Invalid weight";
  if (priority !== "standard" && priority !== "express" && priority !== "priority") return "Invalid priority";

  let baseCostPerKg;

  if (destination === "domestic") {
    if (priority === "standard") {
      baseCostPerKg = 5;
    } else if (priority === "express") {
      baseCostPerKg = 10;
    } else if (priority === "priority") {
      baseCostPerKg = 20;
    }
    if (weight > 10) baseCostPerKg += 1; // Tambahan biaya $1 per kg jika berat > 10 kg
  } else {
    if (priority === "standard") {
      baseCostPerKg = 15;
    } else if (priority === "express") {
      baseCostPerKg = 25;
    } else if (priority === "priority") {
      baseCostPerKg = 50;
    }
    if (weight > 5) baseCostPerKg += 10; // Tambahan biaya $10 per kg jika berat > 5 kg
  }

  const totalCost = weight * baseCostPerKg;
  return totalCost;
}

// Contoh penggunaan:
console.log(calculateShippingCost("domestic", 12, "standard"));  // Output: 72
console.log(calculateShippingCost("international", 6, "express"));  // Output: 210
console.log(calculateShippingCost("domestic", 5, "priority"));  // Output: 100
console.log(calculateShippingCost("international", -3, "standard"));  // Output: "Invalid weight"