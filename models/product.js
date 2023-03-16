const express = require('express');

const path = require('path');

const fs = require('fs');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');


const getProductsfromFile = (cb) => {
    fs.readFile(p, (err, fileData) => {
        if (err) {
            cb([])
        }
        cb(JSON.parse(fileData));
    })
}
module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsfromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.error(err);
            });
        });
    }
    static fetchAll(cb) {
        getProductsfromFile(cb);
    }
}