/* Reactivity System in Vanilla JavaScript */

let data = {
  price: 0,
  quantity: 0,
};
let target, total, salePrice;

class Dep {
  constructor() {
    this.subscribers = [];
  }

  depend() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target);
    }
  }

  notify() {
    this.subscribers.forEach((sub) => sub());
  }
}

Object.keys(data).forEach((key) => {
  let internalValue = data[key];
  const dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      dep.depend();
      return internalValue;
    },
    set(newVal) {
      internalValue = newVal;
      dep.notify();
    },
  });
});

const watcher = (myFunc) => {
  target = myFunc;
  target();
  target = null;
};

watcher(() => {
  total = data.price * data.quantity;
});

watcher(() => {
  const costPrice = data.price * data.quantity;
  salePrice = costPrice * 0.9;
});

console.log("Before Update", {
  price: data.price,
  quantity: data.quantity,
  total,
  salePrice,
});
// => Before Update { price: 0, quantity: 0, total: 0, salePrice: 0 }

data.price = 5;
data.quantity = 2;
console.log("After Update: 1", {
  price: data.price,
  quantity: data.quantity,
  total,
  salePrice,
});
// => After Update: 1 { price: 5, quantity: 2, total: 10, salePrice: 9 }

data.price = 20;
console.log("After Update: 2", {
  price: data.price,
  quantity: data.quantity,
  total,
  salePrice,
});
// => After Update: 2 { price: 20, quantity: 2, total: 40, salePrice: 36 }

data.quantity = 5;
console.log("After Update: 3", {
  price: data.price,
  quantity: data.quantity,
  total,
  salePrice,
});
// => After Update: 3 { price: 20, quantity: 5, total: 100, salePrice: 90 }
