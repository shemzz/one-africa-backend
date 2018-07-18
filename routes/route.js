/*jshint esversion: 6 */

const express = require('express');
var router = express.Router();

const Item = require('../modules/items');
const User = require('../modules/users');

// retrieving data from database
router.get('/show_items', (req, res, next) => {
    Item.find(function (err, items) {
        if (err) {
            res.json(err);
        } else {
            res.json(items);
        }
    });
});

// add new item
router.post('/add_item', (req, res, next) => {
    let newItem = new Item({
        itemName: req.body.itemName,
        itemQuantity: req.body.itemQuantity,
        itemBought: req.body.itemBought
    });
    newItem.save((err, item) => {
        if (err) {
            res.json(err);
        } else {
            res.json({
                msg: "Item has been added successfully"
            });
        }
    });
});

// update item
router.put('/update_item/:id', (req, res, next) => {
    Item.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                itemName: req.body.itemName,
                itemQuantity: req.body.itemQuantity,
                itemBought: req.body.itemBought
            }
        },
        function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        });
});

// delete item
router.delete('/item/remove/:id', (req, res, next) => {
    Item.remove({_id: req.params.id}, function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        });
});

module.exports = router;
