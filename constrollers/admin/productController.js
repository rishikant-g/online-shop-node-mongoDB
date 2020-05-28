const ProductModel = require('../../models/productModel');
// Getting all product 
exports.getProducts = (req,res,next) => {
    ProductModel.find()
    .then(product => {
        res.render('admin/products',{
            path: '/admin/products',
            products: product,
            pageTitle: 'Admin Product Page'
        }); 
    })
    .catch(err =>{
        console.log(err);
    });
}


// Getting form to add product
exports.getAddProduct = (req,res,next) => {
    res.render('admin/add-product',{
        path: '/admin/add-product',
        pageTitle: 'Admin Product Page'
    }); 
}

// Saving form data to DB
exports.postAddProduct = (req,res,next) => {
    const imageUrl = req.file;
    console.log(imageUrl);
    if(!imageUrl){
        return console.log('invalid image');
    }
    const product = new ProductModel(
        {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.file.path.replace("\\","/")
        });
        
    product.save()
    .then(result => {
        console.log(result);
        res.render('admin/add-product',{
            path: '/admin/add-product',
            pageTitle: 'Admin Product Page'
        }); 
    })
    .catch(err => {
        console.log(err);
    });
}

// Upate product data
exports.postUpdateProduct = (req,res,next) => {

    ProductModel.findById(req.body.productId)
    .then(product => {
        product.title = req.body.title,
        product.description = req.body.description,
        product.price = req.body.price,
        product.imageUrl = req.body.imageUrl;
        product.save();
        console.log('updated');
        res.redirect("/");
    })
    .catch(err => {
        console.log(err);
    });
}

// Show edit form to update product details 
exports.getEditProduct = (req,res,next) => {
    prductId = req.params.productId;
    ProductModel.findById(prductId)
    .then(product => {
        res.render('admin/edit-product',{
            path: '/admin/edit-product',
            pageTitle: product.title,
            product: product
        }); 
    })
    .catch(err => {
        console.log(err);
    });
}


// Show details of single product 
exports.getSingleProduct = (req,res,next)=> {
    ProductModel.findById(req.params.productId)
    .then(product => {
        res.render('admin/single-product',{
            path: '/admin/products',
            product: product,
            pageTitle: product.title
        }); 
    })
    .catch(err =>{
        console.log(err);
    });
}

exports.postDeleteProduct = (req,res,next) => {

    ProductModel.findByIdAndRemove(req.body.productId)
    .then( () => {
        console.log('deleted');
        res.redirect("/admin/products");  
    })
    .catch(err => {
        console.log(err);
    })
};

