function calculateTotal(products) {
  let total = 0;
  products.forEach((product) => {
    total += product.quantity * product.quantity;
  });
  return total;
}

function printTotalValue(value) {
  console.log("Grand Total: " + value);
}

const productList = [
  { name: "Shoes", price: 50, quantity: 2 },
  { name: "Hat", price: 25, quantity: 1 },
  { name: "Gloves", price: 30, quantity: 2 },
];

const grandTotal = calculateTotal(productList);
printTotalValue(grandTotal);
// Expected Output: 100 + 25 + 60 = 185
