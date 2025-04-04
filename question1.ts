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

  inventory.map((pr) => {
    if (pr.id !== productId) return pr;

    if (quantityChange < 0) {
      return { ...pr, quantityInStock: 0 };
    }
    const newQuantityInStock = pr.quantityInStock + quantityChange;
    return { ...pr, quantityInStock: newQuantityInStock };
  });

  return inventory;
}

function getTotalInventoryValue(inventory: Inventory): number {
  return inventory.reduce((totalPrice, product) => {
    return totalPrice + product.price * product.quantityInStock;
  }, 0);
}
