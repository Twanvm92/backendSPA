/**
 * Created by twanv on 4-12-2017.
 */
const Store = require('../models/store.model');

module.exports = {

    get(req, res, next) {
        Store.find({})
            .populate('beers')
            .then((stores) => {
                // console.log(users);
                res.status(200).json(stores);
            })
            .catch((error) => res.status(400).send({error: error.message}));
    },

    create(req, res, next) {
        const body = req.body;

        const storeProps = {
            title: body.title,
            address: body.address,
            imagePath: body.imagePath,
            beers: body.beers
        };

        Store.create(storeProps)
            .then(store => res.status(201).send(store))
            .catch((error) => res.status(400).send({error: error.message}));
    },

    edit(req, res, next) {
        const storeId = req.params.id;
        const storeProps = req.body;

        Store.findByIdAndUpdate({_id: storeId}, storeProps)
            .then(() => Store.findById({_id: storeId}))
            .then(store => res.status(201).send(store))
            .catch((error) => res.status(400).send(({error: error.message})));
    },

    delete(req, res, next) {
        const storeId = req.params.id;

        Store.findByIdAndRemove({_id: storeId})
            .then(store => res.status(202).send(store))
            .catch((error) => res.status(404).send({error: error.message}));
    }
};