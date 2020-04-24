const ProductModel = require('../../models/productModel');
// Getting all product 
exports.getProducts = (req,res,next) => {
    ProductModel.fetchAllProduct()
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
    const product = new ProductModel(req.body.title,req.body.description,req.body.price,req.body.imageUrl);
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
    const product = new ProductModel();
    product.updateProduct(req)
    .then(result => {
        res.redirect("/");
    })
    .catch(err => {
        console.log(err);
    });
}

// Show edit form to update product details 
exports.getEditProduct = (req,res,next) => {
    prductId = req.params.productId;
    ProductModel.fetchSingleProduct(prductId)
    .then(product => {
        console.log(product);
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
    console.log(req.params.productId);
    ProductModel.fetchSingleProduct(req.params.productId)
    .then(product => {
        res.render('admin/single-product',{
            path: '/admin/products',
            products: product,
            pageTitle: product.title
        }); 
    })
    .catch(err =>{
        console.log(err);
    });
}

exports.postDeleteProduct = (req,res,next) => {
    const product =new ProductModel();
    product.deleteProduct(req.body.product_Id)
    .then(result => {
        console.log("Deleted");
        res.redirect("/");
    })
    .catch(err => {
        console.log(err);
    })
};

