const db = require('../utils/database');
module.exports = class Product{
    constructor(title,description,price,imageUrl){
        this.title = title;
        this.description = description;
        this.price = price;
        this.imageUrl =imageUrl;
    }

    save(){
        return db.execute("INSERT INTO products(title,description,price,imageurl) VALUES(?,?,?,?)",[this.title,this.description,this.price,this.imageUrl]);
    }

    static fetchAllProduct(){
        return db.execute("SELECT * FROM products");
    }
    
    static fetchSingleProduct(id){
        return db.execute("SELECT * FROM products WHERE id = ?",[id]);
    }
}
