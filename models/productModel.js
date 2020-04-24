const getDb = require('../utils/database').getDb;
const mongoDb = require('mongodb');
module.exports = class Product{
    constructor(title,description,price,imageUrl){
        this.title = title;
        this.description = description;
        this.price = price;
        this.imageUrl =imageUrl;
    }

    save(){
        const db = getDb();
        return db.collection('products').insertOne(this);
    }

    static fetchAllProduct(){
        const db = getDb();
        return db.collection('products').find().toArray();
    }
    
    static fetchSingleProduct(id){
        const db = getDb();
        return db.collection('products').find({_id: mongoDb.ObjectID(id)}).limit(1).toArray();
    }

    updateProduct(req){
        const db = getDb();
        console.log(req.body.product_id);
        return db.collection('products')
        .updateOne(
            {_id: mongoDb.ObjectID(req.body.product_id)},
            { $set:
                {
                    title: req.body.title,
                    description: req.body.description,
                    price: req.body.price,
                    imageUrl: req.body.imageUrl
                }
              }
            ).then(result => {
                return result;
            })
            .catch(err => {
                console.log(err);
            });
    }

    deleteProduct(id){
        const db = getDb();
        return db.collection('products')
        .deleteOne({_id: mongoDb.ObjectID(id)});
    }
}
