let updateAmountAndCount = (cart, price, quantity) => {
    cart.amount += price * quantity;
    cart.countGoods += quantity;
}

let add = (cart, req) => {
    console.log(`Добавление id ${req.body.id}`);

    cart.contents.push(req.body);

    updateAmountAndCount(cart, req.body.price, req.body.quantity);

    return JSON.stringify(cart, null, 4);
};

let change = (cart, req) => {
    console.log(`Изменение id ${req.params.id} на ${req.body.quantity}`);

    let find = cart.contents.find(el => el.id === +req.params.id);
    find.quantity += req.body.quantity;

    updateAmountAndCount(cart, find.price, req.body.quantity);

    return JSON.stringify(cart, null, 4);
};

let remove = (cart, req) => {
    console.log(`Удаление id ${req.params.id}`);

    let removedItem = null;
    for (let i = 0; i < cart.contents.length; i++) {
        let item = cart.contents[i];

        if (item.id === +req.params.id) {
            cart.contents.splice(i, 1);
            removedItem = item;
            break;
        }
    }

    console.log(`price ${removedItem.price} quantity ${-removedItem.quantity}`);
    updateAmountAndCount(cart, removedItem.price, -removedItem.quantity);

    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    change,
    remove
};