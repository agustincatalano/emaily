if(process.env.NODE_ENV === 'production'){
    //we are in prod - return prod set of keys
    module.exports = require('./prod')
} else {
    //we are not in prod - return dev keys
    module.exports = require('./dev')
}
