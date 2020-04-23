const ProductModel = require('../../models/productModel');
exports.getProducts = (req,res,next) => {
    ProductModel.fetchAllProduct()
    .then(([product]) => {
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

exports.getAddProduct = (req,res,next) => {
    res.render('admin/add-product',{
        path: '/admin/add-product',
        pageTitle: 'Admin Product Page'
    }); 
}

exports.postAddProduct = (req,res,next) => {
    const product = new ProductModel(req.body.title,req.body.description,req.body.price,req.body.imageUrl);
    product.save()
    .then(result => {
        res.render('admin/add-product',{
            path: '/admin/add-product',
            pageTitle: 'Admin Product Page'
        }); 
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getEditProduct = (req,res,next) => {
    prductId = req.params.productId;
    ProductModel.fetchSingleProduct(prductId)
    .then(([product]) => {
        res.render('admin/edit-product',{
            path: '/admin/edit-product',
            pageTitle: product[0].title,
            product: product[0]
        }); 
    })
    .catch(err => {
        console.log(err);
    });
}