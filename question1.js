"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
function getProductById(inventory, productId) {
    return inventory.find(function (pr) { return pr.id === productId; });
}
function addProduct(inventory, product) {
    var checkId = getProductById(inventory, product.id);
    if (checkId) {
        console.error("Product already exists");
        return inventory;
    }
    return __spreadArray(__spreadArray([], inventory, true), [product], false);
}
function updateStock(inventory, productId, quantityChange) {
    var checkId = getProductById(inventory, productId);
    if (!checkId) {
        console.error("Product does not exists");
        return inventory;
    }
    return inventory.map(function (pr) {
        if (pr.id !== productId)
            return pr;
        if (quantityChange < 0) {
            return __assign(__assign({}, pr), { quantityInStock: 0 });
        }
        var newQuantityInStock = pr.quantityInStock + quantityChange;
        return __assign(__assign({}, pr), { quantityInStock: newQuantityInStock });
    });
}
function getTotalInventoryValue(inventory) {
    return inventory.reduce(function (totalPrice, product) {
        return totalPrice + product.price * product.quantityInStock;
    }, 0);
}
var apple = { id: 0, name: "apple", price: 10, quantityInStock: 15 };
var banana = {
    id: 1,
    name: "banana",
    price: 30,
    quantityInStock: 12,
};
var inventory = [];
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
var totalPrice = getTotalInventoryValue(inventory);
console.log(totalPrice);
