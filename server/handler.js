const cart = require('./cart');
const fs = require('fs');

const actions = {
    add: cart.add,
    change: cart.change,
    remove: cart.remove
};

//HANDLER отвечает за изменение данных в самом файле
let handler = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            let newCart = null;
            try {
                newCart = actions[action](JSON.parse(data), req);
            } catch (err) {
                console.error(err);
                res.send(JSON.stringify({ result: 0 }))
                return;
            }
            fs.writeFile(file, newCart, (err) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
                } else {
                    res.send(JSON.stringify({ result: 1 }))
                }
            })
        }
    })
};

module.exports = handler;