interface Product {
  id: number;
  name: string;
  price: number;
  quantityInStock: number;
}

type Inventory = Product[];

function getProductById(
  inventory: Inventory,
  productId: number
): Product | undefined {
  return inventory.find((pr) => pr.id === productId);
}

function addProduct(inventory: Inventory, product: Product): Inventory {
  const checkId = getProductById(inventory, product.id);

  if (checkId) {
    console.error("Product already exists");
    return inventory;
  }
  return [...inventory, product];
}

function updateStock(
  inventory: Inventory,
  productId: number,
  quantityChange: number
): Inventory {
  const checkId = getProductById(inventory, productId);

  if (!checkId) {
    console.error("Product does not exists");
    return inventory;
  }

  return inventory.map((pr) => {
    if (pr.id !== productId) return pr;

    if (quantityChange < 0) {
      return { ...pr, quantityInStock: 0 };
    }
    const newQuantityInStock = pr.quantityInStock + quantityChange;
    return { ...pr, quantityInStock: newQuantityInStock };
  });
}

function getTotalInventoryValue(inventory: Inventory): number {
  return inventory.reduce((totalPrice, product) => {
    return totalPrice + product.price * product.quantityInStock;
  }, 0);
}

const apple: Product = { id: 0, name: "apple", price: 10, quantityInStock: 15 };
const banana: Product = {
  id: 1,
  name: "banana",
  price: 30,
  quantityInStock: 12,
};

let inventory: Inventory = [];

inventory = addProduct(inventory, apple);
inventory = addProduct(inventory, banana);

inventory = addProduct(inventory, {
  id: 1,
  name: "mango",
  price: 50,
  quantityInStock: 3,
});

inventory = updateStock(inventory, 1, 1);

inventory = updateStock(inventory, 0, -3);

inventory = updateStock(inventory, 100, 100);

const totalPrice = getTotalInventoryValue(inventory);
console.log(totalPrice);
export {};
