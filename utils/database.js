const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

var _db;
const MongoConnect =  callback => {
    MongoClient.connect('mongodb+srv://testuser:dSKM7uHSAYv5JbWo@cluster0-esohe.mongodb.net/test?retryWrites=true&w=majority',{
        useNewUrlParser: true,//just an option
        useUnifiedTopology: true
    })
    .then(client => {
        console.log('connected');
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
}

const getDb = () => {
    if(_db){
        return _db;
    }
    throw "No database connection";
}

exports.getDb = getDb;
exports.MongoConnect = MongoConnect;